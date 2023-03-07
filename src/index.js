import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//NextUI Interface Setup
import { NextUIProvider } from "@nextui-org/react";
//Dark Theme Setup
import { createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
//APP.js
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//Themes
const lightTheme = createTheme({
  type: "light"
});

const darkTheme = createTheme({
  type: "dark"
});

root.render(
  <StrictMode>
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </NextThemesProvider>
  </StrictMode>
);
