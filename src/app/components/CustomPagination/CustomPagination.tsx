import { Flex } from '@mantine/core';
import classes from './customPagination.module.scss';
import { useAppSelector } from '@/hooks/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaginationButton } from './PaginationButton/PaginationButton';
import { setPagination } from '@/utils/setPagination';
import { LeftArrow } from '@/assets/pagination/left';
import { getPageLink } from '@/utils/getPageLink';
import { CustomPaginationProps } from '@/types/paginationProps';
import { RightArrow } from '@/assets/pagination/right';

export const CustomPagination = (props: CustomPaginationProps) => {
  const { link, page, position } = props;
  const router = useRouter();
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const { totalPages } = useAppSelector((state) => state);

  useEffect(() => {
    setLeftHover(false);
    setRightHover(false)
  }, [totalPages, page])

  const leftButton = useCallback(() => LeftArrow(leftHover), [leftHover])
  const rightButton = useCallback(() => RightArrow(rightHover), [rightHover])
  
  const prevPage = page - 1;
  const nextPage =  page + 1;

  const paginationButtonClasses = (pageNumber: number) => ([
    classes.pagination__button, 
    pageNumber === page && 
    classes.pagination__button__active].join(' ')
  )
  
  const pagination = useMemo(() => setPagination(totalPages, page), 
    [totalPages, page]);

  const setPage = (pageNumber: number) => router.push(getPageLink(link, pageNumber));

  return (
    <Flex gap={8} className={classes.pagination} style={{alignSelf: position}}>
      {totalPages > 1 && 
        <>
          <PaginationButton
            key={Math.random()}
            className={classes.pagination__button}
            onHover={setLeftHover}
            onClick={() => setPage(prevPage)}
            paginationItem={leftButton()}
            disabled={page < 2}      
          />
          {pagination.map((pageNumber) => 
            <PaginationButton
              key={Math.random() + pageNumber}
              className={paginationButtonClasses(pageNumber)}
              onClick={() => setPage(pageNumber)}
              paginationItem={String(pageNumber)}     
            />
          )}
          <PaginationButton
            key={Math.random()}
            className={classes.pagination__button}
            onHover={setRightHover}
            onClick={() => setPage(nextPage)}
            paginationItem={rightButton()}
            disabled={page > 499 || page === totalPages}      
          />
        </>
      }
      </Flex>
  )
}