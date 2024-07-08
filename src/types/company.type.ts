import * as yup from "yup";
import {
  EditCompanySchema,
  createCompanySchema,
} from "../schemas/companySchema";

export interface ICompany {
  id: number;
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  description: string;
  type: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICompanyWithCount {
  companies: ICompany[];
  count: number;
}

export type CreateCompanyType = yup.InferType<typeof createCompanySchema>;
export type EditCompanySchemaType = yup.InferType<typeof EditCompanySchema>;
