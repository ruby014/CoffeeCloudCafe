import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
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

        <SimpleGrid>
          
        </SimpleGrid>
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
      </VStack>
    </Container>
  )
};
export default HomePage;