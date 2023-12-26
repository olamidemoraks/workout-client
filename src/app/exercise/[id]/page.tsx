import Exercise from "@/components/Exercise/Exercise";
import Layout from "@/components/Layout/Layout";
import React from "react";

type pageProps = {
  params: { id: string };
};

const Page: React.FC<pageProps> = ({ params: { id } }) => {
  return (
    <Layout>
      <div className="mx-auto w-full">
        <Exercise id={id} />
      </div>
    </Layout>
  );
};
export default Page;
