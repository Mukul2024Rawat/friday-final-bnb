"use client";
import { api } from "@/api/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPropertyId, resetForm } from "@/store/slices/formSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Header from "./Header";
import Image from "next/image";
import Loader from "@/components/modals/Loader";
import { toast } from "react-hot-toast";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface FieldProps {
  label: string;
  value: string | number | boolean;
}

const PreviewStep = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handlePublish = async () => {
    setIsLoading(true);
    setErrors([]);
    try {
      const propertyResponse = await api.post(
        "/property",
        {
          property: form.property,
          rules: form.rules,
          amenities: form.amenities,
          price: form.price,
          address: form.address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (propertyResponse.status === 200 || propertyResponse.status === 201) {
        const propertyId = propertyResponse.data.id;
        dispatch(setPropertyId(propertyId));
        const formData = new FormData();
        form.images.slice(0, 10).forEach((image) => {
          formData.append("image", image.file);
        });
        const imagesResponse = await api.post(
          `/property/${propertyId}/images`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (imagesResponse.status === 200 || imagesResponse.status === 201) {
          toast.success("Property details and Images published successfully!");
          dispatch(resetForm());
          router.push("/host-dashboard");
        } else {
          toast.error("Failed to upload images.");
        }
      } else {
        setErrors(["Failed to save property details."]);
      }
    } catch (error: any) {
      const errorMessages: string[] = [];

      if (Array.isArray(error?.response?.data?.message)) {
        error.response.data.message.forEach((msg: any) => {
          if (Array.isArray(msg)) {
            msg.forEach((subMsg: any) => errorMessages.push(subMsg.message));
          } else {
            errorMessages.push(msg.message);
          }
        });
      } else {
        errorMessages.push("Failed to submit property. Please try again.");
      }

      setErrors(errorMessages);
    }finally {
      setIsLoading(false);
    }
  };

  const Section: React.FC<SectionProps> = ({ title, children }) => (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );

  const Field: React.FC<FieldProps> = ({ label, value }) => (
    <div className="mb-2">
      <span className="font-semibold text-gray-700">{label}:</span>{" "}
      <span className="text-gray-600">{value.toString()}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-200">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Preview Your Listing
        </h1>

        {errors.length > 0 && (
          <div
            className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Property Details">
            <Field label="Title" value={form.property.title} />
            <Field label="Subtitle" value={form.property.subtitle} />
            <Field label="Description" value={form.property.description} />
            <Field label="Capacity" value={form.property.capacity} />
            <Field
              label="Availability"
              value={form.property.is_available ? "Yes" : "No"}
            />
            <Field
              label="Cancellation Policy"
              value={form.property.is_cancellable ? "Yes" : "No"}
            />
            <Field
              label="Cancellation Days"
              value={form.property.cancellation_days}
            />
          </Section>

          <Section title="Rules">
            <Field label="Check-in Time" value={form.rules.check_in_time} />
            <Field label="Check-out Time" value={form.rules.check_out_time} />
            <Field
              label="Self Check-in"
              value={form.rules.self_check_in ? "Yes" : "No"}
            />
            <Field
              label="No Smoking"
              value={form.rules.no_smoking ? "Yes" : "No"}
            />
            <Field
              label="No Parties or Events"
              value={form.rules.no_parties_or_events ? "Yes" : "No"}
            />
            <Field
              label="Carbon Monoxide Alarm"
              value={form.rules.carbon_monoxide_alarm ? "Yes" : "No"}
            />
            <Field
              label="Smoke Alarm"
              value={form.rules.smoke_alarm ? "Yes" : "No"}
            />
            <Field
              label="Security Deposit"
              value={form.rules.security_deposit}
            />
          </Section>

          <Section title="Amenities">
            <ul className="list-disc pl-5">
              {form.amenities.map((amenity) => (
                <li key={amenity.amenity_id} className="text-gray-600">
                  {amenity.name}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Price Details">
            <Field label="Price" value={`$${form.price.price}`} />
            <Field
              label="Daily Discount"
              value={`${form.price.daily_discount}%`}
            />
            <Field
              label="Weekly Discount"
              value={`${form.price.weekly_discount}%`}
            />
            <Field label="Cleaning Fee" value={`${form.price.cleaning_fee}%`} />
            <Field label="Service Fee" value={`${form.price.service_fee}%`} />
            <Field label="Tax" value={`${form.price.tax}%`} />
          </Section>

          <Section title="Address">
            <Field label="Country" value={form.address.country} />
            <Field label="State" value={form.address.state} />
            <Field label="City" value={form.address.city} />
            <Field label="Locality" value={form.address.locality} />
            <Field
              label="Nearest Landmark"
              value={form.address.nearest_landmark}
            />
            <Field label="Pincode" value={form.address.pincode} />
            <Field label="Latitude" value={form.address.latitude.toFixed(4)} />
            <Field
              label="Longitude"
              value={form.address.longitude.toFixed(4)}
            />
          </Section>
        </div>

        <Section title="Images">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {form.images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image.preview}
                  alt={`Property Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </Section>
        <footer className="bg-white border-t shadow-md px-6 py-2 z-10 fixed left-0 bottom-0 w-full">
          <div className="flex justify-between items-center ">
            <button
              onClick={onBack}
              className="font-semibold text-white bg-black px-6 py-3 rounded-lg tracking-wider"
            >
              Back
            </button>
            <button
              onClick={handlePublish}
              className="bg-[#DE3151] text-white px-6 py-3 rounded-lg font-semibold tracking-wider hover:bg-[#dd2e57] transition-colors duration-300 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </footer>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default PreviewStep;
