"use client"
import classes from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo/Logo';
import { navbar } from '@/constants/navBarLinks';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={classes.navbar}>
      <Logo />
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
  );
}