import { SortType } from "@/constants/formSortedInitialValues";
import { formSortedKeyToApi } from "@/constants/formSortedKeyToApi";

export const getQueryString = (path: string, page?: string, apiProps?: SortType) => {
  const api = Object.entries(apiProps || []).reduce((acc, [key, value]) => {
    if (!Array.isArray(value)) {
      return acc + (value ? `&${formSortedKeyToApi[key]}=${value}` : '');
    } else {
      return acc + (value.length ? `&${formSortedKeyToApi[key]}=${value.join('%2C')}` : '');
    }
  }, '');
  return `/${path}/${api}${page ? `&page=${page}` : ''}`;
}