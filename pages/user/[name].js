import React from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

const User = () => {
  const router = useRouter();
  const { name } = router.query;

  return <Heading>{name}</Heading>;
};

export default User;
