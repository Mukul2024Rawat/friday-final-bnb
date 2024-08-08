import Image from "next/image";

const HostingSection = () => {
  return (
    <section className="relative w-full h-[680px] sm:h-[500px] md:h-[400px] lg:h-[680px]">
      <div className="absolute inset-0 overflow-hidden rounded-lg mb-8 mx-4 sm:mx-6 md:mx-8 lg:mx-12">
        <Image
          src="/questionsPage.jpeg"
          alt="Hosting"
          layout="fill"
          objectFit="cover"
          className="absolute bottom-24"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <h2>Questions</h2>
            <h2>about</h2>
            <h2>hosting?</h2>
          </div>
          <button className="bg-white text-black mt-8 sm:mt-10 md:mt-12 lg:mt-20 px-3 sm:px-4 py-2 rounded-lg">
            Ask a Superhost
          </button>
        </div>
      </div>
    </section>
  );
};

export default HostingSection;
