import Image from 'next/image';

const FlexibleSection = () => {
  return (
    <section className="relative w-full lg:h-svh h-[500px] md:h-[600px] bg-black">
      <div className="absolute inset-0 overflow-hidden rounded-lg mx-4 sm:mx-8 md:mx-10 mb-8 sm:mb-12 md:mb-20">
        <Image
          src="/start.jpeg" 
          alt="Flexible Destination"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
            Not sure where to go? Perfect.
          </h2>
          <button className="bg-white text-purple-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl shadow-md hover:shadow-lg transition">
            I&apos;m flexible
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlexibleSection;
