import { Box } from "@chakra-ui/react";
import { Navbar } from "components";
import React from "react";
import { useDocumentTitle } from "utils/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("Home");
  return (
    <Box>
      <Navbar />
    </Box>
  );
};

export { HomePage };
