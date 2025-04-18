import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
import Sidebar from "../component/sidebar/Sidebar";
import Footer from "../component/footer/Footer";
import styles from "./Home.module.css";
import logo from "../assets/Cloudkeeper_New.svg";
import axios from "axios";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const logout = async () => {
    try {
      console.log(user?.token);
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.homeLayout}>
      <nav>
        <ul className={styles.navBar}>
          <li>
            <img className={styles.logo} src={logo} alt="CloudBalance" />
          </li>
          <div className={styles.greeting}>
            <li className={styles.greet}>
              {" "}
              <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.greetIcon}
              />
              Welcome! {user?.username}{" "}
            </li>
            <li>
              <button className={styles.logoutBtn} onClick={logout}>
                LogOut
              </button>
            </li>
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
