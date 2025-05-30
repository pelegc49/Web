import React, { useState } from 'react';
import axios from 'axios';

export default function Logout({ open, onClose, onLogoutClick, onSuccess , user }) {
    if (!open) return null;
    return (
        <div className="fixed top-[60px] right-[30px] z-50 flex flex-col items-end">
            <div className="bg-white text-gray-800 rounded-xl shadow-xl p-4 w-72">
                <p className="mb-3 text-sm text-gray-700">
                    Logged in as <span className="font-semibold">{user?.email}</span>
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={onLogoutClick}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
                    >
                        Logout
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}