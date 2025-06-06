import React, { useState, useContext } from 'react';
import { darkModeContext } from '../../App.jsx';
import ChangePassword from './ChangePassword.jsx';

export default function Logout({ open, onClose, onLogoutClick, user }) {
  const { darkMode } = useContext(darkModeContext);
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (!open) return null;
  return (
    <div className="fixed top-[60px] right-[30px] z-50 flex flex-col items-end">
      <div className={`
        w-80 rounded-xl shadow-xl p-6
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
      `}>
        <p className="mb-3 text-sm">
          Logged in as <span className="font-semibold">{user?.email}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={onLogoutClick}
            className={`
              w-full py-2 px-4 rounded text-white font-medium
              ${darkMode ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"}
            `}
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className={`
              w-full py-2 px-4 rounded text-white font-medium
              ${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"}
            `}
          >
            Close
          </button>
          <button
            onClick={() => setShowChangePassword(true)}
            className={`
              w-full py-2 px-4 rounded text-white font-medium
              ${darkMode ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-700"}
            `}
          >
            Change Password
          </button>
        </div>
      </div>
      {showChangePassword && (
        <ChangePassword
          user={user}
          onClose={() => setShowChangePassword(false)}
        />
      )}
    </div>
  );
}