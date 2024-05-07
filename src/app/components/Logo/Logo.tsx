import { Group } from "@mantine/core";
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import classes from './logo.module.scss';
import { Title } from "../Title/Title";

export const Logo = () => (
  <Group wrap="nowrap" gap={12} className={classes.logo}>
    <Image width={32} height={32} src={logo} alt="logo_img" />
    <Title tag="h1" className={classes.logo__title} title="ArrowFlicks" />
  </Group>
)