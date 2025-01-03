import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import { useProductStore } from "../../store/product";
import { toaster } from './toaster'

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200"); 
    const bg = useColorModeValue("white", "gray.800"); 

    const { deleteProduct } = useProductStore(); 

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success) {
            toaster.create({
                title: 'Error',
                description: message, 
                status: 'error', 
                duration: 3000, 
                isClosable: 'true', 
            });
        } else {
            toaster.success({
                title: 'Success', 
                description: message, 
                status: 'success', 
                duration: 3000, 
                isClosable: 'true'
            });
        }
    }

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{transform: "translateY(-5px)", shadow: "xl"}}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w='full'
                objectFit='cover'
            />

            <Box p={4}>
                <Heading
                    as='h3'
                    size='md'
                    mb={2}
                > {product.name}
                </Heading>

                <Text
                    fontWeight='bold'
                    fontSize='xl'
                    color={textColor}
                    mb={4}
                > ${product.price}
                </Text>

                <HStack spacing={2}>
                    {/* <IconButton icon={<EditIcon/>} colorScheme='blue'/>
                    <IconButton icon={<DeleteIcon/>} colorScheme='red'/> */}
                    <IconButton bgColor={'blue.200'}>
                        <EditIcon color={'black'}></EditIcon>
                    </IconButton>
                    <IconButton bgColor={'red.200'}>
                        <DeleteIcon color={'black'}
                        onClick={() => 
                            toaster.create({
                                title: "Success", 
                                description: "Delete button clicked", 
                                duration: 3000,
                            })
                            }
                        ></DeleteIcon>
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    )
}; 
export default ProductCard; 

//                     <IconButton bgColor={'red.200'} onClick={() => handleDeleteProduct(product._id)}>