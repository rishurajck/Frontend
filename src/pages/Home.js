// // import React, { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { Outlet, useNavigate } from "react-router-dom";
// // import { logoutUser } from "../redux/actions/authActions";
// // import Sidebar from "../component/sidebar/Sidebar";
// // import Footer from "../component/footer/Footer";
// // import styles from "./Home.module.css";
// // import logo from "../assets/cloudlogo.png";
// // import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import AxiosInstance from "../config/AxiosInstance";
// // import { toast, ToastContainer } from "react-toastify";
// // import Button from "../component/button/Button.js";
// // function Home() {
// //   const { user } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [customers, setCustomers] = useState([]);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   useEffect(() => {
// //     if (!user) navigate("/");
// //   }, [user, navigate]);

// //   const logout = async () => {
// //     try {
// //       toast.success("Logging Out! Please Wait", {
// //         position: "top-right",
// //         theme: "colored",
// //         autoClose: 800,
// //       });
// //       await AxiosInstance.post("/api/logout");

// //       setTimeout(() => {
// //         dispatch(logoutUser());
// //         navigate("/");
// //       }, 1200);
// //     } catch (error) {
// //       toast.error(
// //         { error },
// //         {
// //           position: "top-right",
// //           theme: "colored",
// //           autoClose: 800,
// //         }
// //       );
// //     }
// //   };
// //   const handleDisplay = async () => {
// //     try {
// //       const res = await AxiosInstance.get("admin/customers");
// //       setCustomers(res.data);
// //       setShowDropdown(true);
// //     } catch (err) {
// //       console.error("Error fetching customers", err);
// //     }
// //   };

// //   return (
// //     <div className={styles.homeLayout}>
// //       <nav>
// //         <ToastContainer />
// //         <ul className={styles.navBar}>
// //           <li>
// //             <img className={styles.logo} src={logo} alt="CloudBalance" />
// //           </li>

// //           <div className={styles.greeting}>
// //           <div className={styles.switchWrapper}>
// //             {user?.role === "ADMIN" && (
// //               <div>
// //                 <Button
// //                   text="Switch User"
// //                   className={styles.SwitchBtn}
// //                   onClick={handleDisplay}
// //                 />

// //                 {showDropdown && (
// //                   <div className={styles.dropdown}>
// //                     <h4>Select a customer</h4>
// //                     <ul>
// //                       {customers.map((cust) => (
// //                         <li key={cust.id}>
// //                           <label>
// //                             <input
// //                               type="radio"
// //                               name="customer"
// //                               value={cust.username}
// //                               onChange={() => setSelectedUser(cust)}
// //                             />
// //                             {cust.firstname} ({cust.username})
// //                           </label>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             <li className={styles.greet}>
// //               <FontAwesomeIcon
// //                 icon={faCircleUser}
// //                 className={styles.greetIcon}
// //               />
// //               Welcome! {user?.firstname}
// //               <p className={styles.roleWrapper}>
// //                 <strong>Role: </strong>
// //                 {user?.role}
// //               </p>
// //             </li>

// //             <li>
// //               <button className={styles.logoutBtn} onClick={logout}>
// //                 LogOut
// //               </button>
// //             </li>
// //           </div>
// //         </ul>
// //       </nav>
// //       <div className={styles.hello}>
// //         <Sidebar />
// //         <div className={styles.mainContent}>
// //           <Outlet />
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default Home;
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Outlet, useNavigate } from "react-router-dom";
// import {
//   logoutUser,
//   setAdminToken,
//   setUser,
// } from "../redux/actions/authActions";
// import Sidebar from "../component/sidebar/Sidebar";
// import Footer from "../component/footer/Footer";
// import styles from "./Home.module.css";
// import logo from "../assets/cloudlogo.png";
// import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AxiosInstance from "../config/AxiosInstance";
// import { toast, ToastContainer } from "react-toastify";
// import Button from "../component/button/Button.js";

// function Home() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     if (!user) navigate("/");
//     if (user) {
//       navigate("/dashboard");
//     }
//   }, [user]);
//   console.log("at home");
//   const logout = async () => {
//     try {
//       toast.success("Logging Out! Please Wait", {
//         position: "top-right",
//         theme: "colored",
//         autoClose: 800,
//       });
//       await AxiosInstance.post("/api/logout");

//       setTimeout(() => {
//         dispatch(logoutUser());
//         navigate("/");
//       }, 1200);
//     } catch (error) {
//       toast.error("Logout failed", {
//         position: "top-right",
//         theme: "colored",
//         autoClose: 800,
//       });
//     }
//   };
//   const handleRevertToAdmin = () => {
//     const adminToken = localStorage.getItem("adminToken");

//     if (adminToken) {
//       // Parse the admin user from stored userData if needed
//       const adminUser = { ...user, token: adminToken, role: "ADMIN" };

//       dispatch(setAdminToken(adminToken));
//       dispatch(setUser(adminUser));

//       toast.success("Switched back to Admin");

//       // Optionally clear adminToken to prevent further reverting
//       // localStorage.removeItem("adminToken");
//     } else {
//       toast.error("No admin token found");
//     }
//   };

//   useEffect(() => {});
//   const handleSwitchUser = async (username) => {
//     try {
//       const selected = customers.find((cust) => cust.username === username);
//       const res = await AxiosInstance.post("switch-user", {
//         username: selected.username,
//         role: selected.role,
//       });

//       const data = res.data.data;

//       // Save admin token once
//       const existingToken = localStorage.getItem("userData");
//       if (existingToken) {
//         // Parse the stringified userData to a JavaScript object
//         const userData = JSON.parse(existingToken);

//         // Access the token from the object
//         const token = userData.token;

//         // Log the token
//         console.log(token);
//         if (!localStorage.getItem("adminToken")) {
//           dispatch(setAdminToken(token));
//         }
//       }

//       dispatch(setUser(data));

//       toast.success(`Switched to ${data.username}`);
//       setShowDropdown(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Switch failed");
//     }
//   };

//   const handleDisplay = async () => {
//     try {
//       const res = await AxiosInstance.get("admin/customers");
//       setCustomers(res.data);
//       setShowDropdown(!showDropdown);
//     } catch (err) {
//       console.error("Error fetching customers", err);
//     }
//   };

//   return (
//     <div className={styles.homeLayout}>
//       <nav>
//         <ToastContainer />
//         <ul className={styles.navBar}>
//           <li>
//             <img className={styles.logo} src={logo} alt="CloudBalance" />
//           </li>

//           <div className={styles.greeting}>
//             {user?.role === "ADMIN" && (
//               <div className={styles.switchWrapper}>
//                 <Button
//                   text="Switch User"
//                   className={styles.SwitchBtn}
//                   onClick={handleDisplay}
//                 />
//                 {showDropdown && (
//                   <div className={styles.dropdown}>
//                     <h4>Select a customer</h4>
//                     <ul>
//                       {customers.map((cust) => (
//                         <li key={cust.id}>
//                           <label>
//                             <input
//                               type="radio"
//                               name="customer"
//                               value={cust.username}
//                               onChange={() => handleSwitchUser(cust.username)}
//                             />
//                             {cust.username}
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}

//             {user?.role === "CUSTOMER" &&
//               localStorage.getItem("adminToken") && (
//                 <Button
//                   text="Revert to Admin"
//                   className={styles.SwitchBtn}
//                   onClick={handleRevertToAdmin}
//                 />
//               )}

//             <div className={styles.greet}>
//               <FontAwesomeIcon
//                 icon={faCircleUser}
//                 className={styles.greetIcon}
//               />
//               Welcome! {user?.firstname}
//               <p className={styles.roleWrapper}>
//                 <strong>Role: </strong>
//                 {user?.role}
//               </p>
//             </div>

//             <div>
//               <button className={styles.logoutBtn} onClick={logout}>
//                 LogOut
//               </button>
//             </div>
//           </div>
//         </ul>
//       </nav>

//       <div className={styles.hello}>
//         <Sidebar />
//         <div className={styles.mainContent}>
//           <Outlet />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  logoutUser,
  setUser,
  setAdminUser,
} from "../redux/actions/authActions";
import Sidebar from "../component/sidebar/Sidebar";
import Footer from "../component/footer/Footer";
import styles from "./Home.module.css";
import logo from "../assets/cloudlogo.png";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosInstance from "../config/AxiosInstance";
import { toast, ToastContainer } from "react-toastify";
import Button from "../component/button/Button.js";

function Home() {
  const { user, adminUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
    else navigate("/dashboard");
  }, [user]);

  const logout = async () => {
    try {
      toast.success("Logging Out! Please Wait", {
        position: "top-right",
        theme: "colored",
        autoClose: 800,
      });
      await AxiosInstance.post("/api/logout");

      setTimeout(() => {
        dispatch(logoutUser());
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error("Logout failed", {
        position: "top-right",
        theme: "colored",
        autoClose: 800,
      });
    }
  };

  const handleSwitchUser = async (username) => {
    try {
      const selected = customers.find((cust) => cust.username === username);
      const res = await AxiosInstance.post("switch-user", {
        username: selected.username,
        role: selected.role,
      });

      const data = res.data.data;

      const existingUserData = JSON.parse(localStorage.getItem("userData"));
      if (existingUserData && !adminUser) {
        dispatch(setAdminUser(existingUserData)); // ✅ Save full admin user
      }

      dispatch(setUser(data));
      toast.success(`Switched to ${data.username}`);
      setShowDropdown(false);
    } catch (err) {
      console.error(err);
      toast.error("Switch failed");
    }
  };

  const handleRevertToAdmin = () => {
    if (adminUser) {
      dispatch(setUser(adminUser));
      toast.success("Reverted to Admin");
    } else {
      toast.error("No admin user found in memory");
    }
  };

  const handleDisplay = async () => {
    try {
      const res = await AxiosInstance.get("admin/customers");
      setCustomers(res.data);
      setShowDropdown(!showDropdown);
    } catch (err) {
      console.error("Error fetching customers", err);
    }
  };

  return (
    <div className={styles.homeLayout}>
      <nav>
        <ToastContainer />
        <ul className={styles.navBar}>
          <li>
            <img className={styles.logo} src={logo} alt="CloudBalance" />
          </li>

          <div className={styles.greeting}>
            {user?.role === "ADMIN" && (
              <div className={styles.switchWrapper}>
                <Button
                  text="Switch User"
                  className={styles.SwitchBtn}
                  onClick={handleDisplay}
                />
                {showDropdown && (
                  <div className={styles.dropdown}>
                    <h4>Select a customer</h4>
                    <ul>
                      {customers.map((cust) => (
                        <li key={cust.id}>
                          <label>
                            <input
                              type="radio"
                              name="customer"
                              value={cust.username}
                              onChange={() => handleSwitchUser(cust.username)}
                            />
                            {cust.username}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {user?.role === "CUSTOMER" && adminUser && (
              <Button
                text="Switch to Admin"
                className={styles.SwitchBtn}
                onClick={handleRevertToAdmin}
              />
            )}

            <div className={styles.greet}>
              <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.greetIcon}
              />
              Welcome! {user?.firstname}
              <p className={styles.roleWrapper}>
                <strong>Role: </strong>
                {user?.role}
              </p>
            </div>

            <div>
              <button className={styles.logoutBtn} onClick={logout}>
                LogOut
              </button>
            </div>
          </div>
        </ul>
      </nav>

      <div className={styles.hello}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
