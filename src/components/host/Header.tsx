import React, { useEffect, useState } from 'react';
import { FaBars, FaBell, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { fetchUserProfilePhoto } from '@/api/index'; // Adjust the import path as needed
import { useRouter } from 'next/navigation';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
 const router= useRouter();
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const imageBlob = await fetchUserProfilePhoto();
        const blob = new Blob([imageBlob.data], { type: "image/jpeg" });
        // console.log(imageBlob);
        const imageUrl = URL.createObjectURL(blob);
        // console.log(imageUrl);
        setProfileImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    loadProfileImage();
  }, []);
  const handleRouteClick = () => {
    router.push('/user/profile');  
  };

  return (
    <header className="bg-white shadow-sm z-20">
      <div className="flex justify-between items-center px-10 py-3">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-600 mr-4 md:hidden">
            <FaBars size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Host Dashboard</h2>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="/list-your-property" passHref>
            <button className="flex items-center text-sm font-semibold text-black-600 hover:text-black-900 transition-colors duration-200">
              <FaPlus size={16} className="mr-1" />
              Add New Property
            </button>
          </Link>
          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <FaBell size={20} />
          </button>
        
            <div className="relative w-8 h-8 rounded-full overflow-hidden" onClick={handleRouteClick}>
              <Image
                src={ profileImageUrl || "/profile.jpg" }
                alt="User Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
               
              />
            </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;