export const setPagination = (totalPages: number, currentPage: number) => {
  let firstPaginationNumber = 1;
  let nextPaginationNumber = 2;
  let lastPaginationNumber = 3;
  
  switch (true) {
    case totalPages === 1:
      return [firstPaginationNumber];
    case (totalPages === 2):
      return [firstPaginationNumber, nextPaginationNumber];
    case (totalPages - 2 === currentPage) || (totalPages - 1 === currentPage) || (currentPage === totalPages): 
      firstPaginationNumber = totalPages - 2;
      nextPaginationNumber = totalPages - 1;
      lastPaginationNumber = totalPages;
      break;
    default:
      firstPaginationNumber = currentPage;
      nextPaginationNumber = currentPage + 1;
      lastPaginationNumber = currentPage + 2;
      break;
  }

  return [firstPaginationNumber, nextPaginationNumber, lastPaginationNumber];
}