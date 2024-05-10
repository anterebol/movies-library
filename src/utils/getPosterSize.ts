export const getPosterSize = (posterSizes: Array<string>, currentPosterSize: number) => {
  return posterSizes.find((posterSize) => {
    const lastSize = Number(posterSize.slice(1));
    for (let size = currentPosterSize; size <= lastSize; size++) {
      if (`w${size}` === posterSize) {
        return posterSize;
      }
    }
  }) || 'original';
}