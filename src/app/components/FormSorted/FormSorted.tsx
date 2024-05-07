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

export default function FormSorted(props: {onChange: (g: any) => void, genres: Array<GenreType>}) {

  const genres = useMemo(() => customizeGenres(props.genres), [props.genres]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialFormValues,
    validateInputOnChange: true,
    validate: {
      rating_from: (value, values) => getRatingFromError(Number(value), Number(values.rating_to)),
      rating_to: (value, values) => getRatingToError(Number(value), Number(values.rating_from)),
    },
  });

  const addOne = (type: string) => {
    const allFormValues = form.getValues();
    let currentField = Number(allFormValues[type] || 0);
    console.log(currentField)
    currentField = currentField < 10 ? currentField + 1 : currentField;
    const currentNumber = currentField.toString();
    type === 'rating_from' ? 
      form.setFieldValue('rating_from', currentNumber) :
      form.setFieldValue('rating_to', currentNumber)
  }
  const subOne = (type: string) => {
    const allFormValues = form.getValues();
    let currentField = Number(allFormValues[type] || 0);
    currentField = currentField > 0 ? currentField - 1 : 0;
    const currentNumber = currentField.toString();
    type === 'rating_from' ? 
      form.setFieldValue('rating_from', currentNumber) :
        form.setFieldValue('rating_to', currentNumber)
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
        onAddClick={() => { addOne('rating_from') }}
        onSubClick={() => { subOne('rating_from') }}
      />
      <CounterInput 
        selectKey={form.key('rating_to')}
        inputProps={form.getInputProps('rating_to')} 
        placeholder={"To"} 
        onAddClick={() => { addOne('rating_to') }}
        onSubClick={() => { subOne('rating_to') }}
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
      defaultValue='popularity.desc'
      placeholder="Choose sort properties"
    />
  </Flex>
}

