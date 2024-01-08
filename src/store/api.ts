import axios from 'axios';
import { ApiError } from '.';

export const instanceAxios = axios.create({
  baseURL: 'https://envelope-app.ru/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

export const makeApiRequest = async (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?
) => {
  try {
    const response = await instanceAxios[method](url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as ApiError;
      const errorMessage = errorData.message || 'Произошла ошибка во время запроса';
      throw new Error(errorMessage);
    }
    throw new Error('Произошла непредвиденная ошибка');
  }
};

export const handlePending = (state) => {
  state.loading = true;
};

export const handleFulfilled = (state, action) => {
  state.loading = false;

  if (action.type === 'categories/getCategories/fulfilled') {
    state.categories = action.payload;
  }

  if (action.type === 'products/getProducts/fulfilled') {
    state.products = action.payload;
  }

  if (action.type === 'products/getUnits/fulfilled') {
    state.units = action.payload;
  }

  if (action.type === 'products/uploadPhoto/fulfilled') {
    state.image = action.payload;
  }

  if (action.type === 'mail/uploadPhotoForMail/fulfilled') {
    state.photo_url = action.payload;
  }

  if (action.type === 'report/getTotalSales/fulfilled') {
    state.totalSales = action.payload;
  }

  if (action.type === 'report/getCustomers/fulfilled') {
    state.customers = action.payload;
  }

  if (action.type === 'report/getTotalSalesForCategory/fulfilled') {
    state.totalSalesForCategory = action.payload;
  }

  if (action.type === 'report/getTotalSalesForProduct/fulfilled') {
    state.totalSalesForProduct = action.payload;
  }

  if (action.type === 'store/getStores/fulfilled') {
    state.stores = action.payload;
  }

  if (action.type === 'store/getOneStore/fulfilled') {
    state.store = action.payload;
  }

  if (action.type === 'store/uploadWelcomeImage/fulfilled') {
    state.image_welcome = action.payload;
  }
};

export const handleRejected = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

export const isPendingAction = (action) => action.type.endsWith('/pending');
export const isFulfilledAction = (action) => action.type.endsWith('/fulfilled');
export const isRejectedAction = (action) => action.type.endsWith('/rejected');
