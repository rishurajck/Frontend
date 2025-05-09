import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditUser.module.css";
import { useSelector } from "react-redux";
import FormConfig from "../config/Formconfig";
import { toast, ToastContainer } from "react-toastify";
import AxiosInstance from "../config/AxiosInstance";
import Button from "../component/button/Button";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const roleOptions = ["ADMIN", "READ_ONLY", "CUSTOMER"];

  // Fetch user details
  const handleCancel = () => {
    navigate("/dashboard/usermanagement");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AxiosInstance.get(`/editUser/${id}`);
        const userData = res.data;

        setValues({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          username: userData.username || "",
          email: userData.email || "",
          role: userData.role || "",
        });

        setAssignedAccounts(userData.accounts || []);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUser();
  }, [id, user]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await AxiosInstance.get("/accounts");

        const fetchedAccounts = res.data;

        const sorted = [
          ...fetchedAccounts.filter((acc) =>
            assignedAccounts.some((a) => a.id === acc.id)
          ),
          ...fetchedAccounts.filter(
            (acc) => !assignedAccounts.some((a) => a.id === acc.id)
          ),
        ];

        setAllAccounts(sorted);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    if (user?.token) {
      fetchAccounts();
    }
  }, [assignedAccounts, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role" && (value === "ADMIN" || value === "READ_ONLY")) {
      setAssignedAccounts([]); // Clear assigned accounts when switching to "ADMIN" or "READ_ONLY"
    }
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountToggle = (account) => {
    setAssignedAccounts((prev) => {
      const exists = prev.some((a) => a.id === account.id);
      return exists
        ? prev.filter((a) => a.id !== account.id)
        : [...prev, account];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataUser = {
      ...values,
      accounts: assignedAccounts.map((acc) => acc.id),
    };

    try {
      const res = await AxiosInstance.put(`/updateUser/${id}`, dataUser);

      toast.success(res.data.message, {
        position: "top-right",
        theme: "colored",
        autoClose: 800,
      });

      setTimeout(() => {
        navigate("/dashboard/usermanagement");
      }, 800);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.editUser}>
      <ToastContainer />
      <h1>Edit User</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className={styles.row}>
          {["firstname", "lastname"].map((name) => {
            const field = FormConfig.find((f) => f.name === name);
            return (
              <div key={field.id} className={styles.formField}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={styles.inputField}
                  value={values[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            );
          })}
        </div>

        {/* Credentials */}
        <div className={styles.row}>
          {["username"].map((name) => {
            const field = FormConfig.find((f) => f.name === name);
            return (
              <div key={field.id} className={styles.formField}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={styles.inputField}
                  value={values[field.name]}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
            );
          })}
        </div>

        {/* Email & Role */}
        <div className={styles.row}>
          {(() => {
            const field = FormConfig.find((f) => f.name === "email");
            return (
              <div key={field.id} className={styles.formField}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={styles.inputField}
                  value={values[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            );
          })()}

          <div className={styles.formField}>
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              className={styles.inputField}
              value={values.role}
              onChange={handleChange}
              required
            >
              <option value="">Select a Role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {values.role === "CUSTOMER" && (
          <div className={styles.accountSectionWrapper}>
            <h4>Manage Associated Accounts</h4>
            <div className={styles.accountColumns}>
              {/* Available Accounts */}
              <div className={styles.accountColumn}>
                <h5>Available Accounts</h5>
                <ul className={styles.accountCheckboxList}>
                  {allAccounts.map((account) => (
                    <li key={account.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={assignedAccounts.some(
                            (a) => a.id === account.id
                          )}
                          onChange={() => handleAccountToggle(account)}
                        />
                        {account.accountId} - {account.accountName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assigned Accounts */}
              <div className={styles.accountColumn}>
                <h5>Assigned Accounts</h5>
                <ul className={styles.accountCheckboxList}>
                  {assignedAccounts.map((account) => (
                    <li key={account.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          onChange={() => handleAccountToggle(account)}
                        />
                        {account.accountId} - {account.accountName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className={styles.row}>
          <button type="submit" className={styles.submitBtn}>
            Save User
          </button>
          <Button
            text="Cancel"
            className={styles.cancelBtn}
            type="button"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
}

export default EditUser;
