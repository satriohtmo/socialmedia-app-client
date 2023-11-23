import * as yup from "yup";

export const regisValidation = yup.object().shape({
  profilepicture: yup.mixed().required("Profile picture is required"),
  username: yup.string().required("Username is required").min(3, "Min 3 character"),
  name: yup.string().required("Name is required").min(3, "Min 3 character"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});

export const loginValidation = yup.object().shape({
  email: yup.string().required().email("Invalid email format"),
  password: yup.string().required(),
});
