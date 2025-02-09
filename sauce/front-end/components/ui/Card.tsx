import { Badge, Box, Button, HStack, Image, Text } from "@chakra-ui/react"

export const CardHorizontal = () => (
  <Box display="flex" padding={0} flexDirection="row" overflow="hidden" maxW="xl" borderWidth="2px" borderRadius="lg" bottom="0">
    <Image
      objectFit="cover"
      maxW="200px"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <Box p="4">
      <Text fontWeight="bold" mb="2">The perfect latte</Text>
      <Text mb="4">
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
      <HStack mt="4">
        <Badge>Hot</Badge>
        <Badge>Caffeine</Badge>
      </HStack>
      <Box mt="4">
        <Button colorScheme="blue">Buy Latte</Button>
      </Box>
    </Box>
  </Box>
)
