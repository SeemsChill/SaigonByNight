import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "./motions/logo.js";
import ThemeToggle from "./theme-toggle";
import Toggle from "./toggle";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "@/libs/firebase/auth";

const Navbar = ({ router }) => {
  const isHome = router.route === "/" ? true : false;
  const isSignIn = router.route === "/signin" ? true : false;
  const { user, signout } = useAuth();

  return (
    <Box
      position="fixed"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#20202380")}
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
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
        {isHome ? (
          <Box display="flex">
            <ThemeToggle />
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
          </Box>
        ) : (
          <>
            {isSignIn ? (
              <Toggle
                style={{ background: "black", color: "white" }}
                href="signup"
              >
                Sign up
              </Toggle>
            ) : (
              <>
                {user ? (
                  <Button colorScheme="teal" onClick={signout}>
                    Sign out
                  </Button>
                ) : (
                  <Toggle
                    style={{ background: "black", color: "white" }}
                    href="signin"
                  >
                    Sign in
                  </Toggle>
                )}
              </>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
