export const setRunTime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = (runtime - hours * 60).toString().padStart(2, '0');
  return `${hours}h ${minutes}m`
}