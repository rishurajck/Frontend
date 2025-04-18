import styles from "./Step2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step2Config from "./Step2Config";

function Step2({ onNext, onBack }) {
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

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h2>Add Customer Managed Policies</h2>
      <p className={styles.description}>
        Create an Inline policy for the role by following these steps
      </p>
      <div className={styles.formWrapper}>
        <ol className={styles.stepsList}>
          {Step2Config.map((step, index) => (
            <li key={index}>
              {step.label}
              {/* {1} */}
              {step.type === "link" && <>{step.content}</>}
              {/* {2} */}
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
              {/* {3} */}
              {step.type === "costAudit" && (
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
              {/* {4} */}
              {step.type === "link-1" && <>{step.content}</>}

              {/* {5} */}

              {step.type === "json-1" && (
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
              {/* {6} */}
              {step.type === "secAudit" && (
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
              {/* {7} */}
              {step.type === "link-2" && <>{step.content}</>}
              {/* {8} */}
              {step.type === "json-2" && (
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
              {/* {9} */}
              {step.type === "tunerRead" && (
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
              {/* {10} */}
              {step.type === "tuner-role" && (
                <div className={styles.imageContainer}>
                  <img
                    src={step.img1}
                    alt="Tuner Role"
                    className={styles.stepImage}
                  />
                </div>
              )}

              {step.type === "addPermisions" && (
                <div className={styles.imageContainer}>
                  <img
                    src={step.img2}
                    alt="Add Permissions"
                    className={styles.stepImage}
                  />
                </div>
              )}

              {step.type === "filter" && (
                <div className={styles.imageContainer}>
                  <img
                    src={step.img3}
                    alt="Filter"
                    className={styles.stepImage}
                  />
                </div>
              )}

              {step.type === "inline-policy" && (
                <div className={styles.imageContainer}>
                  <img
                    src={step.img4}
                    alt="Inline Policy"
                    className={styles.stepImage}
                  />
                </div>
              )}

              {step.type === "json-3" && (
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

              {step.type === "review"}
              {step.type === "crossAccount" && (
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
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={onBack}>
          Cancel
        </button>
        <div className={styles.navigationBtn}>
          <button className={styles.next} onClick={onBack}>
            Back - Create an IAM Role{" "}
          </button>
          <button className={styles.next} onClick={onNext}>
            Next - Cost and Usage Report Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
