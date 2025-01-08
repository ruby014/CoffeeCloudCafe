import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from '../components/ui/toaster'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"", 
    price:"", 
    image:"",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async() => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
          toaster.create({
            title:"Error",
            description: message, 
            type: "error",
            isClosable: true
          });
        } else {
          toaster.create({
            title:"Success",
            description: "Product added successfully", 
            type: "success", 
            isClosable: true
          });
        }
        setNewProduct({name: "", price: "", image: ""});
  };

  return ( 
  <Container maxW="lg">
    <VStack
      spacing={8}
    >
      <Heading as="h1" size="4xl" textAlign={"center"} mb={8} fontWeight={"bold"}>
        Create A New Product
      </Heading>
      
      <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={8} rounded={"lg"} shadow={"md"}
      >

        <VStack spacing={4}>
        
          <Input
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
          />

          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
          />

          <Input
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
          />

          <Button
            colorScheme="blue"
            onClick={handleAddProduct}
            w="full">
              Add Product
          </Button>
        </VStack>

      </Box>

    </VStack>
  </Container>
  );
};

export default CreatePage;