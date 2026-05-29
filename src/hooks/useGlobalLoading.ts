import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { authApi } from '../services/authApi';
import { userApi } from '../services/userApi';
import { transactionApi } from '../services/transactionApi';
import { categoryApi } from '../services/categoryApi';
import { budgetApi } from '../services/budgetApi';

const API_REDUCER_PATHS = [
  authApi.reducerPath,
  userApi.reducerPath,
  transactionApi.reducerPath,
  categoryApi.reducerPath,
  budgetApi.reducerPath,
];

export const useGlobalLoading = (): boolean => {
  return useSelector((state: RootState) =>
    API_REDUCER_PATHS.some((path) => {
      const apiState = (state as any)[path];
      if (!apiState) return false;

      const hasLoadingQuery = Object.values(apiState.queries ?? {}).some(
        (query: any) => query?.status === 'pending'
      );

      const hasLoadingMutation = Object.values(apiState.mutations ?? {}).some(
        (mutation: any) => mutation?.status === 'pending'
      );

      return hasLoadingQuery || hasLoadingMutation;
    })
  );
};