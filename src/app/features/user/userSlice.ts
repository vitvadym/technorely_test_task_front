import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserWithCount } from "../../../types/user.type";
import { UserRegisterType, UserLoginType } from "../../../types/user.type";
import { AxiosError, AxiosResponse } from "axios";
import axios from "../../../helpers/axios";
import { RootState } from "../../store/store";

export interface IUserState {
  user: IUser | null;
  allUsers: IUserWithCount | null;
  isLoading: boolean;
  isAuth: boolean;
  isAdmin: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  allUsers: null,
  isLoading: false,
  isAuth: false,
  isAdmin: false,
  error: null,
};

export const registerUser: AsyncThunk<
  IUser | undefined,
  UserRegisterType,
  Record<string, never>
> = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IUser> = await axios.post(
        "/auth/signup",
        formData,
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const loginUser: AsyncThunk<
  IUser | undefined,
  UserLoginType,
  Record<string, never>
> = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IUser> = await axios.post(
        "/auth/signin",
        formData,
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const getAllUsers: AsyncThunk<
  IUserWithCount | undefined,
  void,
  Record<string, never>
> = createAsyncThunk("user/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const { data }: AxiosResponse<IUserWithCount> =
      await axios.get("/user/all");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export const getUserById: AsyncThunk<
  IUser | undefined,
  string,
  Record<string, never>
> = createAsyncThunk("/user/getUserById", async (id, { rejectWithValue }) => {
  try {
    const { data }: AxiosResponse<IUser> = await axios.get(`/user/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export const deleteUser: AsyncThunk<
  undefined,
  number,
  Record<string, never>
> = createAsyncThunk("/user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/user/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export const updateUser: AsyncThunk<
  IUser | undefined,
  {
    id: number;
    formData: UserRegisterType;
  },
  Record<string, never>
> = createAsyncThunk(
  "user/updateUser",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<IUser> = await axios.put(
        `/user/edit/${id}`,
        formData,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload || null;
        state.isAuth = action.payload?.token ? true : false;
        state.isAdmin = action.payload?.isAdmin || false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload || null;
        state.isAuth = action.payload?.token ? true : false;
        state.isAdmin = action.payload?.isAdmin || false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload || null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload || null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload || null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
export const { clearError, logout } = userSlice.actions;

export const selectError = (state: RootState) => state.user.error;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectIsAdmin = (state: RootState) => state.user.isAdmin;
export const selectUser = (state: RootState) => state.user.user;
export const selectAllUsers = (state: RootState) => state.user.allUsers;
