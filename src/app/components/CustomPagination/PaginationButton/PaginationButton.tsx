export const PaginationButton = (props: {className: string, disabled?: boolean, onClick: () => void, paginationItem: string }) => {
  const {className, disabled, onClick, paginationItem} = props;
  return <button 
    disabled={disabled} 
    className={className} 
    key={Math.random()} 
    onClick={onClick}>
    {paginationItem}
  </button>
}