import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateCompanyType,
  ICompany,
  ICompanyWithCount,
} from "../../../types/company.type";
import axios from "../../../helpers/axios";
import { AxiosError, AxiosResponse } from "axios";
import { RootState } from "../../store/store";

export interface ICompanyState {
  companies: ICompanyWithCount;
  company: ICompany | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ICompanyState = {
  companies: { companies: [], count: 0 },
  company: null,
  isLoading: false,
  error: null,
};

export const createCompany: AsyncThunk<
  ICompany | undefined,
  CreateCompanyType,
  Record<string, never>
> = createAsyncThunk(
  "companies/createCompany",
  async (formData, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<ICompany> = await axios.post(
        "company/create",
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

export const getCompanies: AsyncThunk<
  ICompanyWithCount | undefined,
  string,
  Record<string, never>
> = createAsyncThunk(
  "companies/getCompanies",
  async (query, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<ICompanyWithCount> = await axios.get(
        `/company/all?${query}`,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const getMyCompanies: AsyncThunk<
  ICompany[] | undefined,
  void,
  { state: RootState }
> = createAsyncThunk(
  "companies/getMyCompanies",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;

    try {
      const { data }: AxiosResponse<ICompany[]> = await axios.get(
        `/company/my/${userId}`,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const getCompanyById: AsyncThunk<
  ICompany | undefined,
  string,
  Record<string, never>
> = createAsyncThunk(
  "companies/getCompanyById",
  async (id, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<ICompany> = await axios.get(
        `/company/${id}`,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const deleteCompany: AsyncThunk<
  undefined,
  number,
  Record<string, never>
> = createAsyncThunk("comanies/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/company/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export const updateCompany: AsyncThunk<
  ICompany | undefined,
  {
    id: number;
    formData: CreateCompanyType;
  },
  Record<string, never>
> = createAsyncThunk(
  "companies/updateCompany",
  async ({ formData, id }, { rejectWithValue }) => {
    console.log(formData);
    try {
      const { data }: AxiosResponse<ICompany> = await axios.put(
        `/company/edit/${id}`,
        formData,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.companies?.companies.push(action.payload);
        }
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companies = {
          ...state.companies,
          companies: action.payload?.companies || [],
          count: action.payload?.count || 0,
        };
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompanyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload || null;
      })

      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companies.companies.filter(
          (company) => company.id !== action.payload,
        );
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload || null;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default companiesSlice.reducer;

export const selectCompanies = (state: RootState) => state.company.companies;
export const selectError = (state: RootState) => state.company.error;
export const selectIsLoading = (state: RootState) => state.company.isLoading;
