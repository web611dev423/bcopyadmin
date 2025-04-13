import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/axios';

// Define your data types
interface JobState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching data
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    const response = await api.get('/jobs');
    return response.data;
  }
);

export const newjob = createAsyncThunk(
  'jobs/newjob',
  async (job: any) => {
    const response = await api.post('/jobs/new', job);
    return response.data;
  }
);

export const fetchStatus = createAsyncThunk(
  'jobs/fetchStatus',
  async (job: any) => {
    const response = await api.post('/jobs/status', job);
    return response.data;
  }
);
export const acceptJob = createAsyncThunk(
  'jobs/acceptJob',
  async (job: any) => {
    const response = await api.post('/jobs/accept', job);
    return response.data;
  }
);
export const rejectJob = createAsyncThunk(
  'jobs/rejectJob',
  async (job: any) => {
    const response = await api.post('/jobs/reject', job);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(newjob.pending, (state) => {
        state.loading = true;
      })
      .addCase(newjob.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(newjob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        const newStatus = action.payload.data;
        console.log("newStatus", newStatus);
        const index = state.items.findIndex(item => item._id === newStatus._id);
        if (index !== -1) {
          state.items[index] = newStatus;
        }
        state.error = null;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(acceptJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(acceptJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(rejectJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(rejectJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});



export default jobSlice.reducer;