const errorLessThanZero = `Rating can't be less than zero`;
const errorMoreThanTen = `Rating can't be more than ten`;
const oneRatingMoreThanOther = `Rating "from" can't be more than "to"`

export const isLessThanZero = (value: number) => value < 0; 
export const isMoreThanTen = (value: number) => value > 10 && `Rating can't be more than ten`; 
export const getRatingFromError = (ratingFrom: number, ratingTo: number) => {
  if (isLessThanZero(ratingFrom)) {
    return errorLessThanZero;
  } else if (isMoreThanTen(ratingFrom)) {
    return errorMoreThanTen;
  }
  else if (ratingTo && ratingFrom > ratingTo) {
    return oneRatingMoreThanOther;
  }
  return null;
}
export const getRatingToError = (ratingTo: number, ratingFrom: number) => {
  if (isLessThanZero(ratingTo)) {
    return errorLessThanZero;
  } else if (isMoreThanTen(ratingTo)) {
    return errorMoreThanTen;
  }
  else if (ratingFrom && ratingTo < ratingFrom) {
    return oneRatingMoreThanOther;
  }
  return null;
}