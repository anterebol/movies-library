import classes from './customSelect.module.scss';
import { Select } from "@mantine/core";
import Image from 'next/image';
import selectDefaultButton from '@/assets/form/default-select.svg';

type SelectType = {value: string, label: string};

export const CustomSelect = (props: {
  selectKey: any,
  inputProps: any,
  data: Array<SelectType>,
  placeholder: string,
  label: string,
  defaultValue?: string,
}) => {
  const { selectKey, inputProps, data, label, placeholder, defaultValue } = props;
  return <Select
      label={label}
      placeholder={placeholder}
      searchable
      rightSection={<Image alt="select_button" src={selectDefaultButton} />}
      rightSectionWidth={24}
      key={selectKey}
      {...inputProps}
      classNames={{
        root: [classes.select],
        wrapper: classes.select__wrapper,
        input: classes.select__input,
        label: classes.select__label,
      }}
      defaultValue={defaultValue}
      data={data}
    />
}