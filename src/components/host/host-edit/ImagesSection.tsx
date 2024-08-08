import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

interface Image {
  id: number;
  image: string;
}

interface ImagesProps {
  images: Image[];
  onImageUpload: (files: File[]) => void;
  onDeleteImage: (imageId: number) => void;
}

const ImagesSection: React.FC<ImagesProps> = ({
  images,
  onImageUpload,
  onDeleteImage,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => {
      previewImages.forEach(URL.revokeObjectURL);
    };
  }, [previewImages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowedFormats = ['image/jpeg', 'image/png'];
    const validFiles = files.filter(file => allowedFormats.includes(file.type));

    if (validFiles.length !== files.length) {
      alert('Only JPEG and PNG formats are allowed.');
    }

    const totalImages = images.length + selectedFiles.length + validFiles.length;
    if (totalImages > 10) {
      alert('You can upload a maximum of 10 images.');
      return;
    }

    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);

    // Create and set preview URLs
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);

    // Clear the file input
    e.target.value = '';
  };

  const handleUpload = () => {
    const totalImages = images.length + selectedFiles.length;
    if (totalImages < 5) {
      alert('You must upload at least 5 images in total.');
      return;
    }
    if (totalImages > 10) {
      alert('You can upload a maximum of 10 images.');
      return;
    }
    onImageUpload(selectedFiles);
    setSelectedFiles([]);
    setPreviewImages([]);
  };

  const handleDeletePreview = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const canDeleteExisting = images.length + selectedFiles.length > 5;

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Images</h3>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageSelect}
            multiple
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <MdAdd size={20} className="mr-2" />
            Add Images
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-w-16 aspect-h-9">
            <img
              src={image.image}
              alt={`Property Image ${image.id}`}
              className="object-cover rounded-lg shadow-md w-full h-full"
            />
            {canDeleteExisting && (
              <button
                onClick={() => onDeleteImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
              >
                <MdDelete size={20} />
              </button>
            )}
          </div>
        ))}
        
        {previewImages.map((preview, index) => (
          <div key={index} className="relative aspect-w-16 aspect-h-9">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="object-cover rounded-lg shadow-md w-full h-full"
            />
            <button
              onClick={() => handleDeletePreview(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ))}
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Upload {selectedFiles.length} Image{selectedFiles.length > 1 ? 's' : ''}
          </button>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600">
        {images.length + selectedFiles.length}/10 images selected. 
        Minimum 5, maximum 10 images allowed.
      </p>
    </div>
  );
};

export default ImagesSection;