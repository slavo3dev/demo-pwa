import { useState, FC } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentulOnBoardingFieldsType } from '@/types';
import Image from "next/image";


export const OnBoardingComponent: FC<ContentulOnBoardingFieldsType> = ({ onBoardingScreens }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const sortOnBoardingScreens = onBoardingScreens
    .map((screen) => screen.fields)
    .sort((a: any, b: any) => {
      const stepA = parseInt(a.title.match(/Step-(\d+)/)[1]);
      const stepB = parseInt(b.title.match(/Step-(\d+)/)[1]);
      return stepA - stepB;
    });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % onBoardingScreens.length);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + onBoardingScreens.length) % onBoardingScreens.length);
  };

    const currentScreen: any = sortOnBoardingScreens[ currentStep ];
    const totalSteps = onBoardingScreens.length;
    const progressWidth = ((currentStep - 1) / (totalSteps - 2)) * 94; 

  return (
    <div className="relative flex flex-col items-center bg-white rounded-lg p-4 w-full max-w-md mx-auto min-h-screen h-screen">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between w-full">
        {currentStep !== 0 && (
          <div
            onClick={handlePreviousStep}
            className="flex w-6 h-6 justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5M12 5l-7 7 7 7"
              />
            </svg>
          </div>
        )}
        {currentStep > 0 && (
          <div className="flex-grow mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="94"
              height="8"
              viewBox="0 0 94 8"
              fill="none"
              className="w-full"
            >
              <rect width="94" height="8" rx="4" fill="#F0F3F7"/>
              <rect width={progressWidth} height="8" rx="4" fill="#FF78D1"/>
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        {currentScreen.img && (
          <Image
            src={currentScreen.img.fields.file.url}
            alt={currentScreen.img.fields.title}
            width={129}
            height={39}
            className="flex flex-col items-start gap-2"
          />
        )}
        <div>
          <h1 className="text-black font-bold text-4xl leading-snug">{currentScreen.screenTitle}</h1>
          {currentScreen.description && (
            <div className="text-black text-base leading-6">
              {documentToReactComponents(currentScreen.description)}
            </div>
          )}
        </div>
      </div>
      {currentStep > 1 && (
        <button
          onClick={handleNextStep}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 h-14 px-8 flex justify-center items-center gap-2 rounded-full bg-black text-white"
        >
          {currentScreen.btnTitle || 'Next'}
        </button>
      )}
      {currentStep <= 1 && (
        <button
          onClick={handleNextStep}
          className="h-14 px-8 flex justify-center items-center gap-2 rounded-full bg-black text-white mb-4"
        >
          {currentScreen.btnTitle || 'Next'}
        </button>
      )}
    </div>
  );
};
