
import { openPrevPage, openNextPage, setCurrentPage } from '@/store/appReducer';
import { Flex } from '@mantine/core';
import classes from './customPagination.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PaginationButton } from './PaginationButton/PaginationButton';
import { setPagination } from '@/utils/setPagination';

export const CustomPagination = (props: {page: number, link:string}) => {
  const { link, page } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { totalPages, isNextPage, isPrevPage, currentPage } = useAppSelector((state) => state);
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = (page < totalPages && page <= 499) ? page + 1 : totalPages - 2;
  const prevSlicePage = page > 4 ? page - 3 : 1;
  const nextSlicePage = nextPage;
  
  useEffect(() => {
    if ((isNextPage && page > currentPage + 2) || (isPrevPage && page < currentPage)) {
      dispatch(setCurrentPage(page))
    } 
  }, []);

  const pagination = useMemo(() => setPagination(totalPages, currentPage), [totalPages, isNextPage, isPrevPage, page])

  return (
    <Flex gap={8} className={classes.pagination}>
      {totalPages > 1 && <>
        <PaginationButton
            key={Math.random()}
            className={classes.pagination__button}
            onClick={() => {
              router.push(`/${link}?page=${prevPage}`);
              pagination[0] === page && dispatch(openPrevPage(prevSlicePage));
            }}
            paginationItem={'prev'}
            disabled={page < 2}      
        />
        {pagination.map((pageNumber) => 
          <PaginationButton
            key={Math.random() + pageNumber}
            className={[classes.pagination__button, pageNumber === page && classes.pagination__button__active].join(' ')}
            onClick={() => {
              router.push(`/${link}?page=${pageNumber}`);
            } }
            paginationItem={String(pageNumber)}     
          />
        )}
        <PaginationButton
          key={Math.random()}
          className={classes.pagination__button}
          onClick={() => {
            router.push(`/${link}?page=${nextPage}`);
            pagination[2] === page &&  dispatch(openNextPage(nextSlicePage));
          }}
          paginationItem={'next'}
          disabled={page > 499 || page === totalPages}      
        />
      </>}
      </Flex>
  )
}