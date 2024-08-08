"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setImages } from '@/store/slices/formSlice';
import Header from './Header';
import Footer from './Footer';
import { FiUpload, FiX } from 'react-icons/fi';
import Image from 'next/image';

interface ImageType {
  file: File;
  preview: string;
}

const PhotosStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const imagesFromState = useSelector((state: RootState) => state.form.images);
  const [images, setImagesState] = useState<ImageType[]>(imagesFromState);
  const minNumber = 5;
  const maxNumber = 10;

  useEffect(() => {
    dispatch(setImages(images));
  }, [images, dispatch]);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    
    const filteredFiles = files.filter(file => validExtensions.includes(file.type));
    if (filteredFiles.length !== files.length) {
      alert('Only JPG, JPEG, and PNG files are allowed.');
      return;
    }

    if (filteredFiles.length + images.length > maxNumber) {
      alert(`You can upload a maximum of ${maxNumber} images.`);
      return;
    }

    const newImages: ImageType[] = filteredFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImagesState([...images, ...newImages]);
  };

  const handleRemoveAll = () => {
    setImagesState([]);
  };

  const handleRemove = (index: number) => {
    setImagesState(images.filter((_, i) => i !== index));
  };

  const isComplete = images.length >= minNumber;

  return (
    <div className="flex flex-col h-screen bg-zinc-200">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
      <main className="flex-grow overflow-y-auto mt-24 mb-[80px]"> {/* Adjust mt and mb based on your Header and Footer heights */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Showcase Your Property</h1>
            <p className="mb-6 text-gray-600">Upload 5-10 high-quality photos to make your listing stand out.</p>
            
            <div className="upload__image-wrapper">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-blue-500 transition-colors duration-300">
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  id="upload-input"
                  onChange={handleFilesChange}
                />
                <label htmlFor="upload-input" className="flex flex-col items-center cursor-pointer">
                  <FiUpload className="text-4xl text-[#DE3151] mb-2" />
                  <span className="text-[#DE3151] font-semibold">Click or Drop Images Here</span>
                  <span className="text-gray-500 text-sm mt-2">Drag and drop images or click to select files</span>
                </label>
              </div>
              
              {images.length > 0 && (
                <div className="mb-6 flex justify-between items-center">
                  <span className="text-gray-600">
                    {images.length} of {maxNumber} photos uploaded
                  </span>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    onClick={handleRemoveAll}
                  >
                    Remove All Images
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image src={image.preview} width={50} height={50} alt={`Property Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
                        onClick={() => handleRemove(index)}
                      >
                        <FiX className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer 
          onBack={onBack} 
          onNext={onNext} 
          isNextDisabled={!isComplete}
        />
      </div>
    </div>
  );
};

export default PhotosStep;