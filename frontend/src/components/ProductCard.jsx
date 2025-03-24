import { Box, HStack, IconButton, useColorModeValue, useToast, Heading, Image, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.800", "white");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct } = useProductStore();
    const toast = useToast();
    const handleProductDelete = async (pid) => {
        const { success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
        else{
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
        <Box w={"full"} bg={"white"} p={6} rounded={"lg"} shadow={"md"} overflow={"hidden"} transition={"all .3s ease"} _hover={{ transform: "translateY(-4px)", shadow: "xl" }}>

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
                    <IconButton icon={<EditIcon />} colorScheme={'blue'} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleProductDelete(product._id)} colorScheme={'red'} />
                </HStack>
            </Box>
        </Box>
     );
    
    }
export { ProductCard };