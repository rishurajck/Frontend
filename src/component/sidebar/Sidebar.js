import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faGauge,
  faBusinessTime,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const role = useSelector((state) => state.auth.user?.role?.toLowerCase());
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
      </button>

      {role === "admin" && (
        <>
          <NavLink to="/dashboard/usermanagement" className={styles.link}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            {!collapsed && <span>User Management</span>}
          </NavLink>
          <NavLink to="/dashboard/onboarding" className={styles.link}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            {!collapsed && <span>Onboarding Form</span>}
          </NavLink>
        </>
      )}
      {role === "read_only" && (
        <NavLink to="/dashboard/usermanagement" className={styles.link}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          {!collapsed && <span>User Management</span>}
        </NavLink>
      )}
      {(role === "admin" || role === "read_only" || role === "customer") && (
        <>
          <NavLink to="/dashboard/costexplorer" className={styles.link}>
            <FontAwesomeIcon icon={faGauge} className={styles.icon} />
            {!collapsed && <span>Cost Explorer</span>}
          </NavLink>
          <NavLink to="/dashboard/awsservice" className={styles.link}>
            <FontAwesomeIcon icon={faBusinessTime} className={styles.icon} />
            {!collapsed && <span>AWS Services</span>}
          </NavLink>
        </>
      )}
    </div>
  );
}

export default Sidebar;
