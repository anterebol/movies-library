import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import classes from './customSelect.module.scss';
import { CustomSelectProps } from '@/types/CustopSelectType';
import { SelectButton } from '../SelectButton/SelectButton';

export function CustomSelect(props: CustomSelectProps) {
  const { data, label, placeholder, defaultValue, onChange } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedOption = data.find((item) => item.value === defaultValue);

  const options = data.map(({value, label}) => (
    <Combobox.Option 
      value={value} 
      key={label} 
      active={defaultValue === value}
      className={classes.select__option}
    >
      {label}
    </Combobox.Option>
  ));
  
  const onSubmit = (value: string) => {
    combobox.closeDropdown();
    onChange(value);
  }

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      classNames={{
        options: classes.select__options,
      }}
      onOptionSubmit={onSubmit}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          label={label}
          size='customInput'
          rightSection={<SelectButton isSelectOpen={combobox.dropdownOpened} />}
          onClick={() => {
            combobox.toggleDropdown();
          }}
          rightSectionPointerEvents="none"
          multiline
        >
          {selectedOption ? (
            selectedOption.label
          ) : (
            <Input.Placeholder>{placeholder}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
