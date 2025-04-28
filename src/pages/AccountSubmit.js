import React from "react";
import style from "./AccountSubmit.module.css";
import success from "../assets/green_tick_check.svg";
function AccountSubmit() {
  return (
    <div className={style.accountSubmit}>
      <div className={style.submitContent}>
        <img className={style.successImg} src={success} alt="success" />
        <h4>Thank You For CUR Access!</h4>
        <p>
          If you have additional accounts to onboard, please click{" "}
          <a href="/dashboard/onboarding"> Onboard</a> to proceed.
        </p>
      </div>
    </div>
  );
}

export default AccountSubmit;
