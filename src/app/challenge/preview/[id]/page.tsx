import ChallengesPreview from "@/components/Challenges/ChallengesPreview";
import Layout from "@/components/Layout/Layout";
import React from "react";

type pageProps = {
  params: {
    id: string;
  };
};

const Page: React.FC<pageProps> = ({ params }) => {
  return (
    <Layout>
      <ChallengesPreview id={params.id} />
    </Layout>
  );
};
export default Page;
