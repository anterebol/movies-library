export const getStorageItem = (name: string) => {
  const params = global?.window?.localStorage.getItem(name);
  return params && JSON.parse(params);
}
export const setStorageItem = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
}