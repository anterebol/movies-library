import { PaginationButtonProps } from "@/types/paginationProps";

export const PaginationButton = (props: PaginationButtonProps) => {
  const {className, disabled, onClick, paginationItem} = props;
  const onHover = props.onHover || function() {}

  return (
    <button 
      disabled={disabled} 
      className={className} 
      key={Math.random()} 
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {paginationItem}
    </button>
  )
}