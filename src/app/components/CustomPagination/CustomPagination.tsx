import { openPrevPage, openNextPage, setCurrentPage } from '@/store/appReducer';
import { Flex } from '@mantine/core';
import classes from './customPagination.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PaginationButton } from './PaginationButton/PaginationButton';
import { setPagination } from '@/utils/setPagination';
import leftArrow from '@/assets/pagination/left.svg';
import rightArrow from '@/assets/pagination/right.svg';
import { getPageLink } from '@/utils/getPageLink';

export const CustomPagination = (props: {page: number, link: string, position: string}) => {
  const { link, page, position } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { totalPages, isNextPage, isPrevPage, currentPage } = useAppSelector((state) => state);
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = (page < totalPages && page <= 499) ? page + 1 : totalPages - 2;
  const prevSlicePage = page > 4 ? page - 3 : 1;
  const nextSlicePage = nextPage;

  const paginationButtonClasses = (pageNumber: number) => ([
    classes.pagination__button, 
    pageNumber === page && 
    classes.pagination__button__active].join(' ')
  )
  
  useEffect(() => {
    if ((isNextPage && page > currentPage + 2) || (isPrevPage && page < currentPage)) {
      dispatch(setCurrentPage(page))
    } 
  }, []);

  const pagination = useMemo(() => setPagination(totalPages, currentPage), 
    [totalPages, isNextPage, isPrevPage, page])

  return (
    <Flex gap={8} className={classes.pagination} style={{alignSelf: position}}>
      {totalPages > 1 && <>
        <PaginationButton
            key={Math.random()}
            className={classes.pagination__button}
            onClick={() => {
              router.push(getPageLink(link, prevPage));
              pagination[0] === page && dispatch(openPrevPage(prevSlicePage));
            }}
            paginationItem={
              <Image 
                height={16}
                width={16}
                alt='left_arow' 
                src={leftArrow} 
              />
            }
            disabled={page < 2}      
        />
        {pagination.map((pageNumber) => 
          <PaginationButton
            key={Math.random() + pageNumber}
            className={paginationButtonClasses(pageNumber)}
            onClick={() => {
              router.push(getPageLink(link, pageNumber));
            } }
            paginationItem={String(pageNumber)}     
          />
        )}
        <PaginationButton
          key={Math.random()}
          className={classes.pagination__button}
          onClick={() => {
            router.push(getPageLink(link, nextPage));
            pagination[2] === page &&  dispatch(openNextPage(nextSlicePage));
          }}
          paginationItem={
            <Image 
              height={16}
              width={16}
              alt='right_arow' 
              src={rightArrow} 
            />
          }
          disabled={page > 499 || page === totalPages}      
        />
      </>}
      </Flex>
  )
}