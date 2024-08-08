import React, { useState, useEffect } from "react";
import { ReviewCard } from "../guest/listing/Review";
import { ReviewData } from "@/types/property";
import { fetchReviews } from "@/api/property";
import { AiOutlineClose } from "react-icons/ai";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import PaginationItems from "../ui/paginationItems";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

const PropertyModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  propertyId,
}) => {
  const [reviews, setReviews] = useState<ReviewData>();
  const [isLoading, setIsLoading] = useState(true);

  // for pagiantion
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchGuestReviews();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, propertyId, currentPage]);

  const fetchGuestReviews = async () => {
    setIsLoading(true);
    try {
      const data = await fetchReviews(propertyId, currentPage);
      setReviews(data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const bodyContent = (
    <div className="overflow-y-auto flex flex-col pb-[10px] gap-1">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        reviews?.items?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      )}
    </div>
  );

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  flex-col ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl relative h-[60vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">All Reviews</h2>
        <div className="div overflow-y-auto h-[90%] no-scrollbar flex flex-col gap-1">
          {bodyContent}
          {totalPages > 1 && (
            <div className="pagination">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="pr-[8px] cursor-pointer"
                    />
                  )}
                  <PaginationItems
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                  {currentPage < totalPages && (
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="pl-[8px] cursor-pointer"
                    />
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default PropertyModal;
