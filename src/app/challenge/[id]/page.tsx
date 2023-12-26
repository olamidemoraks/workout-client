import ChallengeView from "@/components/Challenges/ChallengeView";
import Layout from "@/components/Layout/Layout";
import React from "react";

type pageProps = {
  params: {
    id: string;
  };
};

const page: React.FC<pageProps> = ({ params }) => {
  return (
    <Layout>
      <ChallengeView id={params?.id} />
    </Layout>
  );
};
export default page;
