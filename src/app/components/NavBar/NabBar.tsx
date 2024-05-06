"use client"
import { Group, Title } from '@mantine/core';
import classes from './navbar.module.scss';
import Image from 'next/image'
import logo from '@/assets/logo.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navbar = [
  { link: '/movies', name: 'Movies'},
  { link: '/rated_movies', name: 'Rated movies'},
];

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className={classes.navbar}>
      <Group wrap="nowrap" gap={12} className={classes.navbar__header}>
        <Image className={classes.navbar__logo} width={32} height={32} src={logo} alt="logo_img" />
        <Title order={1} className={classes.navbar__title}>ArrowFlicks</Title>
      </Group>
      <ul className={classes.navbar__list} >
        {navbar.map(({link, name}) => 
          <li key={link} >
            <Link 
              href={link} 
              className={classes.navbar__link} 
              data-active={pathname === link || undefined} 
            >
              {name}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}