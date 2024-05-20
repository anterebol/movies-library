'use client'
import classes from './not-found.module.scss';
import { Logo } from "./components/Logo/Logo";
import Image from 'next/image';
import not_found from '@/assets/page_404.svg';
import { Text } from './components/Text/Text';
import { Button, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function NotFound () {
  const router = useRouter();

  return (
    <div className={classes.not__found}>
      <div className={classes.not__found__logo}>
        <Logo />
      </div>
      <Flex direction={'column'} align={'center'} mt={0}>
        <Image 
          className={classes.not__found__404} 
          src={not_found} 
          alt='page_404'
        />
        <Text 
          className={classes.not__found__text} 
          text={`We can’t find the page you are looking for`} 
        />
        <Button
          size='vb'
          className={classes.not__found__button}
          title="Go Home"
          onClick={() => router.push('/')}
        >
          Go Home
        </Button>
      </Flex>
    </div>
  )
}