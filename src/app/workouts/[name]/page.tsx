import Layout from "@/components/Layout/Layout";
import RelatedWorkout from "@/components/Workout/RelatedWorkout";
import React from "react";

type pageProps = {
  params: {
    name: string;
  };
};

const page: React.FC<pageProps> = ({ params }) => {
  return (
    <>
      <Layout>
        <RelatedWorkout name={params.name} />
      </Layout>
    </>
  );
};
export default page;
