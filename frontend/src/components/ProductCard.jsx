import {
    Box, HStack, Button, IconButton, useColorModeValue, useToast, Heading, Image, Text, VStack, Input, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";
// import { set } from "mongoose";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const handleOpen = () => {
        setUpdatedProduct(product); // sync current product details
        onOpen();
    };



    const textColor = useColorModeValue("gray.800", "white");
    const bg = useColorModeValue("gray.300", "gray.800");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();

    const handleProductDelete = async (pid) => {
        try {
            const { success, message } = await deleteProduct(pid);
            if (!success) {
                toast({
                    title: "Error",
                    description: message || "Failed to delete product",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
                // Optional: Refresh products if delete failed
                await fetchProducts();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete product",
                status: "error",
                duration: 5000,
                isClosable: true
            });
            console.error("Delete error:", error);
        }
    }
    const handleProductUpdate = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true
            });
        }
    }
    return (
        <Box w={"full"} bg={bg} p={6} rounded={"lg"} shadow={"md"} overflow={"hidden"} transition={"all .3s ease"} _hover={{ transform: "translateY(-4px)", shadow: "xl" }}>

            <Box>
                <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
            </Box>

            <Box p={4}>
                <Heading as={'h2'} size={'md'} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={handleOpen} colorScheme={'blue'} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleProductDelete(product._id)} colorScheme={'red'} />
                </HStack>
            </Box>

            {/* Modal for editing feature */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) || 0 })
                                }
                            />

                            <Input
                                placeholder="Product Image"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => handleProductUpdate(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button onClick={onClose} variant={'ghost'}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );

}
export { ProductCard };