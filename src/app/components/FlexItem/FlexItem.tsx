import { Flex } from '@mantine/core';
import classes from './flexItem.module.scss';
import { Title } from '../Title/Title';
import { Text } from '../Text/Text';

export const FlexItem = ({ title, description }: {title: string, description: string}) => 
<Flex className={classes.flex} w={'100%'} gap={8}>
  <Title className={classes.flex__title} tag='h3' title={title} />
  <Text className={classes.flex__description} text={description} />
</Flex>