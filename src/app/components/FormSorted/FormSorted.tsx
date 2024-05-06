import { useForm } from "@mantine/form";

export default function FormSorted() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      genre: '',
      release_year: '',
      rating_from: '',
      rating_to: '', 
      sort_by: 'Most popular'
    },
  });
}
