import { useMemo } from 'react';
import { Combobox, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { MultipleSelectProps } from '@/types/CustopSelectType';
import classes from './multiSelect.module.scss';
import { SelectButton } from '../SelectButton/SelectButton';

const MAX_DISPLAYED_VALUES = 2;

export function MultiSelect(props: MultipleSelectProps) {
  const { defaultValue, data, onChange, placeholder, label } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const isDropdownOpened = combobox.dropdownOpened;

  const handleValueSelect = (id: string) => {
    const current = defaultValue?.includes(id) ? defaultValue?.filter((value) => value !== id) : [...defaultValue, id];
    onChange(current);
  }

  const values = useMemo(() => {
    const showsData = data?.filter((genre) => 
      defaultValue.slice(0, MAX_DISPLAYED_VALUES).find((id) => 
        genre.value === id));

    return showsData.map(({label}, index) => {
          return (
            <Pill key={label} className={classes.select__pill}>
              {index !== showsData.length - 1 ? `${label},` : label}
            </Pill>
          )
      });
  }, [data, defaultValue]);

  const options = data.map(({label, value}) => {
    return (
      <Combobox.Option 
        value={value} 
        key={label} 
        active={defaultValue?.includes(value)}
        className={classes.select__option}
      >
        <span>{label}</span>
      </Combobox.Option>
    )
  });

  return (
    <Combobox 
      store={combobox} 
      onOptionSubmit={handleValueSelect} 
      withinPortal={false}
      classNames={{
        options: classes.select__options,
      }}
    >
      <Combobox.DropdownTarget>
        <PillsInput 
          rightSection={<SelectButton isSelectOpen={isDropdownOpened} />}
          rightSectionPointerEvents="none"
          pointer 
          label={label}
          size='customInput'
          classNames={{
            input: isDropdownOpened ? classes.select__opened : '',
          }}
          onClick={(e) => {
            e.stopPropagation()
            combobox.toggleDropdown()
          }}
        >
          <Pill.Group className={classes.select__group}>
            {values?.length > 0 ? (
              <>
                {values}
                {defaultValue.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{defaultValue.length - MAX_DISPLAYED_VALUES} more</Pill>
                )}
              </>
              
            ) : (
              <Input.Placeholder>{placeholder}</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}