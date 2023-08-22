import { Button } from '@chakra-ui/react';
import React from 'react';

function CategoryItem({ name, onClick }) {
  return (
    <Button
      minWidth={{ base: '30%', md: '25%', xl: '20%', lg: '20%' }}
      variant="solid"
      bg="orange.500"
      color="white"
      flexGrow={1}
      onClick={onClick}
      _hover={{ bg: 'orange.700' }}
      rounded={104}
    >
      {name}
    </Button>
  );
}

export default CategoryItem;
