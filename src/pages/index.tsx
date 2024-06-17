import React from 'react';
import { GetServerSideProps } from 'next';
import { OnBoardingComponent } from "@/components";
import { fetchEntries } from '@/lib';
import { ContentulOnBoardingFieldsType } from '@/types';


const Home: React.FC<ContentulOnBoardingFieldsType> = ({ onBoardingScreens }) => {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <OnBoardingComponent onBoardingScreens={onBoardingScreens} />
    </main>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps<ContentulOnBoardingFieldsType> = async () => {
  const onBoardingScreens = await fetchEntries('onBoarding');
  return {
    props: {
      onBoardingScreens
    },
  };
};