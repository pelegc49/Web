import React, { useState, useContext } from 'react';
import axios from 'axios';
import { darkModeContext } from '../../App.jsx';

export default function ChangePasswordModal({ onClose, user }) {
  const { darkMode } = useContext(darkModeContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg('');

    if (newPassword !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }
    if (oldPassword === newPassword) {
      setMsg("New password must be different from the old password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/users/change-password', {
        uid: user.uid,
        oldPassword,
        newPassword,
      });
      setMsg(res.data.message);
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message?.includes('auth/invalid-credential')) {
        setMsg("Old password is incorrect.");
      } else {
        setMsg("Failed to change password.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-16 right-6 z-50 flex flex-col items-end">
      <form
        onSubmit={handleChangePassword}
        className={`
          w-80 rounded-xl shadow-xl p-6
          ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
        `}
      >
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Old Password</label>
          <input
            type="password"
            className={`
              w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
              ${darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-gray-50 border-gray-300 text-gray-800"}
            `}
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>New Password</label>
          <input
            type="password"
            className={`
              w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
              ${darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-gray-50 border-gray-300 text-gray-800"}
            `}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Confirm New Password</label>
          <input
            type="password"
            className={`
              w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
              ${darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-gray-50 border-gray-300 text-gray-800"}
            `}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {msg && (
          <div className={`text-sm mt-2 ${msg.toLowerCase().includes("success") ? "text-green-500" : "text-red-400"}`}>
            {msg}
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className={`
              flex-1 py-2 px-4 rounded-md text-white text-sm font-medium
              ${darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"}
            `}
            disabled={loading}
          >
            Change Password
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`
              flex-1 py-2 px-4 rounded-md text-white text-sm font-medium
              ${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"}
            `}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}