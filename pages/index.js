import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Center, Heading } from "@chakra-ui/react";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import MainPageProduct from "@/components/product-main";
import { onFetchingProductDashboard } from "@/libs/engines/mainpageEngine";
import { useAuth } from "@/libs/firebase/auth";

export async function getServerSideProps(context) {
  const { req } = context;
  const { cookies } = req;

  let res = await onFetchingProductDashboard(cookies);

  if (res.message) {
    res = 401;
  }

  return { props: { res } };
}

const Home = ({ res }) => {
  const [afterFetching, setAfterFetching] = useState(false);

  const { signout } = useAuth();
  const router = useRouter();

  if (res && !afterFetching) {
    setAfterFetching(true);
  }

  useEffect(() => {
    if (res == 401) {
      signout();
      router.push("/signin");
    }
  }, [afterFetching]);

  return (
    <Layout title="Dashboard">
      {afterFetching ? (
        <Box as="div" mt={5} w={{ base: "20rem", md: "container.lg" }}>
          <Heading>Product today!</Heading>
          <Center w="100%">
            <MainPageProduct res={res} />
          </Center>
        </Box>
      ) : (
        <Center>
          <Loading />
        </Center>
      )}
    </Layout>
  );
};

export default Home;
