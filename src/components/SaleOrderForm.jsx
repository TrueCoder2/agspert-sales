import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button, Stack, Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SaleOrderForm = ({ defaultValues, onSubmit, isReadOnly, products }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    price: "",
    last_modified: new Date(),
    selected_products: [],
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        customer_name: defaultValues.customer_name,
        price: defaultValues.price,
        last_modified: new Date(defaultValues.last_modified),
        selected_products: defaultValues.selected_products || [],
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, last_modified: date });
  };

  const handleProductChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setFormData({ ...formData, selected_products: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="customer_name" isRequired>
          <FormLabel>Customer Name</FormLabel>
          <Input
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            isReadOnly={isReadOnly}
          />
        </FormControl>
        <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            isReadOnly={isReadOnly}
          />
        </FormControl>
        <FormControl id="last_modified" isRequired>
          <FormLabel>Last Modified</FormLabel>
          <DatePicker
            selected={formData.last_modified}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="chakra-input"
            disabled={isReadOnly}
          />
        </FormControl>
        <FormControl id="selected_products" isRequired>
          <FormLabel>Products</FormLabel>
          <Select
            name="selected_products"
            multiple
            value={formData.selected_products}
            onChange={handleProductChange}
            isReadOnly={isReadOnly}
          >
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {!isReadOnly && (
          <Button type="submit" colorScheme="teal">
            Save
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default SaleOrderForm;
