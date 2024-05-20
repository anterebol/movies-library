export type CounterPropsType = {
  label?: string, 
  placeholder: string, 
  selectKey: any,
  inputProps: any,
  onAddClick: () => void,
  onSubClick: () => void,
  defaultValue: string | number,
}