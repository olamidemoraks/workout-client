import Layout from "@/components/Layout/Layout";
import ExerciseDisplay from "@/components/Workout/ExerciseDisplay";
import React from "react";

type pageProps = {
  params: { id: string };
};

const Page: React.FC<pageProps> = ({ params: { id } }) => {
  return (
    <Layout>
      <div className="mx-auto w-full">
        <ExerciseDisplay id={id} />
      </div>
    </Layout>
  );
};
export default Page;
