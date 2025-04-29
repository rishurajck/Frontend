import React from "react";
import { ClipLoader } from "react-spinners"; // You can change spinner type
import styles from "./FullScreenLoader.module.css";

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null; // Don't show anything if not loading

  return (
    <div className={styles.loaderOverlay}>
      <ClipLoader color="#36d7b7" size={80} />
    </div>
  );
};

export default FullScreenLoader;
