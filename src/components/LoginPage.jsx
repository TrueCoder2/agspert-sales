import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = data => {
    if (data.username === "admin" && data.password === "password") {
      setAuth(true);
      navigate("/dashboard");
      
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" w='100vw' flexDirection='column' >
      <Text mb='2rem' color="#9AE6B4" fontSize="5xl" fontWeight="bold">AgSpert Sale Management</Text>
      <Box p={6} boxShadow="lg" borderRadius="md" >
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={3}>
            <FormLabel>Username</FormLabel>
            <Input {...register("username")} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register("password")} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Login</Button>
        </form>
      </Box>
    </Box>
    
  );
};

export default Login;
