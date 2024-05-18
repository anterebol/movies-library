import Image from 'next/image';
import addIcon from '@/assets/form/add-clicker.svg';
import subtractIcon from '@/assets/form/subtract-clicker.svg';
import { NumberInput } from '@mantine/core';
import classes from './counterInput.module.scss';
import { useFocusWithin } from '@mantine/hooks';
import { CounterPropsType } from '@/types/counterPropsType';

export const CounterInput = (props: CounterPropsType) => {
  const { label, placeholder, selectKey, inputProps, onAddClick, onSubClick, defaultValue } = props;
  const { ref, focused } = useFocusWithin();
  const classesCounter = {
    error: classes.counter__error,
    wrapper: classes.counter__wrapper,
    input: [
      classes.counter__input, 
      focused ? classes.counter__input__focused : ''
    ].join(' '),
    label: classes.counter__label,
  };

  return (
    <NumberInput
      ref={ref}
      defaultValue={defaultValue}
      className={classes.counter}
      rightSection={
        <div className={classes.counter__rightSection}>
          <button 
            className={classes.counter__rightSection__button}
            onClick={onAddClick}
          >
            <Image width={12} height={12} alt="add_icon" src={subtractIcon} />
          </button>
          <button 
            className={classes.counter__rightSection__button}
            onClick={onSubClick}
          >
            <Image width={12} height={12} alt="sub_icon" src={addIcon} />
          </button>
        </div>
      }
      key={selectKey}
      {...inputProps}
      label={label}
      placeholder={placeholder}
      classNames={classesCounter}
    />
  )
}