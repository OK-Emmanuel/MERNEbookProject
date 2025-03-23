import { Button, Container, HStack, Flex, Text, useColorMode,  } from '@chakra-ui/react';
import { Link } from "react-router-dom"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { useProductStore } from '../store/product';


const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
   
    return (
        <Container maxW={1140} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{ base: "18", sm: "20" }}
                    fontWeight={"bold"}
                    // textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}> Techifice Store </Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>

                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon/>: <LuSun/>}
                    </Button>
                {/* Close */}
                </HStack>
            </Flex>
        </Container>
    );
}

export default Navbar;