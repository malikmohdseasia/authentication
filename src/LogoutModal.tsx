const LogoutModal = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Confirm Logout
        </h2>

        <p className="text-sm text-gray-600 mt-3">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
