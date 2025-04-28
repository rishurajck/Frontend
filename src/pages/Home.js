import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
import Sidebar from "../component/sidebar/Sidebar";
import Footer from "../component/footer/Footer";
import styles from "./Home.module.css";
import logo from "../assets/cloudlogo.png";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosInstance from "../config/AxiosInstance";
import { toast, ToastContainer } from "react-toastify";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

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
      toast.error(
        { error },
        {
          position: "top-right",
          theme: "colored",
          autoClose: 800,
        }
      );
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
            <li className={styles.greet}>
              <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.greetIcon}
              />
              Welcome! {user?.firstname}
              <p className={styles.roleWrapper}>
                <strong>Role: </strong>
                {user?.role}
              </p>
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
