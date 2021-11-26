import { ChakraProvider } from "@chakra-ui/react";
import { Heading, Center, Flex, Spacer, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
//@ts-ignore
import { auth$ } from "@todos/shared-state";

const PageHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth$.subscribe((data) => {
      const isLogged = data.sessionToken ? true : false;
      setIsLoggedIn(isLogged);
    });
  });

  return (
    <ChakraProvider>
      <Flex bg="tomato" color="white">
        <Box p="4">
          <Heading>Notes Taker</Heading>
        </Box>
        <Spacer />
        <Box p="4">
          {isLoggedIn ? <Button colorScheme="blue">LogOut</Button> : null}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: PageHeader,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
