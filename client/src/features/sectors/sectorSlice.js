import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../myServer";

const initialState = {
  sectors: [],
  loading: true,
  error: null,
};

//get sectors
export const getSectors = createAsyncThunk(
  "sectors/getSectors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/sectors/get-sectors`);
    //   console.log(response);
      return response.data.sectors;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sectorSlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSectors.fulfilled, (state, action) => {
        state.loading = false;
        state.sectors = action.payload;
      })
      .addCase(getSectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sectorSlice.reducer;
export const selectAllSectors = (state) => state.sectors.sectors;
export const selectError = (state) => state.sectors.error;
export const selectLoading = (state) => state.sectors.loading;
