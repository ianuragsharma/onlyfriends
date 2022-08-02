import {
  Avatar,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { userData } = useSelector((state) => state.auth);
  console.log(userData);
  const { toggleColorMode } = useColorMode();
  const themeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  return (
    <Flex
      width="100%"
      borderBottom="1px"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      height="4rem"
      justifyContent="space-between"
      alignItems="center"
      pos="sticky"
      top="0"
      zIndex="1"
    >
      <Flex alignItems="center">
        <RouterLink to="/">
          <Image
            src={useColorModeValue("/favicon.png", "/faviconDark.png")}
            alt="brand-logo"
            boxSize="50px"
            objectFit="cover"
            ml="6"
            color="white.900"
          />
        </RouterLink>

        <RouterLink to="/">
          <Heading
            fontSize="1.5rem"
            fontWeight="500"
            ml="1rem"
            display={{ base: "none", md: "block" }}
          >
            Only friends
          </Heading>
        </RouterLink>
      </Flex>

      <HStack spacing="2" marginLeft={{ base: "2rem", md: "0" }}>
        <IconButton
          onClick={toggleColorMode}
          variant="outline"
          size="md"
          icon={themeIcon}
        />
        <RouterLink to="/">
          <Avatar
            display={{ base: "none", md: "block" }}
            src="/favicon.png"
            alt="profile-image"
            size="sm"
            marginRight="8"
            name={userData.firstName}
          />
        </RouterLink>
      </HStack>
    </Flex>
  );
};

export { Navbar };
