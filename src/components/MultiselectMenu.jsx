import React, { useEffect, useState } from 'react';
import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  Input,
  FormControl,
} from '@chakra-ui/react';

const MultiSelectMenu = props => {
  const { label, options } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customValue, setCustomValue] = useState([]);
  const [tag, setTag] = useState(0);
  let prepValue = [...customValue];
  function getRandomNumber(min, max) {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();

    // Scale the random decimal to the desired range
    const randomInRange = randomDecimal * (max - min + 1) + min;

    // Convert the number to an integer and return
    return Math.floor(randomInRange);
  }
  useEffect(() => {
    setTag(getRandomNumber(150, 10000));
  }, []);

  return (
    <Menu closeOnSelect={false} width="100%">
      {({ onClose }) => (
        <>
          <MenuButton
            type="button"
            backgroundColor={selectedOptions.length ? 'orange.200' : 'white'}
            color={selectedOptions.length ? 'orange.500' : 'gray.600'}
            borderColor={selectedOptions.length ? 'orange.200' : 'gray.300'}
            borderWidth={1}
            p={2}
            px={4}
            borderRadius="25px"
            _focus={{
              outline: 'none',
            }}
            width="100%"
          >
            {`${label}${
              selectedOptions.length > 0 ? ` (${selectedOptions.length})` : tag
            }`}
          </MenuButton>
          <MenuList width="sm">
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  setCustomValue([]);
                  onClose();
                }}
              >
                Réinitialiser
              </MenuItem>
            </MenuGroup>
            <FormControl p={2}>
              <Input type="search" placeholder="Rechercher un article ici" />
            </FormControl>
            <MenuDivider />
            <MenuOptionGroup
              title={undefined}
              defaultValue={selectedOptions}
              value={selectedOptions}
              type="checkbox"
              onChange={values => {
                const optionCp = options.find(
                  o => o.id === values[values.length - 1]
                );
                prepValue.push({
                  product_id: optionCp.id,
                  produitName: optionCp.nom,
                  price: optionCp.price,
                  secteur: optionCp.secteur,
                  total: optionCp.price,
                  quantite: 1,
                  tag,
                });
                setCustomValue(prev => [
                  ...prev,
                  {
                    product_id: optionCp.id,
                    produitName: optionCp.nom,
                    price: optionCp.price,
                    secteur: optionCp.secteur,
                    total: optionCp.price,
                    quantite: 1,
                    tag,
                  },
                ]);

                setSelectedOptions(values);
                props.onChange(prepValue);
              }}
            >
              {options.map((option, k) => {
                return (
                  <MenuItemOption
                    key={`multiselect-menu-${k}`}
                    type="button"
                    value={option.id}
                  >
                    {option.nom}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default MultiSelectMenu;
