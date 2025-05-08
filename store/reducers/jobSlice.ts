import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { create } from 'domain';
import { exportPages } from 'next/dist/export/worker';

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
    const response = await api.get('/api/jobs');
    return response.data;
  }
);

export const newjob = createAsyncThunk(
  'jobs/newjob',
  async (job: any) => {
    const response = await api.post('/api/jobs/new', job);
    return response.data;
  }
);

export const fetchStatus = createAsyncThunk(
  'jobs/fetchStatus',
  async (job: any) => {
    const response = await api.post('/api/jobs/status', job);
    return response.data;
  }
);
export const acceptJob = createAsyncThunk(
  'jobs/acceptJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/accept', job);
    return response.data;
  }
);
export const rejectJob = createAsyncThunk(
  'jobs/rejectJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/reject', job);
    return response.data;
  }
);
export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/delete', job);
    return response.data;
  }
);

export const pinJob = createAsyncThunk(
  'jobs/pinJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/pin', job);
    return response.data;
  }
)
export const unPinJob = createAsyncThunk(
  'jobs/unPinJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/unPin', job);
    return response.data;
  }
)

export const upRankJob = createAsyncThunk(
  'jobs/upRankJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/upRank', job);
    return response.data;
  }
)

export const downRankJob = createAsyncThunk(
  'jobs/downRankJob',
  async (job: any) => {
    const response = await api.post('/api/jobs/downRank', job);
    return response.data;
  }
)

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
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      }).addCase(pinJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(pinJob.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJobs = action.payload.data; // Assuming the server returns the updated jobs
        state.items = state.items.map(item =>
          updatedJobs.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortJobs(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(pinJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(unPinJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(unPinJob.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJobs = action.payload.data; // Assuming the server returns the updated jobs
        state.items = state.items.map(item =>
          updatedJobs.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortJobs(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(unPinJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(upRankJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(upRankJob.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJobs = action.payload.data; // Assuming the server returns the updated jobs
        state.items = state.items.map(item =>
          updatedJobs.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortJobs(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(upRankJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(downRankJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(downRankJob.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJobs = action.payload.data; // Assuming the server returns the updated jobs
        state.items = state.items.map(item =>
          updatedJobs.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortJobs(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(downRankJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      ;
  },
});

const sortJobs = (jobs: any[]) => {
  return jobs.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return b.isFeatured - a.isFeatured; // Featured jobs first
    }
    if (a.isFeatured) {
      return a.featureRank - b.featureRank; // Sort featured jobs by featureRank
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort remaining jobs by createdAt
  });
};

export default jobSlice.reducer;