import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  occupation: yup.string().required("Occupation is required"),
});


export const createPasswordSchema =  yup.object({
  password: yup.string().required('Password is required'),
  confirm_password: yup.string().required()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const loginSchema =  yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup.string().required('Password is required'),
});