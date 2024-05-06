"use client"
import classes from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo/Logo';

const navbar = [
  { link: '/movies', name: 'Movies'},
  { link: '/rated_movies', name: 'Rated movies'},
];

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className={classes.navbar}>
      <Logo />
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