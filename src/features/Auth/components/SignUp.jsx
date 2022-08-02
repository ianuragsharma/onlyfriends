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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { signupHandler } from "features";
import { useDocumentTitle } from "utils/useDocumentTitle";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFMdEmail = chakra(MdEmail);
const CDFaUserCircle = chakra(FaUserCircle);
const SignUp = () => {
  useDocumentTitle("Signup");
  const [showPassword, setShowPassword] = useBoolean();
  const [signupFromData, setSignupFromData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, username, email, password, confirmPassword } =
    signupFromData;
  const arePasswordsSame = password === confirmPassword;
  const fieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupFromData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { userData, isAuthLoading, authError, authToken } = useSelector(
    (state) => state.auth
  );
  const signup = (e) => {
    e.preventDefault();
    dispatch(signupHandler(signupFromData));
  };
  useEffect(() => {
    authToken && navigate("/home", { replace: true });
  }, [authToken]);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="red.400" />
        <Heading color="red.400">Signup to OnlyFriends!</Heading>
        <Box minW={{ base: "50%", md: "500px" }}>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  name="firstName"
                  onChange={fieldChangeHandler}
                />
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  name="lastName"
                  onChange={fieldChangeHandler}
                />
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFMdEmail color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="email address"
                  value={email}
                  name="email"
                  onChange={fieldChangeHandler}
                />
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CDFaUserCircle color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={fieldChangeHandler}
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
                  name="password"
                  onChange={fieldChangeHandler}
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
            </FormControl>
            <FormControl isInvalid={authError}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={fieldChangeHandler}
                />
              </InputGroup>
              {authError && <FormErrorMessage>{authError}</FormErrorMessage>}
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="red"
              width="full"
              onClick={(e) => signup(e)}
              disabled={!arePasswordsSame}
            >
              {isAuthLoading ? <Spinner color="red.100" /> : "Sign Up"}
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Flex>
        Already have an account?{" "}
        <Link to="/">
          <Text color="red">Login</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export { SignUp };
