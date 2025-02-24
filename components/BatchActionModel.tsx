import { useState } from "react";

// Add this interface to your existing interfaces at the top of your file
interface BatchActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
    isDestructive?: boolean;
  }
  
  // Add these state variables inside your AdminDashboard component
  // (right after your existing useState declarations)
  const [isBatchActionModalOpen, setIsBatchActionModalOpen] = useState(false);
  const [batchActionConfig, setBatchActionConfig] = useState<{
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    isDestructive: boolean;
  }>({
    title: '',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
    isDestructive: false,
  });
  
  // Add these functions to your component (place them with your other handler functions)
  const openBatchActionModal = (config: {
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
    isDestructive?: boolean;
  }) => {
    setBatchActionConfig({
      ...config,
      cancelText: config.cancelText || 'Cancel',
      isDestructive: config.isDestructive || false,
    });
    setIsBatchActionModalOpen(true);
  };
  
  const closeBatchActionModal = () => {
    setIsBatchActionModalOpen(false);
  };
  
  // Add this BatchActionModal component as a nested component inside your AdminDashboard component
  // Put it right before the return statement of your AdminDashboard component
  const BatchActionModal = ({ 
    isOpen, 
    onClose, 
    title, 
    description, 
    confirmText, 
    cancelText = 'Cancel', 
    onConfirm, 
    isDestructive = false 
  }: BatchActionModalProps) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-[#1e1f21] rounded-lg max-w-md w-full p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white/70 mb-6">{description}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#27292af7] text-white/70 hover:bg-[#323436] rounded-lg transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg transition-all ${
                isDestructive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Then inside your AdminDashboard's return statement, at the end of the JSX,
  // right before the closing </> tag, add:
  /*
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
  */