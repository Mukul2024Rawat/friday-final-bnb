import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PropertyImage } from "@/types/property";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RiGalleryView2 } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        ></div>
        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle w-full max-w-4xl">
          <div className="flex justify-between p-4 border-b border-gray-200 flex-row-reverse cursor-pointer">
            <RxCross2 onClick={onClose} size={27} />
          </div>
          <div className="p-4 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface PropertyGalleryProps {
  images: PropertyImage[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="hidden md:block relative">
        <div className="grid grid-cols-4 gap-2 relative">
          {images.slice(0, 5).map((src, index) => (
            <div
              key={index}
              className={index === 0 ? "col-span-2 row-span-2" : ""}
            >
              <Image
                src={src.image}
                alt={`Property image ${index + 1}`}
                width={500}
                height={300}
                className="rounded-lg w-full h-full"
              />
            </div>
          ))}
          <button
            className="p-2 bg-white text-black rounded-lg mt-2 absolute right-2 bottom-2 text-[11px] flex items-center "
            onClick={() => setIsOpen(true)}
          >
            <RiGalleryView2 className="mr-1" size={16} />
            Show all photos
          </button>
        </div>
      </div>

      <div className="md:hidden flex justify-center items-center">
        <Carousel className="w-[80%]">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={src.image}
                    alt={`Property image ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="grid grid-cols-1 gap-2">
          {images.map((src, index) => (
            <div key={index}>
              <Image
                src={src.image}
                alt={`Property image ${index + 1}`}
                width={500}
                height={300}
                className="rounded-lg w-full h-full"
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PropertyGallery;
