import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import ProductDashboard from "@/components/product-dashboard";
import ProfileDashboard from "@/components/profile-dashboard";
import BillClient from "@/components/bill-client";
import BillOwner from "@/components/bill-owner";
import {
  onRequestProductListSubmit,
  onGettingAllBills,
  onGettingAllBillsOwner,
} from "@/libs/engines/productEngine";
import { onFetchingUserProfile } from "@/libs/engines/userEngine";
import { useAuth } from "@/libs/firebase/auth";

export async function getServerSideProps(context) {
  const { req } = context;
  const { cookies } = req;

  const { name } = context.query;

  let res = await onRequestProductListSubmit(cookies);
  let profile = await onFetchingUserProfile(cookies);
  let client_bill = await onGettingAllBills(cookies);
  let owner_bill = await onGettingAllBillsOwner(cookies);

  if (res.message || profile.message) {
    res = 401;
    profile = 401;
  }

  return { props: { name, res, profile, client_bill, owner_bill } };
}

export default function UserProfile({
  name,
  res,
  profile,
  client_bill,
  owner_bill,
}) {
  const [afterFetching, setAfterFetching] = useState(false);

  const { signout, user } = useAuth();
  const router = useRouter();

  if (user && profile && res && !afterFetching) {
    if (name != user.name) {
      router.push(`/user/${user.name}`);
    } else {
      setAfterFetching(true);
    }
  }

  if ((res == 401 || profile == 401) && !afterFetching) {
    setAfterFetching(true);
  }

  useEffect(() => {
    if (res == 401 || profile == 401) {
      signout("/");
      router.push("/");
    }
  }, [afterFetching]);

  return (
    <>
      {afterFetching && user ? (
        <Layout title={`${name}`}>
          <Flex flexDirection="column">
            <Center
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              h="70vh"
              maxW="container.lg"
              mt={{ base: "16rem", md: "2rem" }}
            >
              <ProfileDashboard
                username={profile.username}
                email={profile.email}
                real_name={profile.real_name}
                province={profile.province}
                district={profile.district}
                ward={profile.ward}
                url={user.photoUrl}
                phoneNumber={profile.phone_number}
                detailAddress={profile.detail_address}
              />
              <ProductDashboard products={res} />
            </Center>
            <Flex
              mt={{ base: "20em", md: "0rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box>
                <Heading>Bill:</Heading>
                <>
                  {client_bill.message ? (
                    <Text>{"Currently empty."}</Text>
                  ) : (
                    <BillClient bills={client_bill} />
                  )}
                </>
              </Box>
              <Box ml={{ base: "0rem", md: "3rem" }}>
                <Heading>Client:</Heading>
                <>
                  {owner_bill.message ? (
                    <Text>{"You don't have any order currently."}</Text>
                  ) : (
                    <BillOwner bills={owner_bill} />
                  )}
                </>
              </Box>
            </Flex>
          </Flex>
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
