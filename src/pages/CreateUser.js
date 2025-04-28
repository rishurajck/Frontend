import React, { useState, useEffect } from "react";
import styles from "../pages/CreateUser.module.css";
import { useNavigate } from "react-router-dom";
import FormConfig from "../config/Formconfig";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "../config/AxiosInstance";
import Button from "../component/button/Button";

function CreateUser() {
  const navigate = useNavigate();
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
  const { user } = useSelector((state) => state.auth);
  const handleClick = () => navigate("/dashboard/usermanagement");
  const roleOptions = ["ADMIN", "READ_ONLY", "CUSTOMER"];

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await AxiosInstance.get("/accounts");
        setAllAccounts(res.data);
      } catch (error) {
        toast.error("Failed to fetch accounts");
      }
    };

    if (values.role === "CUSTOMER") {
      fetchAccounts();
    }
  }, [values.role, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountToggle = (account) => {
    const isAlreadyAssigned = assignedAccounts.find((a) => a.id === account.id);

    if (isAlreadyAssigned) {
      setAssignedAccounts((prev) => prev.filter((a) => a.id !== account.id));
    } else {
      setAssignedAccounts((prev) => [...prev, account]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...values,
        accounts: assignedAccounts.map((acc) => acc.id),
      };

      const res = await AxiosInstance.post("/createuser", payload);

      if (res.data.message) {
        toast.success(res.data.message, {
          position: "top-right",
          theme: "colored",
        });
      }

      setTimeout(() => {
        navigate("/dashboard/usermanagement");
      }, 800);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data, {
          position: "top-right",
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          theme: "colored",
        });
      }
    }
  };
  const handleCancel = () => {
    navigate("/dashboard/usermanagement");
  };

  return (
    <div className={styles.createUser}>
      <ToastContainer />
      <div className={styles.routeNav}>
        <button onClick={handleClick} className={styles.navBtn}>
          Users
        </button>{" "}
        {">"} <span className={styles.headingNav}>Add New User</span>
      </div>

      <h1>Add New User</h1>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
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

        <div className={styles.row}>
          {["username", "password"].map((name) => {
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
                  minLength={field.validation?.minLength}
                  pattern={field.validation?.pattern?.source}
                  title={field.validation?.errorMsg}
                  required
                />
              </div>
            );
          })}
        </div>

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
                  pattern={field.validation?.pattern?.source}
                  title={field.validation?.errorMsg}
                  required
                />
              </div>
            );
          })()}

          <div className={styles.formField}>
            <label htmlFor="role">Select Roles</label>
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
          <div className={styles.accountForm}>
            <div className={styles.accountList}>
              <h4>Choose Account Ids to Associate</h4>
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

            <div className={styles.assignedAccount}>
              <h4>Assigned Account Ids</h4>
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
        )}

        <div className={styles.row}>
          <button type="submit" className={styles.submitBtn}>
            Create User
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

export default CreateUser;
