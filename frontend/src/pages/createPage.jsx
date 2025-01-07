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
            status: "error",
            isClosable: true
          });
        } else {
          toaster.create({
            title:"Success",
            description: message, 
            status: "success",
            isClosable: true
          });
        }
        setNewProduct({name: "", price: "", image: ""});
      //   console.log("Success: ", success); 
      //   console.log("Message: ", message); 
      // } catch (error) {
      //   console.log('Error in function handleAddProduct'); 
      //   return { success: false, message: error.message};
      // }
  };

  return ( 
    // <form>
  <Container maxW="lg">
    <VStack
      spacing={8}
    >
      <Heading as="h1" size="4xl" textAlign={"center"} mb={8}>
        Create A New Product
      </Heading>
      
      <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={8} rounded={"lg"} shadow={"md"}
      >

        <VStack spacing={4}>
        
          <Input
            placeholder="Item Name"
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
  /* </form> */
  );
};

export default CreatePage;