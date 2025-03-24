import { Box, useColorModeValue, Container, VStack, useToast, Heading, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";


const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    // Success or Error Alert
    const toast = useToast();

    const navigate = useNavigate();
    
    const { createProduct } = useProductStore();

    const handleAddProduct = async() => {
        const { success, message} = await createProduct(newProduct);
       
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 5000,
            isClosable: true
        });
        if (success) {
            navigate("/"); // Redirect to homepage on success
        } 
      setNewProduct({
          name: "",
          price: "",
          image: "",
      });  
    };

    return ( <Container maxW={"container.sm"}>
        <VStack
            spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product 
            </Heading>

            <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
                p={6} rounded={"lg"} shadow={"md"}>
            <VStack spacing={8}>
                <Input
                    placeholder="Product NAme"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({
                        ...newProduct, name: e.target.value
                    })}
                />
                
                <Input
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({
                        ...newProduct, price: e.target.value
                    })}
                />

                <Input
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({
                        ...newProduct, image: e.target.value
                    })}
                />

                <Button colorScheme="blue" onClick={handleAddProduct} w='full'>Create</Button>
                </VStack>
            </Box>
        </VStack>
    </Container>

)}

export default CreatePage;