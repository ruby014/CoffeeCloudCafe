import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ui/ProductCard";

const HomePage = () => {
  const { fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products); 
  
  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          textAlign={"center"}
        > Current Flavours
        </Text>

        <SimpleGrid
          columns={{
            base: 1, 
            md: 2, 
            lg: 3
          }}
          gap='20px'//spacing={10}
          w={"full"}
          maxW={'1140px'}
        >
            {products.map((product) => (
              <ProductCard
              key={product._id}
              product={product}
              />
            ))}
        </SimpleGrid>

        {products.length === 0 && (
                  <Text 
                  fontSize={"xl"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  color={"gray.500"}
                > No cakes found 😔{" "}
                  <Link to={"/create"}>
                    <Text
                      as="span"
                      color="blue.500"
                    > Create a Cake
                    </Text>
                  </Link>
                </Text>
        )}; 
      </VStack>
    </Container>
  )
};
export default HomePage;