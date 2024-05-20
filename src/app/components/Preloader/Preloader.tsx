import { Flex, Loader } from "@mantine/core";

export const Preloader = () => (
  <Flex 
    h={'inherit'} 
    w={'100%'} 
    justify={'center'} 
    align={'center'}
  >
    <Loader color="grape" />
  </Flex>
)