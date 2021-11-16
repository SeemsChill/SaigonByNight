import React from "react";
import { Heading } from "@chakra-ui/react";
import { fetcherVerification } from "@/libs/engines/fetcher";

const url = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/verification/`;

export async function getServerSideProps(context) {
  const { code } = context.query;
  const data = await fetcherVerification(url, code);

  return { props: { data } };
}

const Verify = ({ data }) => {
  console.log(data);

  return (
    <>
      <Heading>Veriy page</Heading>
    </>
  );
};

export default Verify;
