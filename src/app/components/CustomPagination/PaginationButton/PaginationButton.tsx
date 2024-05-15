import { PaginationButtonProps } from "@/types/paginationProps";

export const PaginationButton = (props: PaginationButtonProps) => {
  const {className, disabled, onClick, paginationItem} = props;
  return <button 
    disabled={disabled} 
    className={className} 
    key={Math.random()} 
    onClick={onClick}>
    {paginationItem}
  </button>
}