// // import React from "react";
// // import styles from "./Button.module.css";
// // function Button({ text, type }) {
// //   return (
// //     <div className={styles.btn}>
// //       <button className={styles.loginBtn} type={type}>
// //         {text}
// //       </button>
// //     </div>
// //   );
// // }

// // export default Button;
// import React from "react";
// import styles from "./Button.module.css";

// function Button({ text, type, className }) {
//   return (
//     <div className={styles.btn}>
//       <button className={`${styles.loginBtn} ${className}`} type={type}>
//         {text}
//       </button>
//     </div>
//   );
// }

// export default Button;
import React from "react";
import styles from "./Button.module.css";

function Button({ text, type = "button", className, onClick }) {
  return (
    <div className={styles.btn}>
      <button
        className={`${styles.loginBtn} ${className}`}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
