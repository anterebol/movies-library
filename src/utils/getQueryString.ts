import { formSortedKeyToApi } from "@/constants/formSortedKeyToApi";
import { KeyAsString } from "@/types/KeyAsString";

export const getQueryString = (path: string, page?: string, apiProps?: KeyAsString) => {
  const api = Object.entries(apiProps || []).reduce((acc, [key, value]) => {
    return acc + (value ? `&${formSortedKeyToApi[key]}=${value}` : '');
  }, '');
  return `/${path}/${api}${page ? `&page=${page}` : ''}`;
}