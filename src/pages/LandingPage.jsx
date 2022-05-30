import { Flex, Image } from "@chakra-ui/react";
import { Login, SignUp } from "features";
import React from "react";
import { useLocation } from "react-router-dom";
const LandingPage = () => {
  const location = useLocation();
  return (
    <Flex h="100vh" justifyContent="space-evenly">
      <Flex
        width="50vw"
        height="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        display={{ base: "none", md: "flex" }}
      >
        <Image
          src="/favicon.png"
          alt="brand logo"
          borderRadius="full"
          boxSize="400px"
        ></Image>
      </Flex>
      {location.pathname === "/signup" ? <SignUp /> : <Login />}
    </Flex>
  );
};

export { LandingPage };
