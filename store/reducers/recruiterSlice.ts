import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

// Define your data types
interface RecruiterState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RecruiterState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching data
export const fetchRecruiters = createAsyncThunk(
  'recruiters/fetchRecruiters',
  async () => {
    const response = await api.get('/api/recruiters');
    return response.data;
  }
);

export const newRecruiter = createAsyncThunk(
  'recruiters/newRecruiter',
  async (recruiter: any) => {
    const response = await api.post('/api/recruiters/new', recruiter);
    return response.data;
  }
);
export const pinRecruiter = createAsyncThunk(
  'recruiters/pinRecruiter',
  async (recruiter: any) => {

    const response = await api.post('/api/recruiters/pin', recruiter);
    return response.data;
  }
)
export const unPinRecruiter = createAsyncThunk(
  'recruiters/unPinRecruiter',
  async (recruiter: any) => {
    const response = await api.post('/api/recruiters/unPin', recruiter);
    return response.data;
  }
)

export const upRankRecruiter = createAsyncThunk(
  'recruiters/upRankRecruiter',
  async (recruiter: any) => {
    const response = await api.post('/api/recruiters/upRank', recruiter);
    return response.data;
  }
)

export const downRankRecruiter = createAsyncThunk(
  'recruiters/downRankRecruiter',
  async (recruiter: any) => {
    const response = await api.post('/api/recruiters/downRank', recruiter);
    return response.data;
  }
)
const recruiterSlice = createSlice({
  name: 'recruiters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecruiters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.error = null;
      })
      .addCase(fetchRecruiters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(newRecruiter.pending, (state) => {
        state.loading = true;
      })
      .addCase(newRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(newRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(pinRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRecruiters = action.payload.data; // Assuming the server returns the updated recruiters
        state.items = state.items.map(item =>
          updatedRecruiters.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortRecruiters(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(pinRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(unPinRecruiter.pending, (state) => {
        state.loading = true;
      })
      .addCase(unPinRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRecruiters = action.payload.data; // Assuming the server returns the updated recruiters
        state.items = state.items.map(item =>
          updatedRecruiters.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortRecruiters(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(unPinRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(upRankRecruiter.pending, (state) => {
        state.loading = true;
      })
      .addCase(upRankRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRecruiters = action.payload.data; // Assuming the server returns the updated recruiters
        state.items = state.items.map(item =>
          updatedRecruiters.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortRecruiters(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(upRankRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(downRankRecruiter.pending, (state) => {
        state.loading = true;
      })
      .addCase(downRankRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRecruiters = action.payload.data; // Assuming the server returns the updated recruiters
        state.items = state.items.map(item =>
          updatedRecruiters.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortRecruiters(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(downRankRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
const sortRecruiters = (recruiters: any[]) => {
  return recruiters.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return b.isFeatured - a.isFeatured; // Featured recruiters first
    }
    if (a.isFeatured) {
      return a.featureRank - b.featureRank; // Sort featured recruiters by featureRank
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort remaining recruiters by createdAt
  });
};
export default recruiterSlice.reducer;