import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminGuard from "./_layout";
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { shortTestimonials } from "@/components/ui/friends";
import { CheckIcon, ChevronUpIcon, ChevronDownIcon,  ArrowsUpDownIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import Head from 'next/head';
import BatchActionModal from '@/components/BatchActionModel';
import moment from 'moment';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";


interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  isActive: boolean;
  createdAt?: string;
}


type SortField = 'name' | 'email' | 'role' | 'createdAt' | 'lastLogin';
type SortOrder = 'asc' | 'desc';

const AdminsPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmins, setSelectedAdmins] = useState<{ [key: string]: boolean }>({});

  // Sorting and filtering states
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  // const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin'>('all');

  const [regularUsers, setRegularUsers] = useState<Admin[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  // Selected admins for batch operations
  const [selectedAdminsData, setSelectedAdminsData] = useState<Admin[]>([]);

  // Bulk action states
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Master admin email constant
  const MASTER_ADMIN_EMAIL = "jairajgsklm@gmail.com";

  const [isBatchActionModalOpen, setIsBatchActionModalOpen] = useState(false);
  const [batchActionConfig, setBatchActionConfig] = useState<{
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => Promise<void>;
    isDestructive?: boolean;
    showSelected?: boolean;
  }>({
    title: '',
    description: '',
    confirmText: '',
    cancelText: 'Cancel',
    onConfirm: async () => { },
    isDestructive: false,
    showSelected: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAdmin(true);
      fetchAdmins();
    }
  }, [router]);

  const [lastFetched, setLastFetched] = useState<string | null>(null);


  const fetchAdmins = async () => {
    try {
      const response = await axios.get<Admin[]>("/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const adminUsers = response.data.filter(user => user.role === "admin");
      setAdmins(adminUsers);
      setFilteredAdmins(adminUsers);
      setLastFetched(moment().format('MMM D, YYYY h:mm:ss A')); // Format the date using moment.js

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching admins:", error.message);
      } else {
        console.error("Unexpected error:", String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch regular users for making admin
  const fetchRegularUsers = async () => {
    try {
      const response = await axios.get<Admin[]>("/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data.filter(user => user.role !== "admin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching members:", error.message);
      } else {
        console.error("Unexpected error:", String(error));
      }
      return [];
    }
  };

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    let result = [...admins];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(admin => {
        const isActive = admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000;
        return statusFilter === 'active' ? isActive : !isActive;
      });
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(admin => admin.role === roleFilter);
    }

    // Apply search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        admin =>
          admin.name.toLowerCase().includes(lowercaseSearch) ||
          admin.email.toLowerCase().includes(lowercaseSearch)
      );
    }

// Apply sorting
result.sort((a, b) => {
  let aValue: string | number | Date = a[sortField] || '';
  let bValue: string | number | Date = b[sortField] || '';

  // Special handling for dates
  if (sortField === 'createdAt' || sortField === 'lastLogin') {
    aValue = aValue ? new Date(aValue).getTime() : 0;
    bValue = bValue ? new Date(bValue).getTime() : 0;
  } else if (typeof aValue === 'string' && typeof bValue === 'string') {
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();
  }

  if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
  if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
  return 0;
});


    setFilteredAdmins(result);
  }, [admins, sortField, sortOrder, searchTerm, statusFilter, roleFilter]);

  // Update selectedAdminsData whenever selectedAdmins changes
  useEffect(() => {
    const selectedAdminsList = filteredAdmins.filter(admin => selectedAdmins[admin._id]);
    setSelectedAdminsData(selectedAdminsList);
  }, [selectedAdmins, filteredAdmins]);

  const handleSelectAll = () => {
    // Get all non-master admin IDs
    const selectableAdmins = filteredAdmins.filter(admin => admin.email !== MASTER_ADMIN_EMAIL);

    const allSelectableSelected =
      selectableAdmins.length > 0 &&
      selectableAdmins.every(admin => selectedAdmins[admin._id]);

    const newSelectedAdmins: { [key: string]: boolean } = {};

    // Only toggle selectable admins (non-master)
    filteredAdmins.forEach(admin => {
      if (admin.email !== MASTER_ADMIN_EMAIL) {
        newSelectedAdmins[admin._id] = !allSelectableSelected;
      }  //Keep Master Admin Unselected
    });

    setSelectedAdmins(newSelectedAdmins);
    setShowBulkActions(!allSelectableSelected && selectableAdmins.length > 0);
  };

  const handleSelectAdmin = (adminId: string, email: string) => {
    if (email === MASTER_ADMIN_EMAIL) {
      // Do not allow selection of the Master Admin
      return;
    }
    const newSelectedAdmins = { ...selectedAdmins, [adminId]: !selectedAdmins[adminId] };
    setSelectedAdmins(newSelectedAdmins);

    // Show bulk actions if at least one admin is selected
    const hasSelected = Object.values(newSelectedAdmins).some(Boolean);
    setShowBulkActions(hasSelected);
  };

  const toggleAdmin = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setBatchActionConfig({
      title: `Revoke Admin Privileges`,
      description: `Are you sure you want to revoke admin privileges from this member?`,
      confirmText: `Revoke Admin`,
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`/api/users?id=${userId}`,
            { role: newRole },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data) {
            setAdmins(admins.filter(admin => admin._id !== userId));
          }
        } catch (error) {
          console.error("Error updating member role:", error);
        } finally {
          setIsBatchActionModalOpen(false); // Close the modal after action
        }
      }
    });
    setIsBatchActionModalOpen(true); // Open the modal
  };

  const handleBulkAction = async (action: 'revoke' | 'delete') => {
    const selectedIds = Object.entries(selectedAdmins)
      .filter(([, isSelected]) => isSelected)
      .map(([id]) => id);

    if (selectedIds.length === 0) return;

    // Filter out the master admin from any bulk actions
    const nonMasterAdminIds = selectedIds.filter(id => {
      const admin = admins.find(a => a._id === id);
      return admin?.email !== MASTER_ADMIN_EMAIL;
    });

    if (nonMasterAdminIds.length === 0) {
      alert("This is the Master Admin account, which is locked against any modification.");
      return;
    }

    if (action === 'revoke') {
      // Get the actual admin objects for display in the modal
      // const selectedAdminsList = filteredAdmins.filter(admin =>
      //   selectedIds.includes(admin._id) && admin.email !== MASTER_ADMIN_EMAIL
      // );

      setBatchActionConfig({
        title: 'Revoke Admin Privileges',
        description: `Are you certain you want to revoke administrative access from the selected admins?`,
        confirmText: `Revoke Admins`,
        cancelText: 'Cancel',
        isDestructive: true,
        showSelected: true,
        onConfirm: async () => {
          const token = localStorage.getItem('token');
          try {
            for (const userId of nonMasterAdminIds) {
              await axios.put(`/api/users?id=${userId}`, { role: "user" }, { headers: { Authorization: `Bearer ${token}` } });
            }
            fetchAdmins(); // Refresh the admin list
            setSelectedAdmins({});
            setShowBulkActions(false);
          } catch (error) {
            console.error("Error revoking admin privileges:", error);
          } finally {
            setIsBatchActionModalOpen(false); // Close the modal after action
          }
        }
      });
      setIsBatchActionModalOpen(true); // Open the modal
    } else if (action === 'delete') {
      // Implement delete functionality if needed
      console.log("Delete action not implemented");
    }
  };

  // Create a function to handle promoting the selected user to admin
  const promoteUserToAdmin = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `/api/users?id=${selectedUser}`,
        { role: "admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh the admin list
      fetchAdmins();
      // Reset selection
      setSelectedUser("");
      setIsBatchActionModalOpen(false);

    } catch (error) {
      console.error("Error making new admin:", error);
    }
  };

  // Update the handleAddAdmin function to set up the modal with the right onConfirm
  const handleAddAdmin = async () => {
    try {
      const users = await fetchRegularUsers();

      if (users.length === 0) {
        alert("No regular members found to make admin");
        return;
      }

      // Reset selected user
      setSelectedUser("");

      // Set up the batch action modal config
      setBatchActionConfig({
        title: 'Promote Member to Admin',
        description: 'Granting admin privileges to members can have significant consequences. Are you sure?',
        confirmText: 'Promote to Admin',
        cancelText: 'Cancel',
        isDestructive: false,
        onConfirm: promoteUserToAdmin
      });

      // Store users for the modal
      setRegularUsers(users);
      setIsBatchActionModalOpen(true);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const toggleBulkActions = () => {
    setSelectedAdmins({});
    setShowBulkActions(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order if clicking the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set to ascending by default
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setRoleFilter('all');
    setSortField('name');
    setSortOrder('asc');
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowsUpDownIcon className="w-4 h-4 opacity-30" />;
    return sortOrder === 'asc' ?
      <ChevronUpIcon className="w-4 h-4" /> :
      <ChevronDownIcon className="w-4 h-4" />;
  };

  const getSelectedCount = () => {
    return Object.values(selectedAdmins).filter(Boolean).length;
  };


  // Check if all selectable admins are selected
  const areAllSelectableAdminsSelected = () => {
    const selectableAdmins = filteredAdmins.filter(admin => admin.email !== MASTER_ADMIN_EMAIL);
    return (
      selectableAdmins.length > 0 &&
      selectableAdmins.every(admin => selectedAdmins[admin._id])
    );
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin&apos;s Control Panel - Admin Panel</title>
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
                <h1 className="text-2xl md:text-4xl font-bold text-center mt-3">Admin&apos;s Control Panel</h1>
                <h6 className="text-xs md:text-sm text-gray-500 font-poppins my-3 ml-5 md:ml-0 lg:ml-0">
                  Last fetched: {lastFetched ? lastFetched : 'N/A'}
                </h6>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3 mt-3 md:mt-0">
                {/* <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[#27292af7] px-4 py-2 rounded-lg transition hover:bg-[#323436]"
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
              </button> */}

                <button
                  onClick={handleAddAdmin}
                  className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg transition hover:bg-blue-700 text-sm md:text-base"
                >
                  <PlusIcon className="w-5 h-5 stroke-white stroke-[1.5]" />
                  <span className="font-semibold font-poppins"> New Admin</span>
                </button>
              </div>
            </div>

            {/* Search and filters */}
            {/* {showFilters && (
            <div className="bg-[#27292af7] p-4 rounded-lg mb-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Filter admins</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-white/60 hover:text-white"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/70 mb-1 text-sm">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or email"
                    className="w-full px-3 py-2 bg-[#1a1b1d] rounded border border-[#333437] focus:outline-none focus:border-blue-600"
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 mb-1 text-sm">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                    className="w-full px-3 py-2 bg-[#1a1b1d] rounded border border-[#333437] focus:outline-none focus:border-blue-600"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#18191af7] border border-white/20 rounded hover:bg-[#232425] transition w-full"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )} */}

            {/* Bulk actions bar */}
            {showBulkActions && (
              <div className=" p-3 rounded-lg mb-2 flex flex-row  items-center justify-between animate-slideDown gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-sm">
                    {getSelectedCount()} admin{getSelectedCount() !== 1 ? 's' : ''} selected
                  </span>
                  <button
                    onClick={toggleBulkActions}
                    className="text-white/60 hover:text-white mt-1"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          onClick={() => handleBulkAction('revoke')}
                          className="border border-red-600 font-poppins text-red-600 hover:text-white hover:bg-red-600 
        text-sm hover:opacity-100 px-4 py-1.5 rounded transition-colors"
                        >
                          Revoke Admin
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        Revoke admin privileges from selected members
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )}

            {loading ? (
              <p className="text-center opacity-50">Retrieving data from server, just a moment...</p>
            ) : filteredAdmins.length === 0 ? (
              <div className="text-center py-10 bg-[#18191af7] rounded-lg">
                <p className="text-xl opacity-70">No admins found matching your filters</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className=" w-[375px] md:w-full lg:w-full overflow-x-auto">
                <table className="w-full bg-[#18191af7] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#27292af7] text-white font-poppins font-semibold">
                      <th className="p-3">
                        <aside
                          onClick={handleSelectAll}
                          className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${areAllSelectableAdminsSelected() ?
                            "bg-blue-600 border-blue-600" : "border-white/50"}`}
                        >
                          {areAllSelectableAdminsSelected() && <CheckIcon className="w-3 h-3 text-white" />}
                        </aside>
                      </th>
                      <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          <span className="mr-2">Name</span>
                          {getSortIcon('name')}
                        </div>
                      </th>
                      <th className="p-3 cursor-pointer" onClick={() => handleSort('email')}>
                        <div className="-ml-10 flex items-center justify-center">
                          <span className="mr-2">E-mail</span>
                          {getSortIcon('email')}
                        </div>
                      </th>
                      <th className="p-3">Status</th>

                      {/* <th className="p-3 cursor-pointer" onClick={() => handleSort('role')}>
                      <div className="flex items-center justify-center">
                        <span className="mr-2">Role</span>
                        {getSortIcon('role')}
                      </div>
                    </th> */}

                      <th className="p-3 cursor-pointer" onClick={() => handleSort('createdAt')}>
                        <div className="flex items-center justify-center">
                          <span className="mr-2">Member since</span>
                          {getSortIcon('createdAt')}
                        </div>
                      </th>
                      <th className="p-3 cursor-pointer" onClick={() => handleSort('lastLogin')}>
                        <div className="flex items-center justify-center">
                          <span className="mr-2">Last login</span>
                          {getSortIcon('lastLogin')}
                        </div>
                      </th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => {
                      const isMasterAdmin = admin.email === MASTER_ADMIN_EMAIL;
                      const friend = shortTestimonials.find(friend => friend.email === admin.email);
                      return (
                        <tr onClick={() => handleSelectAdmin(admin._id, admin.email)}
                          key={admin._id} className={`border-b border-[#27292af7] hover:bg-[#232425] cursor-pointer ${selectedAdmins[admin._id] ? 'bg-[#2D2D2D80]' : ''}`}
                        >
                          <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                            {isMasterAdmin ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <div
                                      className="w-5 h-5 flex items-center justify-center border-2 rounded opacity-30 border-white/50 cursor-not-allowed"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    This is the Master Admin account, which is locked against any modification.
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              <div
                                className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${!!selectedAdmins[admin._id] ? "bg-blue-600 border-blue-600" : "border-white/50"}`}
                              >
                                {selectedAdmins[admin._id] && <CheckIcon className="w-3 h-3 text-white" />}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                            <div className="flex flex-row gap-3 justify-start  ">
                              <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={admin.name} className="w-7 h-7 rounded-full" />
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="pr-10">
                                      {admin.name}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="right">
                                    {friend ? friend.fullname : admin.name}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>                          </div>
                          </td>
                          <td className="p-3 text-left md:w-auto lg:w-auto w-full whitespace-nowrap">{admin.email}</td>
                          <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="flex items-center justify-center ml-0">
                                    <span className={`w-2.5 h-2.5 rounded-full mr-2 ${admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000 ? "bg-green-500" : "bg-red-500 ml-2"}`}></span>
                                    {admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000 ? "Active" : "Inactive"}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  {admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000
                                    ? "This admin was active in the last 48 hours"
                                    : "This admin was inactive for more than 48 hours"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                          {/* <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap capitalize">{admin.role}</td> */}
                          <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">{admin.createdAt ? new Date(admin.createdAt).toLocaleString("en-IN", {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                            : 'N/A'}
                          </td>

                          <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                            {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString("en-IN", {
                              day: '2-digit',
                              month: 'short',
                              year: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                              : 'N/A'}
                          </td>
                          <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                            <div className="relative group">

                              <div className="transition-opacity duration-300">
                                <TooltipProvider>
                                  {isMasterAdmin ? (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <button
                                          className="scale-[85%] bg-[#18191af7] border border-gray-500 hover:border-green-600 text-gray-500 hover:text-green-600 px-3 py-1 rounded"
                                        >
                                          Master Admin
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        This is the Master Admin account, which is locked against any modification.
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <button
                                          onClick={() => toggleAdmin(admin._id, admin.role)}
                                          className="scale-[85%] bg-[#18191af7] border border-white hover:border-red-500 text-white opacity-30 hover:opacity-100 hover:text-red-500 px-3 py-1 rounded"
                                        >
                                          Revoke Admin
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        Revoke admin privileges from selected members
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </TooltipProvider>
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
          </main>

          <BatchActionModal
            isOpen={isBatchActionModalOpen}
            onClose={() => setIsBatchActionModalOpen(false)}
            title={batchActionConfig.title}
            description={batchActionConfig.description}
            confirmText={batchActionConfig.confirmText}
            cancelText={batchActionConfig.cancelText}
            onConfirm={batchActionConfig.onConfirm}
            isDestructive={batchActionConfig.isDestructive}
            users={regularUsers}
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
            showSelected={batchActionConfig.showSelected}
            selectedAdmins={selectedAdminsData}
          />
        </div>
      </AdminGuard>
    </>
  );
};

export default withAuth(AdminsPage);