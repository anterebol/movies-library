export interface CustomSelectProps {
  data: Array<SelectType>,
  placeholder: string,
  label: string,
  defaultValue?: string,
  onChange: (val: string) => void,
}
export interface MultipleSelectProps {
  data: Array<SelectType>,
  placeholder: string,
  label: string,
  defaultValue: Array<string>,
  onChange: (val: string[]) => void,
}
type SelectType = {value: string, label: string};