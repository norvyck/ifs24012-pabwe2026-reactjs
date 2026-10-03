import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/lostFoundApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const fetchLostFounds = createAsyncThunk('lostFounds/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await api.getLostFounds(params);
    return response.data.lost_founds;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchLostFoundDetail = createAsyncThunk('lostFounds/fetchDetail', async (id, { rejectWithValue }) => {
  try {
    const response = await api.getLostFoundDetail(id);
    return response.data.lost_found;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const isLostFoundAdd = createAsyncThunk('lostFounds/add', async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.addLostFound(data);
    showSuccessDialog('Laporan berhasil ditambahkan!');
    dispatch(fetchLostFounds());
    return response.data;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const isLostFoundChange = createAsyncThunk('lostFounds/change', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.updateLostFound(id, data);
    showSuccessDialog('Laporan berhasil diperbarui!');
    dispatch(fetchLostFoundDetail(id));
    return response.data;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const isLostFoundChangeCover = createAsyncThunk('lostFounds/changeCover', async ({ id, file }, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.updateLostFoundCover(id, file);
    if (!response.status && response.message) throw new Error(response.message);
    showSuccessDialog('Cover berhasil diperbarui!');
    dispatch(fetchLostFoundDetail(id));
    return response.data;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const isLostFoundDelete = createAsyncThunk('lostFounds/delete', async (id, { rejectWithValue }) => {
  try {
    await api.deleteLostFound(id);
    showSuccessDialog('Laporan berhasil dihapus!');
    return id;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

const lostFoundSlice = createSlice({
  name: 'lostFounds',
  initialState: {
    items: [],
    item: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLostFounds.pending, (state) => { state.loading = true; })
      .addCase(fetchLostFounds.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchLostFounds.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(fetchLostFoundDetail.pending, (state) => { state.loading = true; state.item = null; })
      .addCase(fetchLostFoundDetail.fulfilled, (state, action) => { state.loading = false; state.item = action.payload; })
      .addCase(fetchLostFoundDetail.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default lostFoundSlice.reducer;
