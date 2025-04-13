import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobReducer from './jobSlice';
import contributorReducer from './contributorSlice';
import recruiterReducer from './recruiterSlice';
import contributionReducer from './contributionSlice';
import programReducer from './programSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  programs: programReducer,
  contributors: contributorReducer,
  recruiters: recruiterReducer,
  contributions: contributionReducer,
});

export default rootReducer;