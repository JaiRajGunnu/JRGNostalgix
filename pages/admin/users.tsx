import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { shortTestimonials } from "@/components/ui/friends";
import { CheckIcon, ArrowUpIcon, ArrowDownIcon, ArrowPathIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Head from 'next/head';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
}

type FilterType = 'all' | 'admin' | 'member';
type StatusFilterType = 'all' | 'active' | 'inactive';
type SortType = 'none' | 'name-asc' | 'name-desc' | 'login-recent' | 'login-oldest';

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('none');
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAdmin(true);
      fetchUsers();
    }
  }, [router]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [users, activeFilter, statusFilter, sortBy]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<User[]>("/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching users:", error.message);
      } else {
        console.error("Unexpected error:", String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    // First apply role filter
    let filtered = [...users];
    
    if (activeFilter === 'admin') {
      filtered = filtered.filter(user => user.role === 'admin');
    } else if (activeFilter === 'member') {
      filtered = filtered.filter(user => user.role === 'user');
    }
    
    // Then apply status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(user => 
        user.lastLogin && new Date(user.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000
      );
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(user => 
        !user.lastLogin || new Date(user.lastLogin).getTime() <= Date.now() - 48 * 60 * 60 * 1000
      );
    }
    
    // Apply sorting
    if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'login-recent') {
      filtered.sort((a, b) => {
        // Handle cases where lastLogin might be undefined
        if (!a.lastLogin) return 1;
        if (!b.lastLogin) return -1;
        return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime();
      });
    } else if (sortBy === 'login-oldest') {
      filtered.sort((a, b) => {
        // Handle cases where lastLogin might be undefined
        if (!a.lastLogin) return 1;
        if (!b.lastLogin) return -1;
        return new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime();
      });
    }
    
    setFilteredUsers(filtered);
  };

  const handleRoleFilterChange = (filterType: FilterType) => {
    setActiveFilter(filterType);
    // Reset selected users when changing filters
    setSelectedUsers({});
  };

  const handleStatusFilterChange = (filterType: StatusFilterType) => {
    setStatusFilter(filterType);
    // Reset selected users when changing filters
    setSelectedUsers({});
  };

  const handleSortChange = (sortType: SortType) => {
    setSortBy(sortType);
    // Reset selected users when changing sort
    setSelectedUsers({});
  };

  const resetAllFilters = () => {
    setActiveFilter('all');
    setStatusFilter('all');
    setSortBy('none');
    setSelectedUsers({});
  };

  const isUserActive = (user: User): boolean => {
    return !!(user.lastLogin && new Date(user.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000);
  };

  const getActiveUsersCount = (): number => {
    return users.filter(isUserActive).length;
  };

  const getInactiveUsersCount = (): number => {
    return users.length - getActiveUsersCount();
  };

  const handleSelectAll = () => {
    const allSelected = filteredUsers.length > 0 && 
      Object.keys(selectedUsers).length === filteredUsers.length && 
      Object.values(selectedUsers).every(Boolean);
    
    const newSelectedUsers: { [key: string]: boolean } = {};
    
    filteredUsers.forEach(user => {
      newSelectedUsers[user._id] = !allSelected;
    });
    
    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const toggleAdmin = async (userId: string, currentRole: string) => {
    try {
      const token = localStorage.getItem('token');
      const newRole = currentRole === "admin" ? "user" : "admin";
      
      const response = await axios.put(`/api/users?id=${userId}`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (response.data) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const isAnyFilterActive = activeFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'none';

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilter !== 'all') count++;
    if (statusFilter !== 'all') count++;
    if (sortBy !== 'none') count++;
    return count;
  };

  return (
    <>
      <Head>
        <title>Members - Admin Panel</title>
      </Head>
      <div className="flex min-h-screen text-white">

        <div className="absolute inset-0 -z-10 pointer-events-none">
          <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
        </div>

        <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className={`flex-1 p-10 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-12"}`}>
          <div className="flex justify-between items-center mt-5 mb-10">
            <h1 className="text-4xl font-bold text-center">Member's Dashboard</h1>
          </div>
          
          {/* Filter Toggle Button */}
          <div className="mb-6 flex justify-between items-center">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`flex items-center gap-2 ${isFiltersOpen ? 'bg-white text-black' : 'bg-[#1e1f21] text-white'} px-4 py-2 rounded-lg transition-all hover:bg-opacity-90`}
            >
              <FunnelIcon className="h-4 w-4" />
              <span>Filters & Sort</span>
              {getActiveFilterCount() > 0 && (
                <span className="flex items-center justify-center bg-blue-500 text-white text-xs w-5 h-5 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
            
            {isAnyFilterActive && (
              <div className="text-sm text-white/50 flex items-center gap-2">
                <span>
                  {activeFilter !== 'all' && `Role: ${activeFilter === 'admin' ? 'Admins' : 'Members'}`}
                  {activeFilter !== 'all' && statusFilter !== 'all' && ' | '}
                  {statusFilter !== 'all' && `Status: ${statusFilter === 'active' ? 'Active' : 'Inactive'}`}
                  {(activeFilter !== 'all' || statusFilter !== 'all') && sortBy !== 'none' && ' | '}
                  {sortBy !== 'none' && `Sorted by: ${
                    sortBy === 'name-asc' ? 'Name (A-Z)' : 
                    sortBy === 'name-desc' ? 'Name (Z-A)' : 
                    sortBy === 'login-recent' ? 'Recent Login' : 'Oldest Login'
                  }`}
                </span>
                <button 
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white/70 hover:text-white px-2 py-1 rounded text-xs transition-all"
                  title="Reset all filters"
                >
                  <ArrowPathIcon className="h-3 w-3" />
                  Clear All
                </button>
              </div>
            )}
          </div>
          
          {/* Filter and Sort Controls - Only shown when filters are open */}
          {isFiltersOpen && (
            <div className="mb-8 bg-[#1e1f21] rounded-lg overflow-hidden shadow-lg">
              <div className="flex justify-between items-center px-4 py-3 border-b border-[#27292af7]">
                <h3 className="font-semibold">Filter & Sort Options</h3>
                <button 
                  onClick={() => setIsFiltersOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Role Filter Buttons */}
                <div>
                  <h3 className="text-sm text-white/70 mb-3 font-medium">Filter by Role</h3>
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => handleRoleFilterChange('all')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm ${
                        activeFilter === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      All ({users.length})
                    </button>
                    <button 
                      onClick={() => handleRoleFilterChange('admin')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm ${
                        activeFilter === 'admin' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Admins ({users.filter(user => user.role === 'admin').length})
                    </button>
                    <button 
                      onClick={() => handleRoleFilterChange('member')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm ${
                        activeFilter === 'member' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Members ({users.filter(user => user.role === 'user').length})
                    </button>
                  </div>
                </div>
                
                {/* Status Filter Buttons */}
                <div>
                  <h3 className="text-sm text-white/70 mb-3 font-medium">Filter by Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => handleStatusFilterChange('all')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm ${
                        statusFilter === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      All Status
                    </button>
                    <button 
                      onClick={() => handleStatusFilterChange('active')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm ${
                        statusFilter === 'active' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Active ({getActiveUsersCount()})
                    </button>
                    <button 
                      onClick={() => handleStatusFilterChange('inactive')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm ${
                        statusFilter === 'inactive' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Inactive ({getInactiveUsersCount()})
                    </button>
                  </div>
                </div>
                
                {/* Sort Options */}
                <div>
                  <h3 className="text-sm text-white/70 mb-3 font-medium">Sort By</h3>
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => handleSortChange('name-asc')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm flex items-center ${
                        sortBy === 'name-asc'
                          ? 'bg-blue-600 text-white' 
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Name (A-Z) <ArrowUpIcon className="h-3 w-3 ml-1" />
                    </button>
                    {/* <button 
                      onClick={() => handleSortChange('name-desc')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm flex items-center ${
                        sortBy === 'name-desc'
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Name (Z-A) <ArrowDownIcon className="h-3 w-3 ml-1" />
                    </button> */}
                    <button 
                      onClick={() => handleSortChange('login-recent')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm flex items-center ${
                        sortBy === 'login-recent'
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Recent Login <ArrowUpIcon className="h-3 w-3 ml-1" />
                    </button>
                    <button 
                      onClick={() => handleSortChange('login-oldest')}
                      className={`px-3 py-2 rounded-lg transition-all text-sm flex items-center ${
                        sortBy === 'login-oldest'
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                      }`}
                    >
                      Oldest Login <ArrowDownIcon className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          )}
          
          {loading ? (
            <p className="text-center opacity-50">Retrieving data from server, just a moment...</p>
          ) : (
            <>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-10 ">
                  <p className="opacity-70">No users match the selected filters</p>
                  {isAnyFilterActive && (
                    <button 
                      onClick={resetAllFilters}
                      className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all mx-auto"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                      Reset all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-[#18191af7] rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-[#27292af7] flex justify-between items-center">
                    <span className="text-white/70">Showing {filteredUsers.length} of {users.length} users</span>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#27292af7] text-white font-poppins font-semibold">
                        <th className="p-3">
                          <aside
                            onClick={handleSelectAll}
                            className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${
                              filteredUsers.length > 0 && 
                              Object.keys(selectedUsers).length === filteredUsers.length && 
                              Object.values(selectedUsers).every(Boolean) 
                                ? "bg-blue-500 border-blue-500" 
                                : "border-white/50"
                            }`}
                          >
                            {filteredUsers.length > 0 && 
                             Object.keys(selectedUsers).length === filteredUsers.length && 
                             Object.values(selectedUsers).every(Boolean) && 
                             <CheckIcon className="w-3 h-3 text-white" />}
                          </aside>
                        </th>
                        <th className="p-3 text-left">
                          <div className="flex items-center">
                            Name
                            <div className="ml-2 flex flex-col">
                              <ArrowUpIcon 
                                className={`w-3 h-3 ${sortBy === 'name-asc' ? 'text-blue-500' : 'text-gray-500'} cursor-pointer -mb-0.5`} 
                                onClick={() => handleSortChange('name-asc')}
                              />
                              <ArrowDownIcon 
                                className={`w-3 h-3 ${sortBy === 'name-desc' ? 'text-blue-500' : 'text-gray-500'} cursor-pointer`} 
                                onClick={() => handleSortChange('name-desc')}
                              />
                            </div>
                          </div>
                        </th>
                        <th className="p-3">E-mail</th>
                        <th className="p-3">
                          <div className="flex justify-center items-center">
                            Status
                          </div>
                        </th>
                        <th className="p-3">
                          <div className="flex justify-center items-center">
                            Last login
                            <div className="ml-2 flex flex-col">
                              <ArrowUpIcon 
                                className={`w-3 h-3 ${sortBy === 'login-recent' ? 'text-blue-500' : 'text-gray-500'} cursor-pointer -mb-0.5`} 
                                onClick={() => handleSortChange('login-recent')}
                              />
                              <ArrowDownIcon 
                                className={`w-3 h-3 ${sortBy === 'login-oldest' ? 'text-blue-500' : 'text-gray-500'} cursor-pointer`} 
                                onClick={() => handleSortChange('login-oldest')}
                              />
                            </div>
                          </div>
                        </th>
                        <th className="p-3">Member since</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => {
                        const friend = shortTestimonials.find(friend => friend.email === user.email);
                        const userActive = isUserActive(user);
                        
                        return (
                          <tr key={user._id} className="border-b border-[#27292af7] hover:bg-[#232425]">
                            <td className="p-3 text-center">
                              <div
                                onClick={() => handleSelectUser(user._id)}
                                className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${!!selectedUsers[user._id] ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
                              >
                                {selectedUsers[user._id] && <CheckIcon className="w-3 h-3 text-white" />}
                              </div>  
                            </td>

                            <td className="p-3 text-center max-w-[150px]">
                              <div className="flex flex-row gap-2 justify-start">
                                <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={user.name}  
                                    className="w-7 h-7 rounded-full" />
                                <span className="text-ellipsis overflow-hidden whitespace-nowrap cursor-help" title={user.name}>{user.name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">{user.email}</td>
                            <td className="p-3 text-center">
                              {userActive ? (
                                <span className="flex items-center justify-center cursor-help" title={`This user was active in the last 48 hours`}>
                                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                                  Active
                                </span>
                              ) : (
                                <span className="flex items-center justify-center ml-3 cursor-help" title={`This user was inactive for more than 48 hours`}>
                                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN", {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                            : 'N/A'}
                            </td>
                            <td className="p-3 text-center">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                            </td>
                            <td className="p-3 text-center">
                              <div className="relative group">
                                <div className="transition-opacity duration-300">
                                  {user.email === "jairajgsklm@gmail.com" ? (
                                    <button title="This is the primary admin account, no changes can be made to it."
                                      className="scale-[85%] bg-[#18191af7] border border-gray-500 hover:border-blue-500  text-gray-500 hover:text-blue-500 pacity-30 px-3 py-1 rounded cursor-help"
                                    > Master Admin
                                    </button>
                                  ) : (
                                    <>
                                      <button 
                                        onClick={() => toggleAdmin(user._id, user.role)} 
                                        className={`scale-[85%] bg-[#18191af7] border border-white ${
                                          user.role === "admin" 
                                            ? "hover:border-red-500 hover:text-red-500" 
                                            : "hover:border-green-500 hover:text-green-500"
                                        } text-white opacity-30 hover:opacity-100 px-3 py-1 rounded`}
                                      >
                                        {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default withAuth(AdminDashboard);