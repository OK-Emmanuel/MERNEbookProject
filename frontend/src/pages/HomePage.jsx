import { Container, SimpleGrid, Text, VStack} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { xl } from '../styles/fontSizes';

const HomePage = () => {

    // useEffect
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
                    {/* <ProductCard /> */}
                    

                </SimpleGrid>

                <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
                    We are out of stock. Please check back later. <br />
                    <Link to={"/create"}>
                        <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
                            Add a new Product
                        </Text>
                    </Link>
                </Text>
            </VStack>

        </Container>
    );
}

export default HomePage;