import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../pages/UserTable.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "../config/AxiosInstance";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleEdit = (user) => {
    navigate(`/dashboard/usermanagement/edituser/${user.id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AxiosInstance.get("/usermanagement");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [user]);

  const filteredUsers = users.filter((u) => {
    const searchMatch =
      u.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const roleMatch = roleFilter
      ? u.role?.toLowerCase() === roleFilter.toLowerCase()
      : true;

    return searchMatch && roleMatch;
  });

  return (
    <div className={styles.tableWrapper}>
      {/* Search bar and role filter */}
      <div className={styles.controls}>
        <button
          className={styles.addBtn}
          onClick={() => navigate("/dashboard/usermanagement/createuser")}
        >
          <FontAwesomeIcon icon={faPlus} className={styles.plusBtn} />
          Add New User
        </button>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="read_only">Read Only</option>
        </select>
      </div>

      {/* User table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Last Login</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id || index} className={styles.tr}>
              <td className={styles.td}>{user.id}</td>
              <td className={styles.td}>{user.firstname}</td>
              <td className={styles.td}>{user.lastname}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.role}</td>
              <td className={styles.td}>{user.lastLogin || "N/A"}</td>
              <td className={styles.td}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleEdit(user)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
