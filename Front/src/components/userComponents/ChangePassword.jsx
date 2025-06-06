import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePasswordModal({ onClose, user }) {
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
      if(err.response?.data?.message?.includes('auth/invalid-credential')){
        setMsg("Old password is incorrect.");
      }else{
        setMsg("Failed to change password.");
    }
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-16 right-6 z-50 flex flex-col items-end">
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-6 rounded-xl shadow-xl w-80 text-gray-800 space-y-4"
      >
        <h2 className="text-xl font-semibold">Change Password</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {msg && (
          <div className={`text-sm ${msg.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className={`flex-1 py-2 px-4 rounded-md text-white text-sm font-medium ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={loading}
          >
            Change Password
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}