import { useForm } from "@mantine/form";

export default function FormSorted() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });
}
