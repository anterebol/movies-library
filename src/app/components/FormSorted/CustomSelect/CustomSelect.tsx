import classes from './customSelect.module.scss';
import { Select } from "@mantine/core";
import Image from 'next/image';
import selectDefaultButton from '@/assets/form/default-select.svg';
import { CustomSelectProps } from '@/types/CustopSelectType';

export const CustomSelect = (props: CustomSelectProps) => {
  const { selectKey, inputProps, data, label, placeholder, defaultValue } = props;
  return <Select
      label={label}
      placeholder={placeholder}
      searchable
      rightSection={<Image alt="select_button" src={selectDefaultButton} />}
      rightSectionWidth={24}
      key={selectKey}
      {...inputProps}
      maxDropdownHeight={200}
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