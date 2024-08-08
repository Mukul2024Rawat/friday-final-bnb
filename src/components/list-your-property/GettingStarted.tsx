"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from './Header';

const GettingStarted = ({ onNext }: { onNext: () => void }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-zinc-200">
     <Header />
      <main className="flex-grow  mx-auto px-4 py-16 max-w-4xl mt-[73px]">
        <h1 className="text-4xl font-bold mb-8 text-center">It&apos;s easy to get started on Air Nb</h1>
        <div className="space-y-12">
          <StepItem
            number={1}
            title="Tell us about your place"
            description="Share some basic info, such as where it is and how many guests can stay."
            imageSrc='/propertyDetail/2561454.webp'
          />
          <StepItem
            number={2}
            title="Make it stand out"
            description="Add 5 or more photos plus a title and description – we&apos;ll help you out."
            imageSrc='/propertyDetail/camera.jpeg'
          />
          <StepItem
            number={3}
            title="Finish up and publish"
            description="Choose if you&apos;d like to start with an experienced guest, set a starting price and publish your listing."
            imageSrc="/propertyDetail/publish.png"
          />
        </div>
      </main>
      <footer className="mt-auto bg-white border-t">
        <div className="px-4 py-4 flex justify-end">
          <button
            className="bg-[#DE3151] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#dd2e57] transition-colors shadow-md text-lg"
            onClick={onNext}
          >
            Get started
          </button>
        </div>
      </footer>
    </div>
  );
}

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
}

function StepItem({ number, title, description, imageSrc }: StepItemProps) {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex-shrink-0 w-10 h-10 bg-[#DE3151] rounded-full flex items-center justify-center">
        <span className="font-bold text-xl text-white">{number}</span>
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex-shrink-0">
        <Image src={imageSrc} alt={title} width={60} height={60} className="rounded-lg shadow-sm" />
      </div>
    </div>
  );
}

export default GettingStarted;