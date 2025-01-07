import { Container, Flex, Text, Link, HStack, Button } from "@chakra-ui/react";
// import { Link } from "react-router-dom"; 
import { PlusSquareIcon } from "@chakra-ui/icons"; 
import { Link as RouterLink } from "react-router-dom";
import { useColorMode } from "./color-mode";
import { IoMoon } from "react-icons/io5"; 
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); 

  return <Container maxW={"1140px"} px={4}>
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
      base:"column",
      sm:"row"
    }}
    >
    <Text
      fontSize={{base:"22px", sm:"28px"}}
      fontWeight="bold"
      textTransform="uppercase"
      textAlign="center"
      bgGradient="to-r"
      gradientFrom="cyan.300"
      gradientTo="blue.500"
      bgClip="text"
      as={RouterLink}
      to="/"
    >
     Coffee Cloud Cafe☁️
  </Text>

      <HStack spacing={2} alignItems={"center"}>
        <Link href="/create">
          <Button>
            <PlusSquareIcon fontSize={20}/>
          </Button>
        </Link>
        
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <IoMoon /> : 
          <LuSun size="20px" />}
        </Button>
      </HStack>
    </Flex>
  </Container>
};

export default Navbar;