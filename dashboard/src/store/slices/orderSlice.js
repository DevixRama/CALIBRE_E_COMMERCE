import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from 'react-toastify'



export const fetchAllOrders = createAsyncThunk(
  "fetch-all-orders", async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/order/admin/getall`)
      return res.data.orders
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch orders")
    }
  }
)


export const updateOrderStatus = createAsyncThunk(
  "update-order-status", async ({ orderId, status }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`order/admin/update/${orderId}`, { status })
      toast.success(res.data.message || "Order status updated successfully")
      return res.data.updatedOrder
    } catch (error) {
      toast.error(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch orders")
    }
  }
)


export const deleteOrder = createAsyncThunk(
  "delete-order", async (orderId, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`order/admin/delete/${orderId}`)
      toast.success(res.data.message || "Order deleted successfully")
      return orderId
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete orders")
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete orders")
    }
  }
)



const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = {...state.orders[index], ...action.payload}
        }
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
      })

  },
});

export default orderSlice.reducer;
