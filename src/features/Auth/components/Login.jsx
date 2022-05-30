import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  useBoolean,
  Text,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "features";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useBoolean();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { userData, isAuthLoading, authError, authToken } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    authToken && navigate("/home", { replace: true });
  }, [authToken]);

  const submitHandler = (e, isGuest) => {
    e.preventDefault();
    if (isGuest === "yasss_guest") {
      setUsername("ianuragsharma");
      setPassword("ianuragsharma123");
      dispatch(
        loginHandler({
          username: "ianuragsharma",
          password: "ianuragsharma123",
        })
      );
    } else {
      dispatch(loginHandler({ username, password }));
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="red.400" />

        <Heading color="red.400">Welcome to OnlyFriends!</Heading>
        <Box minW={{ base: "50%", md: "500px" }}>
          <Stack
            spacing={4}
            p="1rem"
            boxShadow="md"
            onSubmit={submitHandler}
            as="form"
          >
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={setShowPassword.toggle}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {authError && <FormErrorMessage>{authError}</FormErrorMessage>}
            </FormControl>
            <Button
              borderRadius={0}
              variant="solid"
              colorScheme="red"
              width="full"
              type="submt"
              onClick={(event) => submitHandler(event)}
            >
              {isAuthLoading ? <Spinner color="red.100" /> : "Login"}
            </Button>
            <Button
              borderRadius={0}
              variant="outline"
              colorScheme="red"
              width="full"
              type="submt"
              onClick={(event) => submitHandler(event, "yasss_guest")}
            >
              {isAuthLoading ? <Spinner color="red.100" /> : "Login as guest"}
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Flex>
        New to us?
        <Link to="/signup">
          <Text color="tomato"> Sign Up</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export { Login };
