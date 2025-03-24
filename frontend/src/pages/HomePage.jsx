import { Container, useToast, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { shallow } from 'zustand/shallow';

const HomePage = () => {
    const toast = useToast();
    // Fixed: Use separate selectors
    const fetchProducts = useProductStore(state => state.fetchProducts);
    const products = useProductStore(state => state.products);

    const load = useCallback(async () => {
        const result = await fetchProducts();
        if (result?.success === false) {
            toast({
                title: 'Failed to fetch products',
                description: result.message || 'Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [fetchProducts, toast]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <Container maxW='container.xl' py='12'>
            <VStack spacing={8}>
                <Text
                    fontSize={'4xl'}
                    fontWeight={'bold'}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={'text'}
                >
                    Available Products
                </Text>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={10}
                    mt={8}
                    w={"full"}
                >
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            product && <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
                            We are out of stock. Please check back later.
                        </Text>
                    )}
                </SimpleGrid>

                <Link to={"/create"}>
                    <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
                        Add a new Product
                    </Text>
                </Link>
            </VStack>
        </Container>
    );
}

export default HomePage;