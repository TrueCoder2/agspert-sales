import React, { useState } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { AddIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import SaleOrderTable from "./SaleOrderTable";
import SaleOrderForm from "./SaleOrderForm";

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const [orders, setOrders] = useState([
    { id: 1, customer_name: "Ram", price: 100, last_modified: "2024-05-24T23:07:00", status: "active", selected_products: [1, 2] },
    { id: 2, customer_name: "Shyam", price: 210, last_modified: "2024-05-24T23:30:00", status: "active", selected_products: [2, 3] },
    { id: 3, customer_name: "Murali Manohar", price: 180, last_modified: "2024-04-24T19:30:00", status: "active", selected_products: [3, 4] },
    { id: 4, customer_name: "Ragunath", price: 150, last_modified: "2024-04-24T20:30:00", status: "active", selected_products: [4, 5] },
    { id: 1, customer_name: "Ghanshyam", price: 150, last_modified: "2024-05-23T21:45:00", status: "completed", selected_products: [1, 3] },
    { id: 2, customer_name: "Radheshyam", price: 250, last_modified: "2024-05-22T20:15:00", status: "completed", selected_products: [2, 3] },
  ]);
  
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState("active");

  const handleCreateOrder = (data) => {
    const orderData = {
      ...data,
      last_modified: new Date().toISOString(),
    };
    setOrders((prevOrders) => [
      ...prevOrders,
      { ...orderData, id: prevOrders.length + 1, status: "active" },
    ]);
    toast({
      title: "Order created.",
      description: "The new sale order has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleEditOrder = (order) => {
    setCurrentOrder({
      ...order,
      last_modified: new Date(order.last_modified),
    });
    setIsEditing(true);
    onOpen();
  };

  const handleAddOrder = () => {
    setCurrentOrder(null);
    setIsEditing(false);
    onOpen();
  };

  const handleSaveOrder = (data) => {
    const formattedData = {
      ...data,
      last_modified: new Date(data.last_modified).toISOString(),
    };
    if (isEditing) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === currentOrder.id ? { ...formattedData, id: currentOrder.id, status: "active" } : order
        )
      );
    } else {
      setOrders((prevOrders) => [
        ...prevOrders,
        { ...formattedData, id: prevOrders.length + 1, status: "active" },
      ]);
    }
    onClose();
  };

  const filteredOrders = orders.filter((order) => order.status === tab);

  return (
    <Box p={5} height='100vh' width='100vw' display='flex' alignContent='center'  flexDirection='column'>
      <Box mb={5} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Button
            colorScheme={tab === "active" ? "teal" : "gray"}
            onClick={() => setTab("active")}
            mr={3}
          >
            Active Sale Orders
          </Button>
          <Button
            colorScheme={tab === "completed" ? "teal" : "gray"}
            onClick={() => setTab("completed")}
          >
            Completed Sale Orders
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          {tab === "active" && (
            <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={handleAddOrder} mr={3}>
               Sale Order
            </Button>
          )}
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle Theme"
          />
        </Box>
      </Box>

      <SaleOrderTable orders={filteredOrders} onEdit={handleEditOrder} tab={tab} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Edit Sale Order" : "Add Sale Order"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm
              key={currentOrder ? currentOrder.id : "new"}
              defaultValues={currentOrder}
              onSubmit={handleSaveOrder}
              isReadOnly={tab !== "active"}
              products={products}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
