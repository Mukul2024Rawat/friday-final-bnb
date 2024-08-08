import React from 'react';
import Image from 'next/image';
import { FaStar, FaCheckCircle, FaMedal } from 'react-icons/fa';

interface HostInfoProps {
  host: {
    id: number;
    name: string;
    email: string;
    phone: string;
    image_url: string | null;
    is_email_verified: boolean;
    created_at: string;
    updated_at: string;
  };
}

const HostInfo: React.FC<HostInfoProps> = ({ host }) => {
  // Static data (to be replaced later)
  const reviews = 12;
  const isSuperhost = true;
  const responseRate = 100;
  const responseTime = "within an hour";

  return (
    <div className="bg-white rounded-lg p-6 mb-8 ">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          {/* {host.image_url ? (
            <Image
              src={host.image_url}
              alt={host.name}
              width={64}
              height={64}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )} */}
          <Image
              src={"/profile.png"}
              alt='host profile'
              width={64}
              height={64}
              className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Hosted by {host.name}</h2>
          <p className="text-sm text-gray-600">Joined {new Date(host.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{reviews} Reviews</span>
        </div> */}
        {host.is_email_verified && (
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-1" />
            <span>Identity verified</span>
          </div>
        )}
        {isSuperhost && (
          <div className="flex items-center">
            <FaMedal className="text-red-500 mr-1" />
            <span>Superhost</span>
          </div>
        )}
      </div>

      {isSuperhost && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{host.name} is a Superhost</h3>
          <p className="text-sm text-gray-600">
            Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
          </p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm text-gray-600">Response rate: {responseRate}%</p>
        
      </div>

      {/* <button className="border border-black rounded-lg px-4 py-2 text-sm font-semibold">
        Contact Host
      </button> */}

      <div className="mt-4 flex items-center text-xs text-gray-500">
        <span className="mr-2">🛡️</span>
        <p>To protect your payment, never transfer money or communicate outside of the airnb website or app.</p>
      </div>
    </div>
  );
};

export default HostInfo;