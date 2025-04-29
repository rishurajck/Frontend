export const FormConfig = [
  {
    id: "username",
    type: "text",
    name: "username",
    placeholder: "Enter Username",
    label: "Username",
    length: 30,
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    validation: {
      minLength: 6,
      pattern: /^(?=.*[A-Z])(?=.*\d).+$/, // one uppercase, one number
      errorMsg:
        "Password must be at least 8 characters, include an uppercase letter and a number",
    },
  },
  {
    id: "firstname",
    type: "text",
    name: "firstname",
    placeholder: "Enter First Name",
    label: "First Name ",
    maxLength: 20,
    minLength: 3,
    validate: (value) => {
      if (value.length > 20) {
        return "First name cannot exceed 20 characters.";
      }
      return ""; // No error
    },
  },
  {
    id: "lastname",
    type: "text",
    name: "lastname",
    placeholder: "Enter Last Name",
    label: "Last Name ",
  },
  {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Enter Email ID",
    label: "Email ID",
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMsg: "Please enter a valid email address",
    },
  },
  {
    id: "role",
    type: "",
    name: "role",
    placeholder: "Select Roles",
    label: "Select Roles",
  },
  {
    id: "arn",
    type: "text",
    name: "arn",
    placeholder: "Enter the IAM Role ARN ",
    label: "Enter the IAM Role ARN *",
  },
  {
    id: "accountId",
    type: "number",
    name: "accountId",
    placeholder: "Enter your Account Id",
    label: "Enter your Account Id *",
  },
  {
    id: "accountName",
    type: "text",
    name: "accountName",
    placeholder: "Enter your Account Name",
    label: "Enter your Account Name",
  },
];
export default FormConfig;
