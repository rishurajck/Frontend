import React from "react";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faGauge,
  faBusinessTime,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const role = useSelector((state) => state.auth.user?.role?.toLowerCase());

  return (
    <div className={styles.sidebar}>
      {role === "admin" && (
        <>
          <NavLink
            to="/dashboard/usermanagement"
            className={styles.userManagement}
          >
            <FontAwesomeIcon icon={faUser} className={styles.umIcon} />
            User Management
          </NavLink>
          <NavLink to="/dashboard/onboarding" className={styles.onboarding}>
            <FontAwesomeIcon icon={faUsers} className={styles.onboardIcon} />
            Onboarding Form
          </NavLink>
        </>
      )}
      {role === "read_only" && (
        <>
          <NavLink
            to="/dashboard/usermanagement"
            className={styles.userManagement}
          >
            <FontAwesomeIcon icon={faUser} className={styles.umIcon} />
            User Management
          </NavLink>
        </>
      )}
      {(role === "admin" || role === "read_only" || role === "customer") && (
        <>
          <NavLink to="/dashboard/costexplorer" className={styles.costExplorer}>
            <FontAwesomeIcon icon={faGauge} className={styles.ceIcon} />
            Cost Explorer
          </NavLink>
          <NavLink to="/dashboard/awsservice" className={styles.awsService}>
            <FontAwesomeIcon icon={faBusinessTime} className={styles.awsIcon} />
            AWS Services
          </NavLink>
        </>
      )}
    </div>
  );
}

export default Sidebar;
