import styles from "./Step3.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step3Config from "./Step3Config";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Step3({ onNext, onBack, onCancel }) {
  const data = useSelector((state) => state.form.values);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type === "code" ? "Policy" : "Data"} copied`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      await axios.post("http://localhost:8080/addAccounts", data, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      toast.success("Account Added", {
        position: "top-right",
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/dashboard/onboarding/accountOnboarding");
      }, 800);
    } catch (error) {
      toast.error("Invalid Data ❌", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h2>Cost and Usage Report Configuration</h2>
      <p>Create a Cost & Usage Report by following these steps</p>
      <div className={styles.formWrapper}>
        <ol className={styles.stepsList}>
          {Step3Config.map((step, index) => (
            <li key={index}>
              {step.label}

              {/* {1} - Link */}
              {step.type === "link" && <>{step.content}</>}

              {/* {2} - Hourly Configuration */}
              {step.type === "hourly-cur" && (
                <>
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
                  <div className={styles.content}>{step.content}</div>
                  <div className={styles.checks}>{step.checkbox}</div>
                  <div>{step.contents}</div>
                  <div className={styles.imageContainer}>
                    <img
                      src={step.img}
                      alt="Hourly Configuration"
                      className={styles.stepImage}
                    />
                  </div>
                </>
              )}

              {/* {3} - Bucket Name Configuration */}
              {step.type === "bucket-name" && (
                <>
                  <div className={styles.content}>{step.heading}</div>
                  <div className={styles.checks}>{step.checkbox}</div>
                  {step.contents}
                  <div className={styles.imageContainer}>
                    <img
                      src={step.img1}
                      alt="Bucket Name"
                      className={styles.stepImage}
                    />
                  </div>
                </>
              )}

              {/* {4} - Delivery Configuration */}
              {step.type === "delivery" && (
                <>
                  <div className={styles.content}>{step.content}</div>
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
                  <div className={styles.content}>{step.text}</div>
                  <div className={styles.contents}>
                    {step.check}
                    {step.radio}
                    {step.para}
                    {step.checkbox}
                  </div>
                  <div className={styles.imageContainer}>
                    <img
                      src={step.img2}
                      alt="Delivery Configuration"
                      className={styles.stepImage}
                    />
                  </div>
                </>
              )}

              {/* {5} - Final Step */}
              {step.type === "paragraph" && (
                <>
                  <div>{step.content}</div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
        <div className={styles.navigationBtn}>
          <button className={styles.next} onClick={onBack}>
            Back -Add Customer Managed Policies
          </button>
          <button className={styles.next} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
