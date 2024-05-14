export const setStringDate = (date?: string) => {
  if (date) {
    const currentDate = new Date(date || '');
    const currentDateString = `${currentDate.getMonth()} ${currentDate.getDate()}, ${currentDate.getFullYear()}` 
    return currentDateString;
  }
  return '-/-';
}