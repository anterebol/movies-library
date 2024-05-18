import { Button, Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from './formSorted.module.scss';
import { useMemo } from "react";
import { sortProps } from "@/constants/selectSortedProps";
import { customizeGenres } from "@/utils/customizeGenres";
import { CounterInput } from "./CounterInput/CounterInput";
import { getRatingFromError, getRatingToError } from "@/utils/ratingValidation";
import { useAppSelector } from "@/hooks/hooks";
import initialValues from "@/constants/formSortedInitialValues";
import { FormSortedProps } from "@/types/formSortedProps";
import { getSelectYears } from "@/utils/getSelectYears";
import { CustomSelect } from "./CustomSelect/CustomSelect";
import { MultiSelect } from "./MultiSelect/MultiSelect";

export default function FormSorted(props: FormSortedProps) {
  const { searchFormValues } = useAppSelector((state) => state);
  const { onChange } = props;
  const genres = useMemo(() => customizeGenres(props.genres), [props.genres]);
  const yearsData = useMemo(() => getSelectYears(), []);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {...searchFormValues},
    validateInputOnChange: true,
    onValuesChange: () => {
      form.validate();
      const formValues = form.getValues();
      const formState = {
        genres: formValues.genres,
        release_year: formValues.release_year,
        rating_from: formValues.rating_from,
        rating_to: formValues.rating_to, 
        sort_by: formValues.sort_by
      }
      onChange(formState, form.isValid());
    },
    validate: {
      rating_from: (value, values) => getRatingFromError(Number(value), Number(values.rating_to)),
      rating_to: (value, values) => getRatingToError(Number(value), Number(values.rating_from)),
    },
  });

  const isFormEmpty = () => {
    return Object.entries(searchFormValues).every(([key, value]) => {
      if (key === 'genres') {
        if (!value.length) {
          return true;
        }
        return false;
      } else if (key === 'sort_by') {
        if (value === 'popularity.desc') {
          return true;
        }
        return false;
      } else if (!value) {
        return true;
      }
      return false;
    })
  }
  
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
  
  const resetForm = (e: any) => {
    form.onReset(e);
    form.setValues({...initialValues})
  }

  return <Flex className={classes.formSort} wrap={'wrap'}>
    <MultiSelect 
      data={genres} 
      placeholder={"Select genre"} 
      label={"Genres"} 
      onChange={(value: Array<string>) => form.setFieldValue('genres', value)} 
      defaultValue={searchFormValues.genres}
    />
    <CustomSelect 
      data={yearsData}
      defaultValue={searchFormValues.release_year}
      label="Release year"
      placeholder="Select release year"
      onChange={(val: string) => form.setFieldValue('release_year', val)}
    />
    <Group gap={8} align="last baseline">  
      <CounterInput 
        selectKey={form.key('rating_from')}
        inputProps={form.getInputProps('rating_from')} 
        label={"Ratings"} 
        placeholder={"From"}
        defaultValue={searchFormValues.rating_from}
        onAddClick={() => { setFormRating('rating_from', 'add') }}
        onSubClick={() => { setFormRating('rating_from') }}
      />
      <CounterInput 
        selectKey={form.key('rating_to')}
        inputProps={form.getInputProps('rating_to')} 
        placeholder={"To"} 
        defaultValue={searchFormValues.rating_to}
        onAddClick={() => { setFormRating('rating_to', 'add') }}
        onSubClick={() => { setFormRating('rating_to') }}
      />
    </Group>
    <Button 
      className={classes.formSort__reset__button} 
      onClick={resetForm} 
      title="Reset form"
      disabled={isFormEmpty()}
    >
      Reset filters
    </Button>
    <CustomSelect
      data={sortProps}
      label="Sort by"
      defaultValue={searchFormValues.sort_by}
      placeholder="Choose sort properties"
      onChange={(val: string) => form.setFieldValue('sort_by', val)}
    />
  </Flex>
}

