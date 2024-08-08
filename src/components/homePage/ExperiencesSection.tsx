"use client";
import Image from "next/image";
import Button from "../Button";

const ExperiencesSection = () => {
  function handleClick() {}

  return (
    <section className="py-8 px-4 sm:px-8 md:px-12 lg:px-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
        Discover Airnb Experiences
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative rounded-md overflow-hidden sm:aspect-auto h-64 sm:h-auto">
          <Image
            height={600}
            width={800}
            src="/experiencesFirst.jpeg"
            alt="Trip Experience"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 left-0 p-4 sm:p-8 md:p-12 right-0 text-white flex flex-col">
            <span className="text-xl sm:text-2xl md:text-3xl">
              <h2>Things to do</h2>
              <h2>on your trip</h2>
            </span>
            <Button
              className="w-40 sm:w-48 px-2 sm:px-4 border-none rounded-md py-1 sm:py-2 mt-2"
              label="Experiences"
              onClick={handleClick}
              small
              outline
            />
          </div>
        </div>
        <div className="relative rounded-md overflow-hidden sm:aspect-auto h-64 sm:h-auto">
          <Image
            height={600}
            width={800}
            src="/experiencesSecond.jpeg"
            alt="Home Experience"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 left-0 p-4 sm:p-8 md:p-12 right-0 text-white flex flex-col">
            <span className="text-xl sm:text-2xl md:text-3xl">
              <h2>Things to do</h2>
              <h2>from home</h2>
            </span>
            <Button
              className="w-40 sm:w-48 px-2 sm:px-4 border-none rounded-md py-1 sm:py-2 mt-2"
              label="Online Experiences"
              onClick={handleClick}
              small
              outline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
