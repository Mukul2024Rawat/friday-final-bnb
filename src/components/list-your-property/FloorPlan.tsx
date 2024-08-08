import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProperty } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

interface FloorPlanStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface PropertyState {
  capacity?: number;
  is_available?: boolean;
  is_cancellable?: boolean;
  cancellation_days?: number;
}

const FloorPlanStep: React.FC<FloorPlanStepProps> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.form.property);

  const [guests, setGuests] = useState<number>(property.capacity || 1);
  const [isAvailable, setIsAvailable] = useState<boolean>(property.is_available ?? true);
  const [isCancellable, setIsCancellable] = useState<boolean>(property.is_cancellable ?? true);
  const [cancellationDays, setCancellationDays] = useState<number>(property.cancellation_days || 1);

  const DEFAULT_CANCELLATION_DAYS = 0;

  useEffect(() => {
    const updatedProperty: PropertyState = {
      capacity: guests,
      is_available: isAvailable,
      is_cancellable: isCancellable,
      cancellation_days: cancellationDays,
    };
    dispatch(setProperty(updatedProperty));
  }, [guests, isAvailable, isCancellable, cancellationDays, dispatch]);

  const handleGuestsChange = (change: number) => {
    const newGuests = Math.max(1, guests + change);
    setGuests(newGuests);
  };

  const handleIsAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(event.target.checked);
  };

  const handleIsCancellableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsCancellable(isChecked);

    if (!isChecked) {
      setCancellationDays(DEFAULT_CANCELLATION_DAYS);
    }
  };

  const handleCancellationDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const days = Math.max(1, Math.min(30, parseInt(event.target.value, 10) || 1));
    setCancellationDays(days);
  };

  const isComplete = guests > 0;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-200">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold mb-4">Share some basics about your place</h1>
          <p className="text-gray-600 mb-8">You&apos;ll add more details later</p>
          <div className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Guests</span>
              <div className="flex items-center space-x-4">
                <button
                  className="h-8 w-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => handleGuestsChange(-1)}
                  disabled={guests <= 1}
                >
                  -
                </button>
                <span className="text-xl font-semibold">{guests}</span>
                <button
                  className="h-8 w-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => handleGuestsChange(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is-available"
                className="mr-2 h-4 w-4 focus:ring border-gray-300 rounded"
                checked={isAvailable}
                onChange={handleIsAvailableChange}
              />
              <label htmlFor="is-available" className="text-sm font-medium text-gray-700">
                Available for booking
              </label>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is-cancellable"
                  className="mr-2 h-4 w-4 border-gray-300 rounded"
                  checked={isCancellable}
                  onChange={handleIsCancellableChange}
                />
                <label htmlFor="is-cancellable" className="text-sm font-medium text-gray-700">
                  Cancellable
                </label>
              </div>
              {isCancellable && (
                <div className="mt-2">
                  <label htmlFor="cancellation-days" className="text-sm font-medium text-gray-700">
                    Cancellation Days
                  </label>
                  <select
                    id="cancellation-days"
                    value={cancellationDays}
                    onChange={handleCancellationDaysChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default FloorPlanStep;