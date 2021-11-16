import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Logo from "./motions/logo.js";
import ThemeToggle from "./theme-toggle";
import Toggle from "./toggle";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiLogIn, BiUserCircle } from "react-icons/bi";
import { useAuth } from "@/libs/firebase/auth";

const Navbar = () => {
  const { user, isLoading, signout } = useAuth();
  const { colorMode } = useColorMode();

  return (
    <Box
      position="fixed"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#20202380")}
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={2}
    >
      <Flex
        as="nav"
        maxW="container.lg"
        py="1rem"
        px="1.5rem"
        my="0"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Logo />
        <Box display="flex">
          <ThemeToggle />
          {user ? (
            <>
              <NextLink href={`/user/${user.name}`}>
                <Button
                  bg={colorMode == "light" ? "black" : "white"}
                  color={colorMode == "light" ? "white" : "black"}
                  ml={"0.5rem"}
                  transition="all 400ms ease-in-out"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  <BiUserCircle />
                </Button>
              </NextLink>

              <Button
                onClick={() => signout()}
                bg={colorMode == "light" ? "black" : "white"}
                color={colorMode == "light" ? "white" : "black"}
                ml={"0.5rem"}
                transition="all 400ms ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
              >
                <BiLogIn />
              </Button>
            </>
          ) : (
            <>
              {isLoading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="lg"
                />
              ) : (
                <>
                  <Box
                    ml={2}
                    display={{ base: "inline-block", md: "none", lg: "none" }}
                  >
                    <Menu isLazy id="navbar-menu">
                      <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        variant="outline"
                        aria-label="Options"
                      />
                      <MenuList>
                        <NextLink href="/signin" passHref>
                          <MenuItem as={Link}>Sign in</MenuItem>
                        </NextLink>
                        <NextLink href="/signup" passHref>
                          <MenuItem as={Link}>Sign up</MenuItem>
                        </NextLink>
                      </MenuList>
                    </Menu>
                  </Box>
                  <Container display={{ base: "none", md: "inline-block" }}>
                    <Toggle
                      style={{ background: "black", color: "white" }}
                      href="signin"
                    >
                      Sign in
                    </Toggle>
                    <Toggle
                      style={{ background: "white", color: "black" }}
                      href="signup"
                    >
                      Sign up
                    </Toggle>
                  </Container>
                </>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
