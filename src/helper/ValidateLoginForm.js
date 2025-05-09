import { toast } from "react-toastify";
import { FormConfig } from "../config/Formconfig"; // Import your FormConfig

export const ValidateLoginForm = (formData) => {
  for (const field of FormConfig.slice(0, 2)) {
    // only username and password
    const value = formData[field.name] || "";

    if (!value.trim()) {
      toast.error(`${field.label} is required`, {
        position: "top-right",
        theme: "colored",
      });
      return false;
    }

    if (
      field.validation?.minLength &&
      value.length < field.validation.minLength
    ) {
      toast.error(field.validation.errorMsg, {
        position: "top-right",
        theme: "colored",
      });
      return false;
    }

    if (field.validation?.pattern && !field.validation.pattern.test(value)) {
      toast.error(field.validation.errorMsg, {
        position: "top-right",
        theme: "colored",
      });
      return false;
    }
  }

  return true; // ✅ Everything is valid
};
