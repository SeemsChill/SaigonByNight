import React from "react";
import { Heading } from "@chakra-ui/react";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import { useAuth } from "@/libs/firebase/auth";

/*
async function getStaticProps(context) {
  const { uid } = context.query;
  const data = JSON.parse(uid);

  return { props: { data } };
}
*/

const User = () => {
  const { user, isFetching } = useAuth();

  return (
    <>
      {isFetching ? (
        <Layout title="Avatar">
          <Loading />
        </Layout>
      ) : (
        <Layout title={`${user.name}`}>
          <Heading>{user.name}</Heading>
        </Layout>
      )}
    </>
  );
};

export default User;
