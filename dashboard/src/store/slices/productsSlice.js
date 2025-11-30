import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from 'react-toastify'
import { toggleCreateProductModal, toggleUpdateProductModal } from "./extraSlice";



export const createNewProduct = createAsyncThunk(
  "create-new-product", async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/product/admin/create`, data)
      toast.success(res.data.message || "Create new product successfully")
      thunkAPI.dispatch(toggleCreateProductModal())
      return res.data.product
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create New product.")
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to create New product.")
    }
  }
)


export const fetchAllProducts = createAsyncThunk(
  "fetch-all-product", async (page, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/product?page=${page || 1}`)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch products.")
    }
  }
)



export const updateProduct = createAsyncThunk(
  "update-product", async ({ data, id }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/product/admin/update/${id}`, data)
      toast.success(res.data.message || "Product updated successfully.")
      thunkAPI.dispatch(toggleUpdateProductModal())

      return res.data.updatedProduct
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update product.")
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to update product.")
    }
  }
)



export const deleteProduct = createAsyncThunk(
  "delete-product", async ( id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/product/admin/delete/${id}`)
      toast.success(res.data.message || "Product delete successfully.")
      return id
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete product.");
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to delete product.")
    }
  }
)




const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    totalProducts: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [action.payload, ...state.products]
      })
      .addCase(createNewProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) => product.id === action.payload.id ? action.payload : product)
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.totalProducts = Math.max(0, state.totalProducts - 1)
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      })
  }
});

export default productSlice.reducer;
