"use client"
import classes from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo/Logo';
import { navbar } from '@/constants/navBarLinks';
import { useState } from 'react';
import { Button } from '@mantine/core';
import Image from 'next/image';
import burgerMenu from '@/assets/burger-menu.svg';
import closeBurger from '@/assets/close-white.svg';

export function Navbar() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const toggleMenu = (currentState: boolean) => setOpened(!currentState);
  const navBarClassName = [classes.navbar, opened ? classes.navbar__opened : ''].join(' ');

  return (
    <>
      <div className={classes.left__emty__box}>
        <Button 
          className={classes.side__bar__burger} 
          onClick={() => { toggleMenu(opened) }}
        >
          <Image 
            width={25} 
            height={18} 
            src={burgerMenu} 
            title='Toggle meny' 
            alt='open_button' 
          />
        </Button>
      </div>
      <nav className={navBarClassName}>
        <Logo />
        <Button 
          className={classes.navbar__close__burger} 
          onClick={() => { toggleMenu(opened)}}
        >
          <Image 
            width={20} 
            height={20} 
            src={closeBurger} 
            title='Toggle meny' 
            alt='open_button' 
          />
        </Button>
        <ul className={classes.navbar__list} >
          {navbar.map(({link, name}) => 
            <li key={link} >
              <Link 
                href={`${link}?page=1`} 
                className={classes.navbar__link} 
                data-active={pathname.includes(link) || undefined} 
              >
                {name}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}