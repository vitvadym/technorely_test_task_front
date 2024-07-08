import * as yup from "yup";
import { userLoginShema, userRegisterShema } from "../schemas/userShema";

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;
  phoneNumber: string;
  description: string;
  position: string;
  isAdmin: boolean;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserWithCount {
  users: IUser[];
  count: number;
}

export type UserRegisterType = yup.InferType<typeof userRegisterShema>;
export type UserLoginType = yup.InferType<typeof userLoginShema>;
