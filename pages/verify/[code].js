import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import { fetcherVerification } from "@/libs/engines/fetcher";
import { useAuth } from "@/libs/firebase/auth";

const Verify = () => {
  const [isFetching, setFetching] = useState(true);
  const router = useRouter();
  const { afterFetchingCsrf } = useAuth();

  async function fetchingVerification() {
    const { code } = router.query;
    const res = await fetcherVerification(code);
    console.log(res);

    setFetching(false);
  }

  if (afterFetchingCsrf) {
    fetchingVerification();
  }

  return (
    <>
      {isFetching ? (
        <Layout title="Verify page">
          <Loading />
        </Layout>
      ) : (
        <Layout title="Verify page"></Layout>
      )}
    </>
  );
};

export default Verify;
