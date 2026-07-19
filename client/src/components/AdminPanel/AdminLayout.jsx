import React from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const ROLE_LABELS = {
  secy:        "GSSA — Sports Secretary",
  chairperson: "Chairperson",
  dean:        "Dean of Students Affairs",
  superadmin:  "Super Admin",
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const raw      = localStorage.getItem("admin_user");
  const user     = raw ? JSON.parse(raw) : null;

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    navigate("/certificate-admin-gssa-0000");   // back to login page
  };

  if (!user) {
    navigate("/certificate-admin-gssa-0000");
    return null;
  }

  return (
    <div className="admin-layout">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-topbar-logo">
            IITB <span>Sports</span>
          </span>
          <div className="admin-topbar-divider" />
          <span className="admin-topbar-role">
            {ROLE_LABELS[user.role] || user.role}
          </span>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-topbar-user">{user.name}</span>
          <button className="admin-btn-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;