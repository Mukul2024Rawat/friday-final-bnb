// components/BookingSection.tsx
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import GuestDropdownListing from "@/components/modals/guestListing/DropdownGuest";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { DateRange } from "react-day-picker";
import { useDispatch } from "react-redux";
import { setBookingRequestData } from "@/store/slices/Booking";
import { bookPropertyApi } from "@/api/property";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from "axios";
import { useGlobalModal } from "@/contexts/GlobalModalContext";
import PriceComponent from "./PriceComponent";

interface BookingSectionProps {
  property_tax: string;
  property_id: string;
  dateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  property_tax,
  property_id,
  dateRange,
  onDateChange,
}) => {
  const [toogle, setToogle] = useState(false);
  const [numNights, setNumNights] = useState(0);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { openLoginModal } = useGlobalModal();

  const propertyData = useSelector(
    (state: RootState) => state.bookingProperty.bookingRequestData
  );

  const infantsCount =useSelector(
    (state: RootState) => state?.bookingProperty?.guestCount?.Infants
  );


  const MemberCount = useSelector(
    (state: RootState) => state.bookingProperty.bookingRequestData.members
  );

  // const initialDateRange = {
  //   from: propertyData.checkin_date
  //     ? new Date(propertyData.checkin_date)
  //     : new Date(),
  //   to: propertyData.checkout_date
  //     ? new Date(propertyData.checkout_date)
  //     : addDays(new Date(), 7),
  // };

  function handleToggle() {
    setToogle(!toogle);
  }

  const handleDateChange = useCallback((range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const checkin_date = range.from.toISOString();
      const checkout_date = range.to.toISOString();

      dispatch(setBookingRequestData({ checkin_date, checkout_date }));

      const nights = Math.ceil(
        (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
      );
      setNumNights(nights);
    }
    onDateChange(range);
  }, []);

  const shouldGetWeekDiscount = numNights >= 5;

  
  const { totalAmount, cleaningFee, serviceFee, occupancyTaxes } =
    useMemo(() => {
      const {
        property_price,
        daily_discount,
        weekly_discount,
        cleaning_fee,
        service_fee,
      } = propertyData;

      let discount = 0;
      if (shouldGetWeekDiscount) {
        discount = (property_price * weekly_discount) / 100;
      } else {
        discount = (property_price * daily_discount * numNights) / 100;
      }

      const calculatedCleaningFee = (property_price * cleaning_fee) / 100;
      const calculatedServiceFee = (property_price * service_fee) / 100;
      const totalBeforeTax =
        property_price * numNights -
        discount +
        calculatedCleaningFee +
        calculatedServiceFee;

      const tax = (totalBeforeTax * parseFloat(property_tax)) / 100;
      const total = totalBeforeTax + tax;

      return {
        totalAmount: total,
        cleaningFee: calculatedCleaningFee,
        serviceFee: calculatedServiceFee,
        occupancyTaxes: tax,
      };
    }, [numNights, propertyData]);

  useEffect(() => {
    dispatch(setBookingRequestData({ total_amount: Number(totalAmount.toFixed(2)) }));
  }, [totalAmount]);

  // handle login modal
  const handleLoginModal = () => {
    openLoginModal();
  };

  //call api for reserve booking
  const bookProperty = async () => {
    const bookingData = {
      ...propertyData,
      booking_date: new Date().toISOString(),
    };
    try {
      const data = await bookPropertyApi({ bookingData, property_id });

       if (data && data.status === 201) {

        toast({
          title: "Success!",
          description: "Your booking was successful.",
          duration: 5000,
          className: "bg-green-600",
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });

      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast({
            variant: "destructive",
            description: "You need to log in to make a booking.",
            duration: 5000,
            action: (
              <ToastAction altText="Log in" onClick={handleLoginModal}>
                Log in
              </ToastAction>
            ),
          });
        } else if (error.response && error.response.status === 403) {
          const errorMessages = error.response.data.message
            .map((err: { property: string; message: string }) => err.message)
            .join(", ");

          toast({
            variant: "destructive",
            description: `${errorMessages}`,
            duration: 5000,
          });
        } 
        else if (error.response && error.response.status === 422) {
          const errorMessages = error.response.data.message
            .map((err: { property: string; message: string }) => err.message)
            .join(", ");

          toast({
            variant: "destructive",
            description: `${errorMessages}`,
            duration: 5000,
          });
        }else if (error.response && error.response.status === 500) {
          const errorMessages = error.response.data.message
            toast({
            variant: "destructive",
            description: `${errorMessages}`,
            duration: 5000,
          });
        }else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            duration: 5000,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    }
  };


  //price calculated array
  const priceBreakdownItems = [
    {
      label: `$${propertyData.property_price} x ${numNights} nights`,
      value: propertyData.property_price * numNights,
    },
    {
      label: shouldGetWeekDiscount ? 'Weekly discount' : 'Daily discount',
      value: `${(shouldGetWeekDiscount ? propertyData?.weekly_discount : propertyData?.daily_discount)?.toFixed(2)}%`,
      isDiscount: true,
    },
    { label: 'Cleaning fee', value: cleaningFee },
    { label: 'Service fee', value: serviceFee },
    { label: 'Occupancy taxes and fees', value: occupancyTaxes },
  ];

  return (
    <div className="border bg-white rounded-lg p-6 sticky top-[185px]">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">
          ${propertyData.property_price} / night
        </span>
      </div>
      <div className="border rounded-t-lg py-[10px] px-[14px]">
        <DateRangePicker
          onChange={handleDateChange}
          initialDateRange={dateRange}
          className="bg-white"
          numberdOfMonths={2}
          buttonBuilder={(date) => (
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-between text-left font-normal border border-gray-300 rounded-lg bg-transparent bg-white",
                !date && "text-muted-foreground"
              )}
            >
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500">CHECK-IN</span>
                {date?.from ? (
                  <span>{format(date.from, "MM/dd/yyyy")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
              <div className="line w-[2px] bg-gray-300 h-[100%]"></div>
              <div className="flex flex-col items-start ">
                <span className="text-xs text-gray-500">CHECKOUT</span>
                {date?.to ? (
                  <span>{format(date.to, "MM/dd/yyyy")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </Button>
          )}
        />
      </div>
      <div
        className="border rounded-b-lg mb-4 px-2 py-2 flex items-center justify-between relative cursor-pointer"
        onClick={handleToggle}
      >
        <div className="textPart flex flex-col">
          <p className="font-semibold">Guest </p>
          <p>{MemberCount} guests {(infantsCount !== 0 )&& <span>,{infantsCount} infants</span>}</p>
        </div>
        <div className="toggle">
          {toogle ? (
            <MdKeyboardArrowUp size={29} />
          ) : (
            <MdOutlineKeyboardArrowDown size={29} />
          )}
          {toogle && <GuestDropdownListing />}
        </div>
      </div>
      <button
        className="w-full bg-[#DE3151] text-white py-3 rounded-lg font-bold"
        onClick={bookProperty}
      >
        Reserve
      </button>
      <p className="text-center my-4">You won&apos;t be charged yet</p>
      <div className="priceContainer">
         <PriceComponent items={priceBreakdownItems} total={totalAmount} />
      </div>
    </div>
  );
};

export default BookingSection;
