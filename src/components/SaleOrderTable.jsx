import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const SaleOrderTable = ({ orders, onEdit }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Customer Name</Th>
          <Th>Price (₹)</Th>
          <Th>Last Modified</Th>
          <Th>Edit/View</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.id}>
            <Td>{order.id}</Td>
            <Td>{order.customer_name}</Td>
            <Td>{order.price}</Td>
            <Td>{new Date(order.last_modified).toLocaleString()}</Td>
            <Td>
              <IconButton
                icon={<EditIcon />}
                onClick={() => onEdit(order)}
                aria-label="Edit Order"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SaleOrderTable;
