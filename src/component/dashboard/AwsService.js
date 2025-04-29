import React, { useState, useEffect } from "react";
import styles from "./AwsService.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import AxiosInstance from "../../config/AxiosInstance";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

function AwsService() {
  const awsServices = ["EC2", "RDS", "ASG"];
  const [selected, setSelected] = useState("EC2");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [awsDetails, setAwsDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // <-- NEW

  const { user } = useSelector((state) => state.auth);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);

    toast.success("Data Copied", {
      position: "top-right",
      theme: "colored",
      autoClose: 1000,
    });
  };

  // Fetch AWS Accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      const role = user?.role;
      try {
        if (role === "CUSTOMER") {
          const customerResponse = await AxiosInstance.get(
            `/account/${user?.username}`
          );
          setAccounts(customerResponse.data[0].accountId);
        } else {
          const response = await AxiosInstance.get("/accounts");
          console.log(response);

          setAccounts(response.data);
          setSelectedAccount(response.data[18].accountId);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [user?.role, user?.username]);

  // Fetch AWS Details for Selected Account
  useEffect(() => {
    const fetchAwsDetails = async () => {
      if (!selectedAccount) return;
      setLoading(true);
      try {
        const response = await AxiosInstance.get(
          `/${selected}/${selectedAccount}`
        );
        setAwsDetails(response.data);
      } catch (error) {
        console.error("Error fetching AWS details:", error);
        setAwsDetails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAwsDetails();
  }, [selectedAccount, user?.token, selected]);

  const handleChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  // 🔥 Filtered AWS Details based on search
  const filteredAwsDetails = awsDetails.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.awsService}>
      {/* Navigation */}
      <ToastContainer />
      <div className={styles.homeNav}>
        <div className={styles.navLinks}>
          <FontAwesomeIcon icon={faHouseUser} className={styles.homeIcon} />
          {">"}
          <p className={styles.para}>AWS Services</p>
        </div>
        {/* Account Select Dropdown */}
        <div className={styles.selectWrapper}>
          <label htmlFor="account-select">Select Account:</label>
          <select
            id="account-select"
            value={selectedAccount}
            onChange={handleChange}
          >
            <option value="">-- Choose an account --</option>
            {accounts.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountName} ({account.accountId})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Switching Tabs */}
      <div className={styles.tabContainer}>
        <h3>Scheduler</h3>
        <div>
          {awsServices.map((service) => (
            <button
              key={service}
              onClick={() => setSelected(service)}
              className={`${styles.tabButton} ${
                selected === service ? styles.active : ""
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search AWS Details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* AWS Details Table */}
      <div className={styles.awsTableWrapper}>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <ClipLoader color="#3498db" loading={loading} size={60} />
          </div>
        ) : filteredAwsDetails.length > 0 ? (
          <table className={styles.awsTable}>
            <thead>
              <tr>
                {Object.keys(filteredAwsDetails[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAwsDetails.map((item, index) => (
                <tr key={index}>
                  {Object.entries(item).map(([key, value], i) => (
                    <td key={i}>
                      {key.toLowerCase() === "resourceid" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>{String(value)}</span>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className={styles.copyIcon}
                            onClick={() => handleCopy(value)}
                            title="Copy Resource ID"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      ) : (
                        String(value)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No AWS details to display.</p>
        )}
      </div>
    </div>
  );
}

export default AwsService;
