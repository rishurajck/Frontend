import React, { useState, useEffect } from "react";
import styles from "./CostExplorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "../../config/AxiosInstance"; // Axios instance for API call
import { useSelector } from "react-redux";
import FusionChart from "./FusionChart";
import FusionLineChart from "./FusionLineChart";
import * as XLSX from "xlsx";
import FullScreenLoader from "../../config/FullScreenLoader.js";
import { toast, ToastContainer } from "react-toastify";
import Button from "../button/Button.js";

function CostExplorer() {
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Service");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [startDate, setStartDate] = useState("April 2025");
  const [endDate, setEndDate] = useState("May 2025");
  const [tableData, setTableData] = useState(null); // Store table data
  const [groupFilters, setGroupFilters] = useState([]);
  const [filtersGroups, setFiltersGroups] = useState([]); // To store the API response for selected filters
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedGroupFilters, setSelectedGroupFilters] = useState([]);
  const [loading, setLoading] = useState(false);

  const maxVisible = 7;
  const { user } = useSelector((state) => state.auth);

  const data = async () => {
    // Utility function to format date "Month Year" -> "YYYY-MM"
    const formatDate = (dateString) => {
      const dateObj = new Date(dateString); // Parse the string into a date object
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get month in MM format
      return `${year}-${month}`; // Return formatted string "YYYY-MM"
    };

    // Formatting both startDate and endDate
    const startMonth = formatDate(startDate);
    const endMonth = formatDate(endDate);

    const requestBody = {
      startMonth, // Use the formatted start month
      endMonth, // Use the formatted end month
      filters: {
        LINKEDACCOUNTID: [selectedAccount],
        ...selectedFilters,
      },
    };

    try {
      // Fetch data
      const response = await AxiosInstance.post(
        `/snowflake/download?groupBy=${selectedGroup}`, // Add groupBy as query parameter
        requestBody
      );
      // Check if the response contains the expected data
      if (response.status === 200) {
        const excelData = response.data;

        // Convert the data into an array of objects (for use with xlsx)
        // Adjust the following line if the data format differs (ensure it's in a suitable structure for XLSX)
        const formattedData = excelData.map((item) => ({
          "Usage Month": item.USAGE_MONTH,
          "Services ": item.PRODUCT_PRODUCTNAME,
          "Total Usage Cost": item.TOTAL_USAGE_COST,
        }));

        // Create a worksheet from the data
        const ws = XLSX.utils.json_to_sheet(formattedData);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Write the workbook and trigger download
        XLSX.writeFile(wb, "data.xlsx");
      }
    } catch (error) {
      toast.error("Download Failed", {
        position: "top-right",
        theme: "colored",
      });
    }
  };
  // Handle checkbox selection/deselection and update the selectedFilters state
  const handleCheckboxChange = (event, group) => {
    const { value, checked } = event.target;

    setSelectedFilters((prevState) => {
      const updatedGroupFilters = prevState[group] ? [...prevState[group]] : [];
      if (checked) {
        updatedGroupFilters.push(value); // Add the selected filter value
      } else {
        // Remove the deselected filter value
        const updatedFilters = updatedGroupFilters.filter(
          (item) => item !== value
        );
        return { ...prevState, [group]: updatedFilters }; // Update selected filters
      }
      return { ...prevState, [group]: updatedGroupFilters }; // Update selected filters
    });
  };

  // Fetch filters for a specific group when a checkbox is checked
  const fetchFiltersForGroup = async (groupName) => {
    try {
      const response = await AxiosInstance.get(
        `/snowflake/columnDetails?columnName=${groupName}`
      );
      setFiltersGroups(response.data); // Set the filters for this group
    } catch (error) {
      console.error("Error fetching filter details:", error);
    }
  };

  // Function to clear all selected filters
  const clearFilters = () => {
    console.log(selectedFilters);

    setSelectedFilters({});
    setSelectedGroupFilters([]);
  };
  console.log(groupFilters);

  // Fetch available groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await AxiosInstance.get("/snowflake/column");
        const displayNames = response.data.map((group) => group.displayName);
        setGroupOptions(displayNames);
        setGroupFilters(displayNames);
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
        toast.error("Failed to fetch Accounts", {
          position: "top-right",
          theme: "colored",
        });
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
    setLoading(true);
    try {
      const formatDate = (dateString) => {
        const dateObj = new Date(dateString); // Parse the string into a date object
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get month in MM format
        return `${year}-${month}`; // Return formatted string "YYYY-MM"
      };

      // Formatting both startDate and endDate
      const startMonth = formatDate(startDate);
      const endMonth = formatDate(endDate);

      const requestBody = {
        startMonth, // Use the formatted start month
        endMonth, // Use the formatted end month
        filters: {
          LINKEDACCOUNTID: [selectedAccount],
          ...selectedFilters,
        },
      };

      // Fetch table data using POST request
      const response = await AxiosInstance.post(
        `/snowflake/dynamic-query?groupBy=${selectedGroup}`, // Add groupBy as query parameter
        requestBody
      );

      // Handle the response, assuming the response contains the table data
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGroup && selectedAccount && startDate && endDate) {
      fetchTableData(); // Call the API when all parameters are selected
    }
  }, [selectedGroup, selectedAccount, startDate, endDate, selectedFilters]); // Trigger on any dependency change

  const otherGroups = groupOptions.filter((g) => g !== selectedGroup);
  const visibleGroups = otherGroups.slice(0, maxVisible - 1);
  const moreGroups = otherGroups.slice(maxVisible - 1);

  // Dynamically generate table headers based on the keys of the first item in tableData
  const tableHeaders =
    tableData && tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const handleGroupFilterChange = (group) => {
    setSelectedGroupFilters((prevSelected) => {
      if (prevSelected.includes(group)) {
        // Uncheck (remove from array)
        return prevSelected.filter((g) => g !== group);
      } else {
        // Check (add to array)
        fetchFiltersForGroup(group); // Also load the filters
        return [...prevSelected, group];
      }
    });
  };

  return (
    <div className={styles.costExplorer}>
      <ToastContainer />
      <FullScreenLoader loading={loading} />
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
          <Button
            key={label}
            text={label}
            className={styles.groupBtn}
            onClick={() => handleGroupSelect(label)}
          />
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
        <div></div>
      </div>

      {/* Date Select */}
      <div className={styles.dateFilter}>
        <label className={styles.labels}>Start Date:</label>
        <select
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        >
          <option>Jan 2025</option>
          <option>Feb 2025</option>
          <option>March 2025</option>
          <option>April 2025</option>
          <option>May 2025</option>
          <option>June 2025</option>
          <option>July 2025</option>
        </select>
        <label className={styles.labels}>End Date:</label>
        <select value={endDate} onChange={(e) => setEndDate(e.target.value)}>
          <option>Jan 2025</option>
          <option>Feb 2025</option>
          <option>March 2025</option>
          <option>April 2025</option>
          <option>May 2025</option>
          <option>June 2025</option>
          <option>July 2025</option>
        </select>
      </div>

      {/* Chart Data  and filter part */}
      <div className={styles.data}>
        <div className={styles.chartWrapper}>
          {tableData && tableData.length > 0 ? (
            <FusionChart tableData={tableData} />
          ) : (
            <div>No Data Found</div>
          )}
        </div>

        {/* <FilterButton /> */}
        <div className={styles.filterButtonContainer}>
          <h3 className={styles.header}>Filters</h3>
          <div className={styles.groupFilters}>
            <h3>Select Groups</h3>
            <ul>
              {groupFilters.map((group, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={group}
                    checked={selectedGroupFilters.includes(group)}
                    onChange={() => handleGroupFilterChange(group)}
                  />
                  {group}
                </li>
              ))}
            </ul>
          </div>
          {/* Render Filters Groups Data dynamically */}
          {filtersGroups.length > 0 && (
            <div className={styles.filtersGroupsBox}>
              <h4>Filters Groups Data:</h4>
              <div className={styles.filtersGroupsList}>
                {filtersGroups.map((group, index) => {
                  // Dynamically render the value for each group based on the object keys
                  const groupValue = Object.values(group)[0]; // Get the first value of the object
                  const groupName = Object.keys(group)[0]; // Get the key of the object

                  return (
                    <div key={index} className={styles.filterGroupItem}>
                      <input
                        type="checkbox"
                        value={groupValue} // Use the dynamic value from filtersGroups
                        checked={
                          selectedFilters[groupName] &&
                          selectedFilters[groupName].includes(groupValue)
                        } // Check if the value is selected for the group
                        onChange={(e) => handleCheckboxChange(e, groupName)} // Handle selection for each product
                      />
                      <span>{groupValue}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Clear Filters Button */}

          <Button
            text="Clear Filters"
            className={styles.downloadButton}
            type="button"
            onClick={clearFilters}
          />
        </div>
      </div>
      {/* {Line Chart Displayed here} */}
      <div className={styles.chartWrapper}>
        {tableData && tableData.length > 0 ? (
          <FusionLineChart tableData={tableData} chartType="msline" />
        ) : (
          <div>No Data Found!</div>
        )}
      </div>

      <div className={styles.costExplorer}>
        {/* Table Section */}
        <div className={styles.heading}>
          We are showing Top5 records by Cost.
        </div>
        <div className={styles.downloadWrapper}>
          <Button
            text="Download Excel"
            className={styles.downloadButton}
            type="button"
            onClick={data}
          />
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
