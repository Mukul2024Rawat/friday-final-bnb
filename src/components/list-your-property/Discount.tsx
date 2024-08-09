"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPrice } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const DiscountStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const priceFromState = useSelector((state: RootState) => state.form.price);
  const [dailyDiscount, setDailyDiscount] = useState<number>(priceFromState.daily_discount ?? 0);
  const [weeklyDiscount, setWeeklyDiscount] = useState<number>(priceFromState.weekly_discount ?? 0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setDailyDiscount(priceFromState.daily_discount ?? 0);
    setWeeklyDiscount(priceFromState.weekly_discount ?? 0);
  }, [priceFromState]);

  const handleDiscountChange = (setter: React.Dispatch<React.SetStateAction<number>>, otherValue: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setter(value);
      if (setter === setWeeklyDiscount && value < otherValue) {
        setError("Weekly discount cannot be less than daily discount");
      } else if (setter === setDailyDiscount && value > otherValue) {
        setError("Weekly discount cannot be less than daily discount");
      } else {
        setError("");
      }
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '0') {
      event.target.value = '';
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      event.target.value = '0';
    }
  };

  const handleNext = () => {
    if (weeklyDiscount < dailyDiscount) {
      setError("Weekly discount cannot be less than daily discount");
      return;
    }
    dispatch(setPrice({
      ...priceFromState,
      daily_discount: dailyDiscount,
      weekly_discount: weeklyDiscount
    }));
    onNext();
  };

  const isComplete = !isNaN(dailyDiscount) && !isNaN(weeklyDiscount) && weeklyDiscount >= dailyDiscount;

  return (
    <div className="flex flex-col h-screen bg-zinc-200">
      <Header />
      <main className="flex-grow p-24 mt-[73px]">
        <div className="max-w-xl mx-auto w-full space-y-8 p-8 bg-white rounded-lg shadow-2xl">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Set your discounts
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Offer discounts to guests for longer stays.
            </p>
          </div>
          <div>
            <label
              htmlFor="daily-discount"
              className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-600"
            >
              Daily Discount (%)
            </label>
            <input
              type="number"
              name="daily-discount"
              id="daily-discount"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm"
              placeholder="Enter daily discount"
              value={dailyDiscount}
              onChange={handleDiscountChange(setDailyDiscount, weeklyDiscount)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor="weekly-discount"
              className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-600"
            >
              Weekly Discount (%)
            </label>
            <input
              type="number"
              name="weekly-discount"
              id="weekly-discount"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm"
              placeholder="Enter weekly discount"
              value={weeklyDiscount}
              onChange={handleDiscountChange(setWeeklyDiscount, dailyDiscount)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              min="0"
              max="100"
              step="0.1"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      </main>
      <Footer
        onBack={onBack}
        onNext={handleNext}
        isNextDisabled={!isComplete}
      />
    </div>
  );
};

export default DiscountStep;