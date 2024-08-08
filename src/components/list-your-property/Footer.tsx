// components/Footer.tsx
interface FooterProps {
    onBack: () => void;
    onNext: () => void;
    isNextDisabled: boolean;
  }
  
  const Footer = ({ onBack, onNext, isNextDisabled }: FooterProps) => {
    return (
      <footer className="bg-white border-t shadow-md px-6 py-2 z-10 fixed left-0 bottom-0 w-full">
        <div className="flex justify-between items-center ">
          <button
            className="font-semibold text-white bg-black px-6 py-3 rounded-lg tracking-wider"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className={`bg-[#DE3151] text-white px-6 py-3 rounded-lg font-semibold tracking-wider hover:bg-[#dd2e57] transition-colors ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isNextDisabled}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </footer>
    );
  };
  
  export default Footer;