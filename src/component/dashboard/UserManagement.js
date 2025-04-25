import React from "react";
import styles from "./UserManagement.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserTable from "../../pages/UserTable";

function UserManagement() {
  const navigate = useNavigate();
  return (
    <div className={styles.userManagement}>
      <h2>Users</h2>

      <div className={styles.activityContainer}>
        <nav className={styles.navMenu}>
          <li className={styles.listing}>
            <button
              className={styles.addBtn}
              onClick={() => navigate("/dashboard/usermanagement/createuser")}
            >
              <FontAwesomeIcon icon={faPlus} className={styles.plusBtn} />
              Add New User
            </button>
          </li>
        </nav>
        <UserTable />
      </div>
    </div>
  );
}

export default UserManagement;
