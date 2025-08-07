"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../../contexts/AuthContext";

import store from "../../app/store";

export function Provider(props: ColorModeProviderProps) {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider {...props}>
            <AuthProvider>{props.children}</AuthProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}
