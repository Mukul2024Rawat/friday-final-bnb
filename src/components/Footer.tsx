import React from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mb-[4.5rem] md:mb-0 relative bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Safety information
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Cancellation options
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Our COVID-19 Response
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Supporting people with disabilities
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:underline">
                  Report a neighborhood concern
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Airnb.org: disaster relief housing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Support: Afghan refugees
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Celebrating diversity & belonging
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:underline">
                  Combating discrimination
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hosting</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Try hosting
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  AirCover: protection for Hosts
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Explore hosting resources
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Visit our community forum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:underline">
                  How to host responsibly
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Newsroom
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Learn about new features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Letter from our founders
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:underline">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:underline">
                  Airnb Luxe
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-gray-600 text-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>
              © {new Date().getFullYear()} Airnb, Inc. ·{" "}
              <a href="#" className="hover:underline">
                Privacy
              </a>{" "}
              ·{" "}
              <a href="#" className="hover:underline">
                Terms
              </a>{" "}
              ·{" "}
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </p>
            <div className="flex mt-4 sm:mt-0">
              <a href="#" className="hover:underline mr-4">
                English (US)
              </a>
              <a href="#" className="hover:underline mr-4">
                $ USD
              </a>
              <a href="#" className="hover:underline mr-4">
                <IoLogoFacebook />
              </a>
              <a href="#" className="hover:underline mr-4">
                <FaTwitter />
              </a>
              <a href="#" className="hover:underline">
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
