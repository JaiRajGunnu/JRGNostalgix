// components\BatchActionModel.tsx

import React, { useEffect } from 'react';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  isActive: boolean;
  createdAt?: string;
}

interface Friend {
  src: string;
  email: string;
  // Add any other properties that might be in shortTestimonials
}

interface BatchActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => Promise<void>;
  isDestructive?: boolean;
  users?: Admin[];
  selectedUser?: string;
  onUserSelect?: (userId: string) => void;
  showSelected?: boolean;
  selectedAdmins?: Admin[];
  testimonials?: Friend[]; // Add this to pass in shortTestimonials
  adminOnly?: boolean; // New prop to filter users by admin role
  isPromoting?: boolean; // New prop to indicate if we're promoting users
}

const BatchActionModal: React.FC<BatchActionModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  isDestructive = false,
  users = [],
  selectedUser = "",
  onUserSelect = () => {},
  showSelected = false,
  selectedAdmins = [],
  testimonials = [], // Default to empty array
  adminOnly = false, // Default to false for backward compatibility
  isPromoting = false // Default to false
}: BatchActionModalProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [localSelectedUser, setLocalSelectedUser] = React.useState(selectedUser);
  
  // Update local state when selectedUser prop changes
  useEffect(() => {
    setLocalSelectedUser(selectedUser);
  }, [selectedUser]);

  const handleUserSelect = (userId: string) => {
    setLocalSelectedUser(userId);
    onUserSelect(userId);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      // Clear selection after successful operation
      if (isPromoting) {
        setLocalSelectedUser("");
      }
    } catch (error) {
      console.error("Error during batch action:", error);
    } finally {
      setIsLoading(false);
      // Don't close modal immediately for promotion so user can see success state
      if (!isPromoting) {
        onClose();
      } else {
        // For promotion, add a small delay before closing
        setTimeout(() => onClose(), 800);
      }
    }
  };

  // Determine if this is a user selection modal
  const isUserSelectionModal = users && users.length > 0;
  
  // Filter users based on requirements
  const filteredUsers = React.useMemo(() => {
    // If we're showing selected admins for revocation
    if (showSelected && selectedAdmins && selectedAdmins.length > 0) {
      return selectedAdmins;
    }
    
    // For promotion, show non-admin users
    if (isPromoting) {
      return users.filter(user => user.role !== "admin");
    }
    
    // Otherwise apply regular filtering based on adminOnly flag
    return adminOnly 
      ? users.filter(user => user.role === "admin") 
      : users;
  }, [users, adminOnly, showSelected, selectedAdmins, isPromoting]);

  // Get selected user object for immediate feedback
  const selectedUserObject = users.find(user => user._id === localSelectedUser);

  // Helper function to get the correct avatar image
  const getAvatarImage = (email: string) => {
    const friend = testimonials.find(f => f.email === email);
    return friend?.src || "/img/guestavatar.svg";
  };

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      // Don't reset selection here - it clears the selection too early
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="sm:max-w-md bg-[#18191af7] border border-[#27292af7] text-white rounded-lg shadow-lg w-full max-w-lg mx-4 ">
        <div className="p-5">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-white/70 mt-1 text-md">
              {description}
            </p>
          </div>
          
          {/* If we're showing admins for revocation, we'll use the filtered list above */}
          {showSelected && filteredUsers.length > 0 && (
            <div className="max-h-60 overflow-y-auto my-4 pr-2 font-poppins">
              <div className="mb-2 text-white/70">Selected admins:</div>
              <div className="space-y-2">
                {filteredUsers.map((admin) => (
                  <div 
                    key={admin._id}
                    className="p-3 border border-[#333437] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={getAvatarImage(admin.email)} 
                        alt={admin.name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-sm text-white/70">{admin.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* User selection list - only show when not in "showSelected" mode */}
          {isUserSelectionModal && !showSelected && (
            <div className="max-h-60 overflow-y-auto my-4 pr-2 font-poppins">
              {filteredUsers.length > 0 ? (
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div 
                      key={user._id}
                      onClick={() => handleUserSelect(user._id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        localSelectedUser === user._id 
                          ? "border-blue-600 bg-blue-600/20" 
                          : "border-[#333437] hover:border-white/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={getAvatarImage(user.email)} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-white/70">
                            {user.email} 
                            {isPromoting && localSelectedUser === user._id && isLoading && (
                              <span className="ml-2 text-green-400">(Promoting...)</span>
                            )}
                            {adminOnly && <span className="ml-2 text-blue-400">(Admin)</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-white/70">
                  {adminOnly ? "No admin users found." : 
                   isPromoting ? "No users available for promotion." : 
                   "No users found."}
                </div>
              )}
            </div>
          )}

          {/* Immediate feedback for promotion */}
          {isPromoting && localSelectedUser && selectedUserObject && (
            <div className="my-4 p-3 border border-green-500/30 bg-green-500/10 rounded-lg">
              <p className="text-green-400">
                {isLoading ? 
                  `Promoting ${selectedUserObject.name} to admin...` : 
                  `Ready to promote ${selectedUserObject.name} to admin.`}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 mt-4 border-t font-poppins border-[#333437]">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-transparent border font-poppins border-[#333437] hover:bg-[#27292af7] hover:border-white/40 text-white"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading || (isUserSelectionModal && !showSelected && !localSelectedUser)}
              className={`px-4 py-2 rounded-md font-poppins font-semibold ${
                isDestructive 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white disabled:opacity-75 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchActionModal;