import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../frontend/src/lib/axios";
import { toast } from 'react-toastify'

// export const register = createAsyncThunk(
//   "auth/register", async (data, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post("/auth/register", data)
//       toast.success(res.data.message)
//       thunkAPI.dispatch(toggleAuthPopup())
//       return res.data.user
//     } catch (error) {
//       toast.error(error.response.data.message)
//       return thunkAPI.rejectWithValue(error.response.data.message)
//     }
//   }
// )


export const login = createAsyncThunk(
  "auth/login", async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", data)

      if (res.data.user.role === "Admin") {
        toast.success(res.data.message)
        return res.data.user
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const getUser = createAsyncThunk(
  "auth/me", async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/me")
      return res.data.user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to get user.")
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout", async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/logout")
      thunkAPI.dispatch(resetAuthSlice())
      return null
    } catch (error) {
      toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to logout user.")
    }
  }
)

export const forgetPassword = createAsyncThunk(
  "auth/forget/password", async (email, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/auth/password/forgot?frontendUrl=${import.meta.env.VITE_DASHBOARD_URL}`, email)
      toast.success(res.data.message)
      return null
    } catch (error) {
      toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "auth/reset/password", async ({ resetToken, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/password/reset/${resetToken}`, data)
      toast.success(res.data.message)
      console.log("line-82");
      
      return res.data.user
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong. try again")
      return thunkAPI.rejectWithValue(error.response.data.message || "Something went wrong. try again")
    }
  }
)

export const updateAdminPassword = createAsyncThunk(
  "auth/update/password", async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/password/update`, data)
      toast.success(res.data.message)
      return null
    } catch (error) {
      toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const updateAdminProfile = createAsyncThunk(
  "auth/me/update", async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/profile/update`, data)
      toast.success(res.data.message)
      return res.data.user
    } catch (error) {
      toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
  },
  extraReducers: (builder) => {

    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.loading = false
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateAdminPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateAdminPassword.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
      })
      .addCase(updateAdminProfile.rejected, (state) => {
        state.loading = false
      })
  },
  reducers: {
    resetAuthSlice(state) {
      state.loading = false
      state.user = null
      state.isAuthenticated = false
    }
  },
});


export const { resetAuthSlice } = authSlice.actions;

export default authSlice.reducer;
