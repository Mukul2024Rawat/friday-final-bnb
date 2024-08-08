import React from "react";
import { FaClock, FaDoorOpen, FaSmoking, FaUsers } from "react-icons/fa";
import { MdSecurity, MdOutlineCleaningServices } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { PropertyData, PropertyRule } from "@/types/property";

interface PropertyRulesProps {
  rules: PropertyRule;
  cancellation_days: number;
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minutes} ${ampm}`;
};

const PropertyRules: React.FC<PropertyRulesProps> = ({
  rules,
  cancellation_days,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Things to know</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-2">House rules</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-6">
                <FaClock className="mr-2" size={19} />
              </div>
              <div>Check-in: After {formatTime(rules.check_in_time)}</div>
            </li>
            <li className="flex items-center">
              <div className="w-6">
                <FaClock className="mr-2" size={19} />
              </div>
              <div>Checkout: {formatTime(rules.check_out_time)}</div>
            </li>
            {rules.self_check_in && (
              <li className="flex items-center">
                <div className="w-6">
                  <FaDoorOpen className="mr-2" size={19} />
                </div>
                <div>Self check-in with lockbox</div>
              </li>
            )}
            {rules.no_smoking && (
              <li className="flex items-center">
                <div className="w-6">
                  <FaSmoking className="mr-2" size={19} />
                </div>
                <div>No smoking</div>
              </li>
            )}
            {rules.no_parties_or_events && (
              <li className="flex items-center">
                <div className="w-6">
                  <FaUsers className="mr-2" size={19} />
                </div>
                <div>No parties or events</div>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Health & safety</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-6">
                <MdOutlineCleaningServices className="mr-2" size={19} />
              </div>
              <div>Committed to Airnb&apos;s enhanced cleaning process.</div>
            </li>
            <li className="flex items-center">
              <div className="w-6">
                <IoMdAlert className="mr-2" size={19} />
              </div>
              <div>
                Airnb&apos;s social-distancing and other COVID-19-related guidelines
                apply
              </div>
            </li>
            {rules.carbon_monoxide_alarm && (
              <li className="flex items-center">
                <div className="w-6">
                  <IoMdAlert className="mr-2" size={19} />
                </div>
                <div>Carbon monoxide alarm</div>
              </li>
            )}
            {rules.smoke_alarm && (
              <li className="flex items-center">
                <div className="w-6">
                  <IoMdAlert className="mr-2" size={19} />
                </div>
                <div>Smoke alarm</div>
              </li>
            )}
            <li className="flex items-center">
              <div className="w-6">
                <MdSecurity className="mr-2" size={19} />
              </div>
              <div>
                Security Deposit - if you damage the home, you may be charged up
                to ${rules.security_deposit}
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Cancellation policy</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              {
                (cancellation_days === 0)?<div>No cancellations are allowed for
                this property.</div>:<div>Free cancellation available up to {cancellation_days} days before check-in.</div>
              }
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyRules;
