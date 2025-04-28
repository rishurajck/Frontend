import React from "react";
import styles from "./UserManagement.module.css";
import UserTable from "../../pages/UserTable";

function UserManagement() {
  return (
    <div className={styles.userManagement}>
      <h2>Users</h2>
      <div className={styles.activityContainer}>
        <UserTable />
      </div>
    </div>
  );
}

export default UserManagement;
