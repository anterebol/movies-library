export const setPagination = (totalPages: number, currentPage: number) => {
  let pagination = [1,2,3];
  
  switch (true) {
    case totalPages < 4:
      return pagination.slice(0, totalPages);
    case (totalPages - 2 === currentPage) || (totalPages - 1 === currentPage) || (currentPage === totalPages): 
      pagination[0] = totalPages - 2;
      pagination[1] = totalPages - 1;
      pagination[2] = totalPages;
      break;
    case currentPage % 3 === 0:
      pagination = [currentPage - 2, currentPage - 1, currentPage];
      break;
    case currentPage % 3 === 1:
      pagination = [currentPage, currentPage + 1, currentPage + 2];
      break;
    case currentPage % 3 === 2:
      pagination = [currentPage - 1, currentPage, currentPage + 1];
      break;
  }

  return pagination;
}