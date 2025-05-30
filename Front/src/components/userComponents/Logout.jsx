import React, { useState } from 'react';
import axios from 'axios';

export default function Logout({ open, onClose, onLogoutClick, onSuccess , user }) {
    if (!open) return null;
    return (
        <div style={{
            position: "fixed",
            top: "60px",
            right: "30px",
            background: "rgba(0,0,0,0.0)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
        }}>
            <span>logged in as {user.email}</span>
            <button onClick={onLogoutClick}>logout</button>
            <button onClick={onClose}>close</button>
        </div>
    );
}