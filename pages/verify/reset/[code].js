import React from "react";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import { fetcherResetVerification } from "@/libs/engines/fetcher";

export async function getServerSideProps(context) {
  const { code } = context.query;

  const res = await fetcherResetVerification(code);

  return { props: { res } };
}

const Verify = ({ res }) => {
  console.log(res);

  return (
    <Layout title="Verify page">
      <Loading />
    </Layout>
  );
};

export default Verify;
