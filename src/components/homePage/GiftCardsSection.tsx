import Image from "next/image";

const GiftCardsSection = () => {
  return (
    <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-32">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col justify-center mt-4 lg:w-1/3 text-center lg:text-left">
          <div className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
            <h2>Shop Airnb</h2>
            <h2>gift cards</h2>
          </div>
          <button className="bg-black text-white px-4 py-2 w-40 rounded-lg mx-auto lg:mx-0">
            Learn more
          </button>
        </div>
        <div className="flex items-center justify-center mt-8 lg:mt-0 lg:w-2/3">
          <Image
            src="/giftCardSection.jpeg"
            alt="Gift Cards"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default GiftCardsSection;
