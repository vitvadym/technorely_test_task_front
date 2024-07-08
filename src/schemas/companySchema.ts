import * as yup from "yup";

const createCompanySchema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  address: yup.string().min(3).required(),
  type: yup.string().required(),
  numberOfEmployees: yup
    .number()
    .typeError("must greater than 0")
    .positive()
    .required(),
  serviceOfActivity: yup.string().required(),
});

const EditCompanySchema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  address: yup.string().min(3).required(),
  type: yup.string().required(),
  numberOfEmployees: yup.number().positive().required(),
  serviceOfActivity: yup.string().required(),
});

export { createCompanySchema, EditCompanySchema };
