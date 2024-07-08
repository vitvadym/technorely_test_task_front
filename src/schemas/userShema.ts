import * as yup from "yup";

const userRegisterShema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  position: yup.string().required(),
  description: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?(\d{1,4}|\d{1,4}[-.\s]?)?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      {
        message: "Invalid phone number",
      },
    )
    .required(),
  nickName: yup.string().min(3).required(),
});

const userLoginShema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export { userRegisterShema, userLoginShema };
