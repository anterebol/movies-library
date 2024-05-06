"use client"
import { useState } from 'react';
import { Group } from '@mantine/core';
import classes from '@/app/components/navbar.module.css';

const data = [
  { link: '', label: 'Movies'},
  { link: '', label: 'Rated movies'},
];

export function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          Logo
        </Group>
        {links}
      </div>
    </nav>
  );
}