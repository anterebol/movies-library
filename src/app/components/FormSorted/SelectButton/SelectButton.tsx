import Image from "next/image";
import selectDefaultButton from '@/assets/form/default-select.svg';
import selectOpenButton from '@/assets/form/up.svg';

export const SelectButton = ({ isSelectOpen }: { isSelectOpen: boolean }) =>
  <Image 
    alt="select_button" 
    src={isSelectOpen ? selectOpenButton : selectDefaultButton} 
  />