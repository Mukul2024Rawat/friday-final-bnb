"use client";

import { NextPage } from "next";
import PropertyHeader from "../../../../components/guest/listing/PropertyHeader";
import PropertyGallery from "../../../../components/guest/listing/PropertyGallery";
import PropertyDetails from "../../../../components/guest/listing/PropertyDetails";
import BookingSection from "../../../../components/guest/listing/BookingSection";
import PropertyReviews from "../../../../components/guest/listing/PropertyReviews";
import PropertyLocation from "../../../../components/guest/listing/PropertyLocation";
import HostInfo from "../../../../components/guest/listing/HostingInfo";
import { samplePropertyDetails } from "../../../../utils/staticData";
import { useCallback, useEffect, useState } from "react";
import { fetchPropertyDetails } from "@/api/property";
import { useDispatch, useSelector } from "react-redux";
import { setBookingRequestData } from "@/store/slices/Booking";
import AmenitiesList from "@/components/guest/listing/AmenitiesList";
import dynamic from "next/dynamic";
import PropertyRules from "@/components/guest/listing/PropertyRules";
import DateRangeCom from "@/components/guest/listing/DateRangeCom";
import PropertyPageSkeleton from "@/components/guest/listing/PropertyPageSkeleton";
import Reviews from "@/components/guest/listing/Review";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { RootState } from "@/store/store";
import axios from "axios";
import Link from "next/link";
import NotAvailable from "@/components/guest/listing/NotAvailable";

const PropertyMap = dynamic(
  () => import("@/components/guest/listing/PropertyMap"),
  { ssr: false }
);

interface PropertyPageProps {
  params: { id: string };
}

const PropertyPage: NextPage<PropertyPageProps> = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState<any>(null);
  const dispatch = useDispatch();

  const propertyData = useSelector(
    (state: RootState) => state.bookingProperty.bookingRequestData
  );

  const initialDateRange = {
    from: propertyData.checkin_date
      ? new Date(propertyData.checkin_date)
      : new Date(),
    to: propertyData.checkout_date
      ? new Date(propertyData.checkout_date)
      : addDays(new Date(), 7),
  };

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange
  );

  useEffect(() => {
    const getPropertyDetails = async () => {
      try {
        const data = await fetchPropertyDetails(id);
        setPropertyDetail(data);
        dispatch(
          setBookingRequestData({
            property_price: parseFloat(data.property_price.price),
            daily_discount: parseFloat(data.property_price.daily_discount),
            weekly_discount: parseFloat(data.property_price.weekly_discount),
            cleaning_fee: parseFloat(data.property_price.cleaning_fee),
            service_fee: parseFloat(data.property_price.service_fee),
          })
        );
        setLoading(false);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error?.response?.data.statusCode === 404
        ) {
          setNotFoundError(true);
        } else {
          console.error(error);
        }
        setLoading(false);
      }
    };

    getPropertyDetails();
  }, [id, dispatch]);

  useEffect(() => {
    if (propertyDetail) {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }
  }, [propertyDetail]);

  const handleDateChange = useCallback(
    (range: DateRange | undefined) => {
      setDateRange(range);
      // if (range?.from) dispatch(setBookingRequestData({ checkin_date: range.from.toISOString() }));
      // if (range?.to) dispatch(setBookingRequestData({ checkout_date: range.to.toISOString() }));
    },
    [dispatch]
  );

  if (notFoundError) {
    return (
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-[100px] md:pt-[200px] mx-auto h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8 text-center">
          The property you are looking for does not exist or has been removed.
        </p>
        <Link href="/guest/property" className="text-rose-500 hover:underline">
          Go back to search page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-[100px] md:pt-[200px] mx-auto">
      {loading ? (
        <PropertyPageSkeleton />
      ) : (
        <>
          <PropertyHeader property={propertyDetail} />
          <PropertyGallery images={propertyDetail.property_images} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyDetails property={propertyDetail} />
              <div className="border-t border-gray-200 my-4"></div>
              <AmenitiesList
                propertyAmenities={propertyDetail.property_amenities}
              />
              <div className="border-t border-gray-200 my-4"></div>
              <DateRangeCom
                dateRange={dateRange}
                onDateChange={handleDateChange}
              />
              <div className="border-t border-gray-200 my-4"></div>
            </div>
            <div className="lg:col-span-1">
              {propertyDetail.is_available ? (
                <BookingSection
                  property_tax={propertyDetail.property_price.tax}
                  property_id={id}
                  dateRange={dateRange}
                  onDateChange={handleDateChange}
                />
              ) : (
                <NotAvailable />
              )}
            </div>
          </div>
          <div className="div ">
            {propertyDetail.reviews.length > 0 ? (
              <>
                <Reviews
                  reviews={propertyDetail.reviews}
                  propertyId={propertyDetail.id}
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4 mt-[30px] lg:mt-2">
                  Reviews
                </h2>
                <p className="text-gray-600">Currently no reviews available.</p>
              </>
            )}
            <div className="border-t border-gray-200 my-4"></div>
            <PropertyMap
              latitude={propertyDetail.property_address.latitude}
              longitude={propertyDetail.property_address.longitude}
              title={propertyDetail.title}
              property_address={propertyDetail.property_address}
            />
            <div className="border-t border-gray-200 my-4"></div>
            <HostInfo host={propertyDetail.host} />
            <div className="border-t border-gray-200 my-4"></div>
            <PropertyRules
              rules={propertyDetail.property_rules[0]}
              cancellation_days={propertyDetail.cancellation_days}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyPage;
