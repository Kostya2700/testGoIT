import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../helpers/baseURL";

axios.defaults.baseURL = baseURL;
export const fetchUser = createAsyncThunk(
  "users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
