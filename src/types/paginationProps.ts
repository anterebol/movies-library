import { ReactNode } from "react"

export interface CustomPaginationProps {
  page: number, 
  link: string, 
  position: string
}
export interface PaginationButtonProps {
  className: string, 
  disabled?: boolean, 
  onClick: () => void, 
  paginationItem: string | ReactNode 
}