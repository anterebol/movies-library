export interface CustomSelectProps {
  selectKey?: string,
  inputProps: any,
  data: Array<SelectType>,
  placeholder: string,
  label: string,
  defaultValue?: string,
}
type SelectType = {value: string, label: string};