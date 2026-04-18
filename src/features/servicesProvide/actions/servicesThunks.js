import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createServiceAPI,
  deleteServiceAPI,
  getServiceByIdAPI,
  getServicesByFilterAPI,
  updateServiceAPI,
} from '../api/servicesAPI';

// Fetch all services (by filter)
export const fetchServices = createAsyncThunk(
  'service/fetchServices',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getServicesByFilterAPI(filters);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch services'
      );
    }
  }
);

// Fetch single service by ID
export const fetchServiceById = createAsyncThunk(
  'service/fetchById',
  async (serviceDetailId, { rejectWithValue }) => {
    try {
      const data = await getServiceByIdAPI(serviceDetailId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch service'
      );
    }
  }
);

// Create new service
export const createService = createAsyncThunk(
  'service/create',
  async (serviceData, { rejectWithValue }) => {
    try {
      const data = await createServiceAPI(serviceData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create service'
      );
    }
  }
);

// Update service
export const updateService = createAsyncThunk(
  'service/update',
  async ({ serviceDetailId, updateData }, { rejectWithValue }) => {
    try {
      const data = await updateServiceAPI({ serviceDetailId, updateData });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update service'
      );
    }
  }
);

// Delete service
export const deleteService = createAsyncThunk(
  'service/delete',
  async ({ serviceDetailId, indexes }, { rejectWithValue }) => {
    try {
      const data = await deleteServiceAPI({ serviceDetailId, indexes });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete service'
      );
    }
  }
);
