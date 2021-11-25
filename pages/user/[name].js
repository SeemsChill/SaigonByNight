import React, { useState } from "react";
import { useRouter } from "next/router";
import { Center } from "@chakra-ui/react";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import ProductDashboard from "@/components/product-dashboard";
import ProfileDashboard from "@/components/profile-dashboard";
import { onRequestProductListSubmit } from "@/libs/engines/productEngine";
import { useAuth } from "@/libs/firebase/auth";

export async function getServerSideProps(context) {
  const { req } = context;
  const { cookies } = req;

  const { name } = context.query;

  const res = await onRequestProductListSubmit(cookies);

  return { props: { name, res } };
}

export default function UserProfile({ name, res }) {
  const [afterFetching, setAfterFetching] = useState(false);

  const { signout, user } = useAuth();
  const router = useRouter();

  if (user && res && !afterFetching) {
    if (name != user.name) {
      router.push(`/user/${user.name}`);
    } else {
      setAfterFetching(true);
    }
  }

  if (res.mess) {
    signout();
    return <></>;
  }

  return (
    <>
      {afterFetching && user ? (
        <Layout title={`${name}`}>
          <Center
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            h="70vh"
            maxW="container.lg"
            mt="2rem"
          >
            <ProfileDashboard name={user.name} url={user.photoUrl} />
            <ProductDashboard products={res} />
          </Center>
        </Layout>
      ) : (
        <Layout title="Loading">
          <Center h="70vh" maxW="container.lg" pt="2rem">
            <Loading />
          </Center>
        </Layout>
      )}
    </>
  );
}
