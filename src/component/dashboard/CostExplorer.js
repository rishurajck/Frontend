import React, { useState, useEffect } from "react";
import styles from "./CostExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "../../config/AxiosInstance"; // Axios instance for API call
import { useSelector } from "react-redux";
import FusionChart from "./FusionChart";

function CostExplorer() {
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Service");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [startDate, setStartDate] = useState("Oct 2024");
  const [endDate, setEndDate] = useState("Mar 2025");
  const [tableData, setTableData] = useState(null); // Store table data

  const maxVisible = 7;
  const { user } = useSelector((state) => state.auth);

  // Fetch available groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await AxiosInstance.get("/snowflake/column");
        const displayNames = response.data.map((group) => group.displayName);
        setGroupOptions(displayNames);
      } catch (error) {
        console.error("Error fetching group options:", error);
      }
    };
    fetchGroups();
  }, []);

  // Fetch accounts based on user role
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const role = user?.role;
        if (role === "CUSTOMER") {
          const customerResponse = await AxiosInstance.get(
            `/account/${user?.username}`
          );
          setAccounts(customerResponse.data);
          if (customerResponse.data.length > 0) {
            setSelectedAccount(customerResponse.data[0].accountId);
          }
        } else {
          const response = await AxiosInstance.get("/accounts");
          setAccounts(response.data);
          if (response.data.length > 0) {
            setSelectedAccount(response.data[0].accountId);
          }
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, [user?.role, user?.username]);

  // Handle group selection
  const handleGroupSelect = (label) => {
    setSelectedGroup(label);
  };

  // Fetch table data based on selected filters
  const fetchTableData = async () => {
    try {
      const requestBody = {
        startMonth: `${startDate.split(" ")[1]}-${startDate.split(" ")[0]}`, // Format "YYYY-MM"
        endMonth: `${endDate.split(" ")[1]}-${endDate.split(" ")[0]}`, // Format "YYYY-MM"
        filters: {
          LINKEDACCOUNTID: [selectedAccount],
        },
      };
      console.log(requestBody);

      // Fetch table data using POST request
      const response = await AxiosInstance.post(
        `/snowflake/dynamic-query?groupBy=${selectedGroup}`, // Add groupBy as query parameter
        requestBody
      );

      // Handle the response, assuming the response contains the table data
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  console.log(tableData);
  useEffect(() => {
    if (selectedGroup && selectedAccount && startDate && endDate) {
      fetchTableData(); // Call the API when all parameters are selected
    }
  }, [selectedGroup, selectedAccount, startDate, endDate]); // Trigger on any dependency change

  const otherGroups = groupOptions.filter((g) => g !== selectedGroup);
  const visibleGroups = otherGroups.slice(0, maxVisible - 1);
  const moreGroups = otherGroups.slice(maxVisible - 1);

  // Dynamically generate table headers based on the keys of the first item in tableData
  const tableHeaders =
    tableData && tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className={styles.costExplorer}>
      <div className={styles.navLinks}>
        <FontAwesomeIcon icon={faHouseUser} className={styles.homeIcon} />
        {">"}
        <p className={styles.para}>Cost Explorer</p>
      </div>
      <h2>Cost Explorer</h2>
      <p>How to always be aware of cost changes and history.</p>

      {/* Account Select Dropdown */}
      <div className={styles.selectWrapper}>
        <label htmlFor="account-select">Select Account:</label>
        <select
          id="account-select"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">-- Choose an account --</option>
          {accounts.map((account) => (
            <option key={account.accountId} value={account.accountId}>
              {account.accountName} ({account.accountId})
            </option>
          ))}
        </select>
      </div>

      {/* Group Select Dropdown */}
      <div className={styles.groupBySection}>
        <p className={styles.groupLabel}>Group By:</p>
        <span className={styles.selectedLabel}>{selectedGroup}</span>

        {visibleGroups.map((label) => (
          <button
            key={label}
            className={styles.groupBtn}
            onClick={() => handleGroupSelect(label)}
          >
            {label}
          </button>
        ))}

        {moreGroups.length > 0 && (
          <div className={styles.dropdownWrapper}>
            <select
              className={styles.groupDropdown}
              onChange={(e) => handleGroupSelect(e.target.value)}
              value=""
            >
              <option value="" disabled>
                More
              </option>
              {moreGroups.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Date Select */}
      <div className={styles.dateFilter}>
        <label className={styles.labels}>Start Date:</label>
        <select
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        >
          <option>04 2025</option>
        </select>

        <label className={styles.labels}>End Date:</label>
        <select value={endDate} onChange={(e) => setEndDate(e.target.value)}>
          <option>05 2025</option>
        </select>
      </div>

      {/* Table Data */}
      <div className={styles.chartWrapper}>
        {tableData && <FusionChart tableData={tableData} />}
      </div>

      <div className={styles.costExplorer}>
        {/* Table Section */}
        <div className={styles.heading}>
          We are showing Top5 records by Cost.
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.map((item, index) => (
                <tr key={index}>
                  {tableHeaders.map((header, headerIndex) => (
                    <td key={headerIndex}>{item[header]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CostExplorer;
