// pages\admin\users.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminGuard from "./_layout";
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { shortTestimonials } from "@/components/ui/friends";
import { CheckIcon, ArrowUpIcon, ArrowDownIcon, ArrowPathIcon, FunnelIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import Head from 'next/head';
import BatchActionModal from '@/components/BatchActionModel';
import UserRegistrationModal from "./UserRegistrationModal";
import moment from 'moment';
import { CgUndo } from "react-icons/cg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";

interface User {
  _id: string;
  name: string;
  fullname: string;
  email: string;
  role: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
}

// interface BatchActionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   description: string;
//   confirmText: string;
//   cancelText: string;
//   onConfirm: () => Promise<void>;
//   isDestructive?: boolean;
// }

type FilterType = 'all' | 'admin' | 'member';
type StatusFilterType = 'all' | 'active' | 'inactive';
type SortType = 'none' | 'name-asc' | 'name-desc' | 'login-recent' | 'login-oldest' | 'member-newest' | 'member-oldest';
type BatchActionType = 'make-admin' | 'revoke-admin' | 'delete';




const UsersDashboard = () => {
  const router = useRouter();
  const [, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('none');
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Batch action modal state
  const [isBatchActionModalOpen, setIsBatchActionModalOpen] = useState(false);
  const [batchActionConfig, setBatchActionConfig] = useState<{
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => Promise<void>;
    isDestructive?: boolean;
  }>({
    title: '',
    description: '',
    confirmText: '',
    cancelText: 'Cancel',
    onConfirm: async () => { },
    isDestructive: false
  });
  const [processingBatchAction, setProcessingBatchAction] = useState(false);

  // Add a state variable to store the last fetched time
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  // Add this state variable with the other state declarations (around line 49)
  const [searchTerm, setSearchTerm] = useState<string>('');

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
  }, [users, activeFilter, statusFilter, sortBy, searchTerm]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<User[]>("/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);

      // Update the last fetched time after successful fetch
      setLastFetched(moment().format('MMM D, YYYY h:mm:ss A')); // Format the date using moment.js
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching members:", error.message);
      } else {
        console.error("Unexpected error:", String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // Add this function with the other filter and sort functions (around line 100)
  const applyFiltersAndSort = () => {
    // First apply search filter
    let filtered = [...users];

    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
      );
    }

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
    } else if (sortBy === 'member-newest') {
      filtered.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } else if (sortBy === 'member-oldest') {
      filtered.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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

  // Modify the resetAllFilters function to also clear the search term (around line 195)
  const resetAllFilters = () => {
    setActiveFilter('all');
    setStatusFilter('all');
    setSortBy('none');
    setSearchTerm('');
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
    // Get the filtered users that are not the master admin
    const selectableUsers = filteredUsers.filter(user => user.email !== "jairajgsklm@gmail.com");

    // Check if all selectable users are already selected
    const allSelected = selectableUsers.length > 0 &&
      selectableUsers.every(user => selectedUsers[user._id]);

    const newSelectedUsers: { [key: string]: boolean } = {};

    filteredUsers.forEach(user => {
      // Skip the Master Admin account
      if (user.email !== "jairajgsklm@gmail.com") {
        newSelectedUsers[user._id] = !allSelected;
      }
    });

    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectUser = (userId: string, email: string) => {
    // Prevent selecting the Master Admin account
    if (email === "jairajgsklm@gmail.com") {
      return;
    }
    setSelectedUsers(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  // const toggleAdmin = async (userId: string, currentRole: string) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const newRole = currentRole === "admin" ? "user" : "admin";

  //     const response = await axios.put(`/api/users?id=${userId}`,
  //       { role: newRole },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (response.data) {
  //       setUsers(users.map(user =>
  //         user._id === userId ? { ...user, role: newRole } : user
  //       ));
  //     }
  //   } catch (error) {
  //     console.error("Error updating member role:", error);
  //   }
  // };

  const formatMemberSince = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    return moment(dateString).format('D MMM YY, h:mm A');
  };

  // Batch action helpers
  const getSelectedUserIds = (): string[] => {
    return Object.entries(selectedUsers)
      .filter(([, isSelected]) => isSelected)
      .map(([userId, ]) => userId);
  };

  const getSelectedUserCount = (): number => {
    return getSelectedUserIds().length;
  };

  const openBatchActionModal = (actionType: BatchActionType) => {
    const selectedUserIds = getSelectedUserIds();
    const selectedUserCount = selectedUserIds.length;

    if (selectedUserCount === 0) return;

    // Filter out protected users (if applicable)
    const protectedEmails = ["jairajgsklm@gmail.com"];
    const selectedUsers = filteredUsers.filter(user =>
      selectedUserIds.includes(user._id) && !protectedEmails.includes(user.email)
    );

    // Update config based on action type
    switch (actionType) {
      case 'make-admin':
        setBatchActionConfig({
          title: `Promote ${selectedUserCount > 1 ? 'Members' : 'Member'} to Admin`,
          description: `Granting admin privileges to ${selectedUserCount} member${selectedUserCount > 1 ? 's' : ''} can have significant consequences. Are you sure?`,
          confirmText: `Promote to ${selectedUserCount > 1 ? 'Admins' : 'Admin'}`,
          cancelText: 'Cancel',
          isDestructive: false,
          onConfirm: async () => {
            setProcessingBatchAction(true);
            const token = localStorage.getItem('token');

            try {
              // Process each user one at a time
              for (const user of selectedUsers) {
                if (user.role !== 'admin') {
                  await axios.put(`/api/users?id=${user._id}`,
                    { role: 'admin' },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                }
              }

              // Update local state
              setUsers(users.map(user =>
                selectedUserIds.includes(user._id) && !protectedEmails.includes(user.email)
                  ? { ...user, role: 'admin' }
                  : user
              ));

              // Clear selections
              setSelectedUsers({});
              setIsBatchActionModalOpen(false);
            } catch (error) {
              console.error("Error updating member roles:", error);
              // Handle error (could add error state and display it)
            } finally {
              setProcessingBatchAction(false);
            }
          }
        });
        break;

      case 'revoke-admin':
        setBatchActionConfig({
          title: 'Revoke Admin Privileges',
          description: `Are you certain you want to revoke administrative access from the ${selectedUserCount} member${selectedUserCount > 1 ? 's' : ''}?`,
          confirmText: `Revoke ${selectedUserCount > 1 ? 'Admins' : 'Admin'}`,
          cancelText: 'Cancel',
          isDestructive: true,
          onConfirm: async () => {
            setProcessingBatchAction(true);
            const token = localStorage.getItem('token');

            try {
              // Process each user one at a time
              for (const user of selectedUsers) {
                if (user.role === 'admin') {
                  await axios.put(`/api/users?id=${user._id}`,
                    { role: 'user' },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                }
              }

              // Update local state
              setUsers(users.map(user =>
                selectedUserIds.includes(user._id) && !protectedEmails.includes(user.email)
                  ? { ...user, role: 'user' }
                  : user
              ));

              // Clear selections
              setSelectedUsers({});
              setIsBatchActionModalOpen(false);
            } catch (error) {
              console.error("Error updating member roles:", error);
              // Handle error (could add error state and display it)
            } finally {
              setProcessingBatchAction(false);
            }
          }
        });
        break;

      case 'delete':
        setBatchActionConfig({
          title: `Terminate ${selectedUserCount > 1 ? 'Members' : 'Member'}`,
          description: `Are you sure you want to permanently delete ${selectedUserCount} selected member${selectedUserCount > 1 ? 's' : ''}? This action cannot be undone.`,
          confirmText: `Terminate ${selectedUserCount > 1 ? 'Members' : 'Member'}`,
          cancelText: 'Cancel',
          isDestructive: true,
          onConfirm: async () => {
            setProcessingBatchAction(true);
            const token = localStorage.getItem('token');

            try {
              // Process each user one at a time
              for (const user of selectedUsers) {
                await axios.delete(`/api/users?id=${user._id}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
              }

              // Update local state
              setUsers(users.filter(user =>
                !selectedUserIds.includes(user._id) || protectedEmails.includes(user.email)
              ));

              // Clear selections
              setSelectedUsers({});
              setIsBatchActionModalOpen(false);
            } catch (error) {
              console.error("Error deleting members:", error);
              // Handle error (could add error state and display it)
            } finally {
              setProcessingBatchAction(false);
            }
          }
        });
        break;
    }

    setIsBatchActionModalOpen(true);
  };

  const closeBatchActionModal = () => {
    if (!processingBatchAction) {
      setIsBatchActionModalOpen(false);
    }
  };

  // Helper functions to check selected user roles
  const hasAdminSelected = (): boolean => {
    const selectedUserIds = getSelectedUserIds();
    return filteredUsers.some(user =>
      selectedUserIds.includes(user._id) &&
      user.role === 'admin' &&
      user.email !== "jairajgsklm@gmail.com"
    );
  };

  const hasNonAdminSelected = (): boolean => {
    const selectedUserIds = getSelectedUserIds();
    return filteredUsers.some(user =>
      selectedUserIds.includes(user._id) &&
      user.role !== 'admin'
    );
  };

  // Add this to check if any filter including search is active (around line 465)
  const isAnyFilterActive = activeFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'none' || searchTerm.trim() !== '';

  // Add this to count active filters including search (around line 467)
  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilter !== 'all') count++;
    if (statusFilter !== 'all') count++;
    if (sortBy !== 'none') count++;
    // if (searchTerm.trim() !== '') count++;
    return count;
  };

  const getActiveSortText = () => {
    switch (sortBy) {
      case 'member-newest': return 'Newest Members';
      case 'member-oldest': return 'Oldest Members';
      case 'name-asc': return 'Name (A-Z)';
      case 'name-desc': return 'Name (Z-A)';
      case 'login-recent': return 'Recent Login';
      case 'login-oldest': return 'Oldest Login';
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Head>
        <title>Member&apos;s Control Panel  - Admin Panel</title>
      </Head>

      <AdminGuard>
        <div className="flex min-h-screen text-white">

          <div className="absolute inset-0 -z-10 pointer-events-none">
            <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
          </div>

          <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className={`flex-1 p-4 md:p-10 transition-all duration-300 ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-12"}`}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-center mt-3">Member&apos;s Control Panel</h1>
                <h6 className="text-xs md:text-sm text-gray-500 font-poppins my-3 ml-5 md:ml-0 lg:ml-0">
                  Last fetched: {lastFetched ? lastFetched : 'N/A'}
                </h6>
              </div>
              <div className="mb-0 flex flex-col md:flex-row justify-end items-center w-full md:w-auto gap-2">
                <div className="flex items-center justify-between w-full md:w-auto ">
                  <div className="relative flex-1 max-w-full md:max-w-md mx-2 md:mr-5 lg:mr-4">
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 text-white bg-[#1e1f21] border border-[#323436]
                     font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm md:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>


                </div>

                <div className="flex flex-row gap-6 mt-5 md:my-0 lg:my-0">
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className={`flex items-center font-poppins gap-2 px-4 py-2 rounded-lg transition-all hover:bg-opacity-80 text-sm md:text-base ${isFiltersOpen ? 'bg-white text-black' : 'bg-[#1e1f21] text-white'}`}
                  >
                    <FunnelIcon className="h-4 w-4" />
                    <span>Filters & Sort</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="flex items-center justify-center bg-blue-600 text-white text-xs w-5 h-5 rounded-full">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </button>


                  <UserRegistrationModal isOpen={isOpen} closeModal={closeModal} onUserAdded={fetchUsers} />

                  <button
                    onClick={openModal}
                    className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg transition hover:bg-blue-700 text-sm md:text-base">
                    <PlusIcon className="w-5 h-5 stroke-white stroke-[1.5]" />
                    <span className="font-semibold font-poppins">New Member</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Update the active filters display (around line 480) */}
            {isAnyFilterActive && (
              <div className="text-xs md:text-sm text-gray-500 font-medium font-poppins flex items-center gap-2 justify-end mb-5 mt-3 mr-3  md:-mt-5 lg:-mt-5 flex-wrap">
                <span>
                  {searchTerm.trim() !== '' && `Search: "${searchTerm}"`}
                  {searchTerm.trim() !== '' && (activeFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'none') && ' | '}
                  {activeFilter !== 'all' && `Role: ${activeFilter === 'admin' ? 'Admins' : 'Members'}`}
                  {activeFilter !== 'all' && statusFilter !== 'all' && ' | '}
                  {statusFilter !== 'all' && `Status: ${statusFilter === 'active' ? 'Active' : 'Inactive'}`}
                  {(activeFilter !== 'all' || statusFilter !== 'all') && sortBy !== 'none' && ' | '}
                  {sortBy !== 'none' && `Sorted by: ${getActiveSortText()}`}
                </span>
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 font-poppins bg-gray-700 hover:bg-gray-600
                 text-white/70 hover:text-white px-2 py-1  rounded text-xs transition-all"
                >
                  <ArrowPathIcon className="h-3 w-3" />
                  Clear All
                </button>
              </div>
            )}


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

                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Role Filter Buttons */}
                  <div>
                    <h3 className="text-sm text-white/70 mb-3 font-medium">Filter by Role</h3>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleRoleFilterChange('all')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm ${activeFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        All ({users.length})
                      </button>
                      <button
                        onClick={() => handleRoleFilterChange('admin')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm ${activeFilter === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        Admins ({users.filter(user => user.role === 'admin').length})
                      </button>
                      <button
                        onClick={() => handleRoleFilterChange('member')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm ${activeFilter === 'member'
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
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm ${statusFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => handleStatusFilterChange('active')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm ${statusFilter === 'active'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        Active ({getActiveUsersCount()})
                      </button>
                      <button
                        onClick={() => handleStatusFilterChange('inactive')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm ${statusFilter === 'inactive'
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
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm flex items-center ${sortBy === 'name-asc'
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
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm flex items-center ${sortBy === 'login-recent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        Recent Login <ArrowUpIcon className="h-3 w-3 ml-1" />
                      </button>
                      <button
                        onClick={() => handleSortChange('login-oldest')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm flex items-center ${sortBy === 'login-oldest'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        Oldest Login <ArrowDownIcon className="h-3 w-3 ml-1" />
                      </button>
                      <button
                        onClick={() => handleSortChange('member-newest')}
                        className={`px-3 py-2 rounded-lg font-poppins transition-all text-sm flex items-center ${sortBy === 'member-newest'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        Newest Members <ArrowUpIcon className="h-3 w-3 ml-1" />
                      </button>
                      <button
                        onClick={() => handleSortChange('member-oldest')}
                        className={`px-3 py-2 rounded-lg transition-all text-sm flex items-center ${sortBy === 'member-oldest'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#27292af7] text-white/70 hover:bg-[#323436]'
                          }`}
                      >
                        Oldest Members <ArrowDownIcon className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {loading ? (
              <p className="text-center opacity-50 font-poppins">Retrieving data from server, just a moment...</p>
            ) : (
              <>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-10 ">
                    <p className="opacity-70 font-poppins">No members match your input.</p>
                    {isAnyFilterActive && (
                      <button
                        onClick={resetAllFilters}
                        className="mt-4 flex items-center gap-2 bg-blue-600 font-medium font-poppins
                        hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all mx-auto"
                      >
                        <CgUndo className="h-6 w-6 font-medium " />
                        Revert to Default
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#18191af7] rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-[#27292af7] flex flex-col md:flex-row justify-between">
                      <span className="text-white/70 text-sm font-normal ">
                        Showing {filteredUsers.length} of {users.length} members
                      </span>

                      {/* Batch Actions Section */}
                      {getSelectedUserCount() > 0 && (
                        <div className="flex flex-col md:flex-row lg:flex-row items-end
                        md:items-center lg:items-center gap-3 mr-3 -mt-6 md:mt-0 lg:mt-0">
                          <div>
                            <span className="text-white/45 text-xs md:text-sm lg:text-sm
                             font-thin md:font-normal lg:font-normal">
                              {getSelectedUserCount()} member{getSelectedUserCount() !== 1 ? 's' : ''} selected
                            </span>
                          </div>

                          <div className="flex flex-row gap-3 ">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() => openBatchActionModal("make-admin")}
                                    disabled={!hasNonAdminSelected()}
                                    className={`border font-poppins font-semibold w-full h-8 md:h-full lg:h-full
                                      md:px-4 md:py-1.5 lg:px-4 lg:py-1.5 rounded transition-colors ${hasNonAdminSelected()
                                        ? "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-700"
                                        : "border-gray-600 text-gray-600 cursor-not-allowed opacity-70"
                                      }`}
                                  >
                                    <span className="whitespace-nowrap text-xs md:text-sm lg:text-sm
                                     px-3 md:px-0 lg:px-0">Make Admin</span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  {hasNonAdminSelected()
                                    ? "Promote selected members to admin"
                                    : "No non-admin members selected"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() => openBatchActionModal("revoke-admin")}
                                    disabled={!hasAdminSelected()}
                                    className={`border font-poppins font-semibold w-full h-8 md:h-full lg:h-full
                                      md:px-4 md:py-1.5 lg:px-4 lg:py-1.5 rounded transition-colors ${hasAdminSelected()
                                        ? "border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
                                        : "border-gray-600 text-gray-600 cursor-not-allowed opacity-70"
                                      }`}
                                  >
                                    <span className="whitespace-nowrap text-xs md:text-sm lg:text-sm
                                     px-3 md:px-0 lg:px-0">Revoke Admin</span>

                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  {hasAdminSelected()
                                    ? "Revoke admin privileges from selected members"
                                    : "No admin members selected"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger >
                                  <button
                                    onClick={() => openBatchActionModal("delete")}
                                    className="border font-semibold border-red-600 text-red-600 hover:text-white
                                     hover:bg-red-600 font-poppins w-full h-8 md:h-full lg:h-full
                                    md:px-4 md:py-1.5 lg:px-4 lg:py-1.5 rounded transition-colors "
                                  >
                                    <span className="whitespace-nowrap text-xs md:text-sm lg:text-sm
                                     px-3 md:px-0 lg:px-0">Terminate</span>

                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">Delete selected members</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" w-[375px] md:w-full lg:w-full overflow-x-auto">
                      <table className="w-full bg-[#18191af7]"> {/* By using overflow-hidden, it ll turn off sticky check & name.*/}
                        <thead>
                          <tr className="bg-[#27292af7] text-white font-poppins font-semibold">
                            <th className="p-3 sticky left-0 bg-[#27292af7] z-10"> {/* Make checkbox column sticky */}
                              <aside
                                onClick={handleSelectAll}
                                className={`w-5 h-5 flex items-center font-poppins justify-center border-2 rounded cursor-pointer
                                  ${filteredUsers.filter(user => user.email !== "jairajgsklm@gmail.com").length > 0 &&
                                    filteredUsers.filter(user => user.email !== "jairajgsklm@gmail.com")
                                      .every(user => selectedUsers[user._id])
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-white/50"
                                  }`}
                              >
                                {filteredUsers.filter(user => user.email !== "jairajgsklm@gmail.com").length > 0 &&
                                  filteredUsers.filter(user => user.email !== "jairajgsklm@gmail.com")
                                    .every(user => selectedUsers[user._id]) && <CheckIcon className="w-3 h-3 text-white" />}
                              </aside>
                            </th>

                            <th className="p-3 text-left sticky left-[2.75rem] bg-[#27292af7] z-10"> {/* Make Name column sticky, adjust left value based on checkbox width */}
                              <div className="flex items-center">
                                Name
                                <div className="ml-2 flex flex-col">
                                  <ArrowUpIcon
                                    className={`w-3 h-3 ${sortBy === 'name-asc' ? 'text-blue-600' : 'text-gray-500'} cursor-pointer -mb-0.5`}
                                    onClick={() => handleSortChange('name-asc')}
                                  />
                                  <ArrowDownIcon
                                    className={`w-3 h-3 ${sortBy === 'name-desc' ? 'text-blue-600' : 'text-gray-500'} cursor-pointer`}
                                    onClick={() => handleSortChange('name-desc')}
                                  />
                                </div>
                              </div>
                            </th>
                            <th className="p-3">
                              <span className="-ml-20">E-mail</span>
                            </th>
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
                                    className={`w-3 h-3 ${sortBy === 'login-recent' ? 'text-blue-600' : 'text-gray-500'} cursor-pointer -mb-0.5`}
                                    onClick={() => handleSortChange('login-recent')}
                                  />
                                  <ArrowDownIcon
                                    className={`w-3 h-3 ${sortBy === 'login-oldest' ? 'text-blue-600' : 'text-gray-500'} cursor-pointer`}
                                    onClick={() => handleSortChange('login-oldest')}
                                  />
                                </div>
                              </div>
                            </th>
                            <th className="p-3">
                              <div className="flex justify-center items-center">
                                Member since
                                <div className="ml-2 flex flex-col">
                                  <ArrowUpIcon
                                    className={`w-3 h-3 ${sortBy === 'member-newest' ? 'text-blue-600' : 'text-gray-500'} cursor-pointer -mb-0.5`}
                                    onClick={() => handleSortChange('member-newest')}
                                  />
                                  <ArrowDownIcon
                                    className={`w-3 h-3 ${sortBy === 'member-oldest' ? 'text-blue-600' : 'text-gray-500'} cursor-pointer`}
                                    onClick={() => handleSortChange('member-oldest')}
                                  />
                                </div>
                              </div>
                            </th>
                            <th className="p-3">Current role</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredUsers.map((user) => {
                            const friend = shortTestimonials.find(friend => friend.email === user.email);
                            const userActive = isUserActive(user);

                            return (
                              <tr key={user._id}
                                className={`border-b border-[#27292af7] group cursor-pointer`}
                                onClick={() => handleSelectUser(user._id, user.email)}
                              >
                                <td className={`p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap sticky left-0 group-hover:bg-[#232425]
       ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : 'bg-[#18191af7]'}`}> {/* Make checkbox column sticky */}
                                  <TooltipProvider>
                                    {user.email === "jairajgsklm@gmail.com" ? (
                                      <Tooltip>
                                        <TooltipTrigger >
                                          <div
                                            className="w-5 h-5 flex items-center justify-center border-2 border-gray-500 rounded opacity-50 cursor-not-allowed"
                                          ></div>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                          This is the Master Admin account, which is locked against any modification.
                                        </TooltipContent>
                                      </Tooltip>
                                    ) : (
                                      <div
                                        className={`w-5 h-5 flex items-center justify-center border-2 rounded
                       ${!!selectedUsers[user._id] ? "bg-blue-600 border-blue-600" : "border-white/50"
                                          }`}
                                      >
                                        {selectedUsers[user._id] && <CheckIcon className="w-3 h-3 text-white" />}
                                      </div>
                                    )}
                                  </TooltipProvider>
                                </td>

                                <td className={`p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap sticky left-[2.75rem] group-hover:bg-[#232425]
                                   ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : 'bg-[#18191af7]'}`}>  {/* Make Name column sticky, adjust left value based on checkbox width */}
                                  <div className="flex flex-row gap-2 justify-start">
                                    <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={user.name}
                                      className="w-7 h-7 rounded-full" />
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <span className="pr-10">
                                            {user.name}
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">{friend ? friend.fullname : user.name}</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </td>
                                <td className={`p-3 text-left md:w-auto lg:w-auto w-full whitespace-nowrap group-hover:bg-[#232425] ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : ''}`}>{user.email}</td>
                                <TooltipProvider>
                                  <td className={`p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap group-hover:bg-[#232425] ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : ''}`}>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <span className="flex items-center justify-center">
                                          <span
                                            className={`w-2.5 h-2.5 rounded-full mr-2 ${userActive ? "bg-green-500 " : "bg-red-500 ml-3"}`}
                                          ></span>
                                          {userActive ? "Active" : "Inactive"}
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        {userActive
                                          ? "This member was active in the last 48 hours"
                                          : "This member was inactive for more than 48 hours"}
                                      </TooltipContent>
                                    </Tooltip>
                                  </td>
                                </TooltipProvider>
                                <td className={`p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap group-hover:bg-[#232425]
       ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : ''}`}>
                                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN", {
                                    day: '2-digit',
                                    month: 'short',
                                    year: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                  }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                                    : 'N/A'}
                                </td>
                                <td className={`p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap group-hover:bg-[#232425]
       ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : ''}`}>
                                  {formatMemberSince(user.createdAt)}
                                </td>
                                <td className={`p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap group-hover:bg-[#232425]
       ${selectedUsers[user._id] ? 'bg-[#2D2D2D80]' : ''}`}>
                                  <div className="relative group">
                                    <div className="transition-opacity duration-300">
                                      {user.email === "jairajgsklm@gmail.com" ? (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <button
                                                className="scale-[85%] bg-[#18191af7] font-poppins border border-gray-500 text-gray-500 hover:border-green-600 hover:text-green-600 px-4 py-1.5 rounded"
                                              >
                                                Master Admin
                                              </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
                                              This is the Master Admin account, which is locked against any modification.
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      ) : (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <button
                                                className={`scale-[85%] bg-[#18191af7] font-poppins border border-gray-500 text-gray-500
                                       ${user.role === "admin"
                                                    ? "hover:text-blue-600 hover:border-blue-600"
                                                    : "hover:text-yellow-600 hover:border-yellow-600"
                                                  } px-4 py-1.5 rounded capitalize`}
                                              >
                                                {user.role}
                                              </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
                                              This is the <span className="capitalize">{user.role}</span> account,
                                              so you can {user.role === "user" ? "grant" : "revoke"} admin privileges.
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
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
                  </div>
                )}
                <BatchActionModal
                  isOpen={isBatchActionModalOpen}
                  onClose={closeBatchActionModal}
                  title={batchActionConfig.title}
                  description={batchActionConfig.description}
                  confirmText={batchActionConfig.confirmText}
                  cancelText={batchActionConfig.cancelText}
                  onConfirm={batchActionConfig.onConfirm}
                  isDestructive={batchActionConfig.isDestructive}
                />
              </>
            )}
          </main>
        </div>
      </AdminGuard>
    </>
  );
};

export default withAuth(UsersDashboard);