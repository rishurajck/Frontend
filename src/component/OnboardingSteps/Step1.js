import React from "react";
import styles from "./Step1.module.css";
import FormConfig from "../../config/Formconfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import onboardingSteps from "./Step1Config.js";
import { useSelector, useDispatch } from "react-redux";
import { setFormValues } from "../../redux/actions/formAction.js";

function Step1({ onNext }) {
  const values = useSelector((state) => state.form.values);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormValues({ ...values, [name]: value }));
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type === "code" ? "Policy" : "Data"} copied `, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (err) {
      toast.error("Failed to copy", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h2>Create an IAM Role</h2>
      <p className={styles.description}>
        Create an IAM Role by following these steps
      </p>
      <div className={styles.formWrapper}>
        <ol className={styles.stepsList}>
          {onboardingSteps.map((step, index) => (
            <li key={index}>
              {step.label}

              {step.type === "link" && <>{step.content}</>}

              {step.type === "code" && (
                <div className={styles.codeBlock}>
                  <pre>{step.content}</pre>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className={styles.copyIcon}
                    onClick={() => handleCopy(step.content, "code")}
                    title="Copy to clipboard"
                  />
                </div>
              )}

              {step.type === "text" && <div>{step.content}</div>}

              {step.type === "readonly" && (
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    readOnly
                    value={step.value}
                    className={styles.readOnlyInput}
                  />
                  <FontAwesomeIcon
                    icon={faCopy}
                    className={styles.copyIcon}
                    onClick={() => handleCopy(step.value, "role")}
                    title="Copy Role Name"
                  />
                </div>
              )}

              {step.type === "image" && (
                <>
                  <div className={styles.arnImage}>
                    <img src={step.imageSrc} alt="Role ARN Screenshot" />
                  </div>
                </>
              )}
            </li>
          ))}
          <li>
            Paste the copied Role ARN below -
            <ul className={styles.accountDetails}>
              {FormConfig.slice(-3).map((field) => (
                <li key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    className={styles.inputField}
                    placeholder={field.placeholder}
                    value={values?.[field.name] || ""}
                    onChange={handleChange}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancel}>Cancel</button>
        <button className={styles.next} onClick={onNext}>
          Next - Add Customer Managed Policies
        </button>
      </div>
    </div>
  );
}

export default Step1;
