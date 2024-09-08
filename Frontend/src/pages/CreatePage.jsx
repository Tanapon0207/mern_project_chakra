import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product';
function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
    })

    const toast = useToast();
    const { createProduct } = useProductStore()
    async function handleAddProduct() {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewProduct({ name: "", price: "", image: "" });
    }


    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.700")} p={6} rounded={"ld"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        <Input placeholder='Product Price' name='price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                        <Input placeholder='Product Image' name='image' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                    </VStack>
                </Box>

                <Button colorScheme='blue' onClick={handleAddProduct} w="full">Add Product</Button>
            </VStack>

        </Container>
    )
}

export default CreatePage