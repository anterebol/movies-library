import { Button, Flex, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CustomSelect } from "./CustomSelect/CustomSelect";
import classes from './formSorted.module.scss';
import { useMemo } from "react";
import { GenreType } from "@/types/genreType";
import initialFormValues from '@/constants/formSortedInitialValues';
import { sortProps } from "@/constants/selectSortedProps";
import { customizeGenres } from "@/utils/customizeGenres";
import { CounterInput } from "./CounterInput/CounterInput";
import { getRatingFromError, getRatingToError } from "@/utils/ratingValidation";

export default function FormSorted(props: {onChange: (apiProps: any) => void, genres: Array<GenreType>}) {
  const { onChange } = props;
  const genres = useMemo(() => customizeGenres(props.genres), [props.genres]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialFormValues,
    validateInputOnChange: true,
    onValuesChange: () => {
      form.validate();
      form.isValid() && onChange(form.getValues());
    },
    validate: {
      rating_from: (value, values) => getRatingFromError(Number(value), Number(values.rating_to)),
      rating_to: (value, values) => getRatingToError(Number(value), Number(values.rating_from)),
    },
  });
  const setFormRating = (type: string, operation?: string) => {
    const allFormValues = form.getValues();
    let currentNumber = Number(allFormValues[type] || 0);
    if (operation === 'add') {
      currentNumber = currentNumber < 10 ? currentNumber + 1 : currentNumber;
    } else {
      currentNumber = currentNumber > 0 ? currentNumber - 1 : 0;
    }
    form.setFieldValue(type, currentNumber.toString())
  }
  
  const resetForm = () => {
    form.setValues({...initialFormValues})
  }

  return <Flex className={classes.formSort} wrap={'wrap'}>
    <CustomSelect 
      selectKey={form.key('genre') || undefined} 
      inputProps={form.getInputProps('genre')} 
      data={genres}
      label="Genres"
      placeholder="Select genre"
    />
    <CustomSelect 
      selectKey={form.key('release_year') || undefined} 
      inputProps={form.getInputProps('release_year')} 
      data={[{ value: '', label: '' }]}
      label="Release year"
      placeholder="Select release year"
    />
    <Group gap={8} align="last baseline">  
      <CounterInput 
        selectKey={form.key('rating_from')}
        inputProps={form.getInputProps('rating_from')} 
        label={"Ratings"} 
        placeholder={"From"}
        onAddClick={() => { setFormRating('rating_from', 'add') }}
        onSubClick={() => { setFormRating('rating_from') }}
      />
      <CounterInput 
        selectKey={form.key('rating_to')}
        inputProps={form.getInputProps('rating_to')} 
        placeholder={"To"} 
        onAddClick={() => { setFormRating('rating_to', 'add') }}
        onSubClick={() => { setFormRating('rating_to') }}
      />
    </Group>
    <Button className={classes.formSort__button} onClick={resetForm} >
      Reset filters
    </Button>
    <CustomSelect 
      selectKey={form.key('sort_by') || undefined} 
      inputProps={form.getInputProps('sort_by')} 
      data={sortProps}
      label="Sort by"
      defaultValue={initialFormValues.sort_by}
      placeholder="Choose sort properties"
    />
  </Flex>
}

