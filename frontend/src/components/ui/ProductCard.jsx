import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, DialogActionTrigger, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, Heading, HStack, IconButton, Image, Input, Portal, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import { useProductStore } from "../../store/product";
import { toaster } from './toaster'
import { useState } from "react";

const ProductCard = ({ product }) => {
    const [ updatedProduct, setUpdatedProduct ] = useState(product); 


    const textColor = useColorModeValue("gray.600", "gray.200"); 
    const bg = useColorModeValue("white", "gray.800"); 

    const { deleteProduct, updateProduct } = useProductStore(); 

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid); 
        if(!success) {
            toaster.create({
                title: 'Error',
                description: message, 
                duration: 3000, 
                type: "error", 
                isClosable: 'true', 
            });
        } else {
            toaster.create({
                title: 'Success', 
                description: message, 
                type: "success", 
                duration: 3000, 
                isClosable: 'true'
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        await updateProduct(pid, updatedProduct);
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

            <DialogRoot>
                <DialogTrigger>
                    <IconButton bgColor={'blue.200'}>
                        <EditIcon color={'black'} />
                    </IconButton> 
                </DialogTrigger>
                <Portal>
                    <DialogBackdrop>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update a Product</DialogTitle>
                            </DialogHeader>

                            <DialogBody>
                                <VStack spacing={4}>
                                    <Input 
                                        placeholder="Cake Name"
                                        name="name"
                                        value={updatedProduct.name}
                                        onChange={(e) => setUpdatedProduct({
                                            ...updatedProduct, name: e.target.value
                                        })}
                                    />
                                    <Input 
                                        placeholder="Price"
                                        name="price"
                                        type="number"
                                        min={0.1}
                                        value={updatedProduct.price}
                                        onChange={(e) => setUpdatedProduct({
                                            ...updatedProduct, price: e.target.value
                                        })}
                                    />
                                    <Input 
                                        placeholder="Image URL"
                                        name="image"
                                        value={updatedProduct.image}
                                        onChange={(e) => setUpdatedProduct({
                                            ...updatedProduct, image: e.target.value
                                        })}
                                    />
                                </VStack>
                            </DialogBody>

                            <DialogFooter>
                                <DialogActionTrigger>
                                    <Button
                                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                    >Update</Button>
                                </DialogActionTrigger>
                                <DialogCloseTrigger />
                                <DialogActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogActionTrigger>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogBackdrop>
                </Portal>
            </DialogRoot>

                    <IconButton bgColor={'red.200'}>
                        <DeleteIcon color={'black'}
                        onClick={() => handleDeleteProduct(product._id)}/>
                    </IconButton>
                </HStack>
            </Box>
        </Box>
        
    )
}; 
export default ProductCard; 

//                     <IconButton bgColor={'red.200'} onClick={() => handleDeleteProduct(product._id)}>
