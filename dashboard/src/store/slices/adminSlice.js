import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from 'react-toastify'



export const fetchAllUsers = createAsyncThunk(
  "get-All-User", async (page, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/admin/getallusers?page=${page || 1}`)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)


export const deleteUser = createAsyncThunk(
  "admin-delete-User",
  async ({ id, page }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete/${id}`);
      toast.success(res.data.message);

      return id;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);



export const getDashboardStats = createAsyncThunk(
  "get-Dashboard-stats", async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/admin/fetch/dashboard-stats`)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)


export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    totalUsers: 0,
    users: [],
    totalRevenueAllTime: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    totalUsersCount: 0,
    monthlySales: [],
    orderStatusCounts: {},
    topSellingProducts: [],
    lowStockProducts: 0,
    revenueGrowth: "",
    newUsersThisMonth: 0,
    currentMonthSales: 0,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.totalUsers = Math.max(0, state.totalUsers - 1)
        state.totalUsersCount = Math.max(0, state.totalUsersCount - 1)
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenueAllTime = action.payload.totalRevenueAllTime;
        state.todayRevenue = action.payload.todayRevenue;
        state.yesterdayRevenue = action.payload.yesterdayRevenue;
        state.totalUsersCount = action.payload.totalUsersCount;
        state.monthlySales = action.payload.monthlySales;
        state.orderStatusCounts = action.payload.orderStatusCounts;
        state.topSellingProducts = action.payload.topSellingProducts;
        state.lowStockProducts = action.payload.lowStockProducts?.length;
        state.revenueGrowth = action.payload.revenueGrowth;
        state.newUsersThisMonth = action.payload.newUsersThisMonth;
        state.currentMonthSales = action.payload.currentMonthSales;
      })
      .addCase(getDashboardStats.rejected, (state) => {
        state.loading = false;
      })

  }
});

export default adminSlice.reducer;
