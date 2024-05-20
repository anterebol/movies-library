const firstMovieYear = 1874;
export const getSelectYears = () => {
  const years = [];
  const currentYear = new Date();
  for (let year = currentYear.getFullYear(); year >= firstMovieYear; year--) {
    years.push({value: year.toString(), label: year.toString()});
  }
  return years;
}