"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProperty } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const SubTitleStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.form.property);
  const [subtitle, setSubtitle] = useState<string>(property.subtitle || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSubtitle = event.target.value;
    if (newSubtitle.length <= 128) {
      setSubtitle(newSubtitle);
      dispatch(setProperty({ ...property, subtitle: newSubtitle }));
    }
  };
  const isComplete = subtitle.length > 0;
  return (
    <div className="flex flex-col h-screen bg-zinc-200">
      <Header />
      <main className="flex-grow p-24 mt-[73px]">
        <div className="max-w-xl mx-auto w-full space-y-8 p-8 bg-white rounded-lg shadow-2xl">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Now let&#39;s give your property a subtitle
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Provide a subtitle for your property. You can always change it later.
            </p>
          </div>
          <div>
            <input
              type="text"
              name="subtitle"
              id="property-subtitle"
              className="block w-full rounded-md p-4 border-2 break-words"
              placeholder="Enter your property subtitle"
              value={subtitle}
              onChange={handleInputChange}
            />
            <p className="mt-1 text-right text-sm text-gray-500">{subtitle.length}/128</p>
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default SubTitleStep;
