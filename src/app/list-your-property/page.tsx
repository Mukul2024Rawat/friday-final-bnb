"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';



import GettingStarted from '@/components/list-your-property/GettingStarted';
const LocationStep = dynamic(() => import("@/components/list-your-property/Location"), {
  ssr: false,
});
import FloorPlanStep from '@/components/list-your-property/FloorPlan';
import AmenitiesStep from '@/components/list-your-property/Amenities';
import PhotosStep from '@/components/list-your-property/Photos';
import TitleStep from '@/components/list-your-property/Title';
import SubTitleStep from '@/components/list-your-property/SubTitle';
import DescriptionStep from '@/components/list-your-property/Description';
import PriceStep from '@/components/list-your-property/Price';
import DiscountStep from '@/components/list-your-property/Discount';
import TaxesStep from '@/components/list-your-property/Taxes';
import HostRulesStep from '@/components/list-your-property/HostRules';
import ReviewStep from '@/components/list-your-property/Preview';
import dynamic from 'next/dynamic';
import WithAuth from '@/components/withAuth';

const BecomeAHost = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

 

  const steps = [
    <GettingStarted key="gettingStarted" onNext={nextStep} />,
    <LocationStep key="location" onNext={nextStep} onBack={prevStep} />,
    <FloorPlanStep key="floorPlan" onNext={nextStep} onBack={prevStep} />,
    <AmenitiesStep key="amenities" onNext={nextStep} onBack={prevStep} />,
    <PhotosStep key="photos" onNext={nextStep} onBack={prevStep} />,
    <TitleStep key="title" onNext={nextStep} onBack={prevStep} />,
    <SubTitleStep key="subTitle" onNext={nextStep} onBack={prevStep} />,
    <DescriptionStep key="description" onNext={nextStep} onBack={prevStep} />,
    <PriceStep key="price" onNext={nextStep} onBack={prevStep} />,
    <DiscountStep key="discount" onNext={nextStep} onBack={prevStep} />,
    <TaxesStep key="taxes" onNext={nextStep} onBack={prevStep} />,
    <HostRulesStep key="hostRules" onNext={nextStep} onBack={prevStep} />,
    <ReviewStep key="review"  onBack={prevStep} />,
  ];

  return (
    <div className="bg-white">

      {steps[step]}
    
    </div>
  );
};

export default WithAuth(BecomeAHost);
