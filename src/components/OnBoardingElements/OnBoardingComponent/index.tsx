import { useState, useEffect, FC } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentulOnBoardingFieldsType } from '@/types';
import Image from "next/image";

export const OnBoardingComponent: FC<ContentulOnBoardingFieldsType> = ({ onBoardingScreens }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    setCurrentStep(savedStep ? Number(savedStep) : 0);
  }, []);

  useEffect(() => {
    if (currentStep !== null) {
      localStorage.setItem('currentStep', currentStep.toString());
    }
  }, [currentStep]);

  const sortOnBoardingScreens = onBoardingScreens
    .map((screen) => screen.fields)
    .sort((a: any, b: any) => {
      const stepA = parseInt(a.title.match(/Step-(\d+)/)[1]);
      const stepB = parseInt(b.title.match(/Step-(\d+)/)[1]);
      return stepA - stepB;
    });

  const handleNextStep = () => {
    if (currentStep !== null) {
      setCurrentStep((prevStep) => (prevStep + 1) % onBoardingScreens.length);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep !== null) {
      setCurrentStep((prevStep) => (prevStep - 1 + onBoardingScreens.length) % onBoardingScreens.length);
    }
  };

  if (currentStep === null) {
    // Render a loading state or nothing until currentStep is determined
    return null;
  }

  const currentScreen: any = sortOnBoardingScreens[currentStep];
  const totalSteps = onBoardingScreens.length;
  const progressWidth = currentStep > 0 
    ? (currentStep / (totalSteps - 1)) * 94 
    : 0;

  return (
    <div className="relative flex flex-col items-center bg-white rounded-lg p-4 w-full max-w-md mx-auto min-h-screen h-screen">
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
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
          <div className="flex-grow mx-4 flex justify-center">
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
      <div className="flex flex-col items-center justify-center flex-1 text-center mt-12">
        {currentScreen.img && (
          <Image
            src={currentScreen.img.fields.file.url}
            alt={currentScreen.img.fields.title}
            width={132}
            height={32}
            className="flex flex-col items-start gap-2"
          />
        )}
        <div>
          <h1 className="text-black font-bold text-4xl leading-snug">{currentScreen.title}</h1>
          <h2 className="text-black text-xl">{currentScreen.screenTitle}</h2>
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
