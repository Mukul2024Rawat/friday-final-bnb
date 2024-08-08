import React from "react";
import {
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { PaginationItemProps } from "@/types/standardSearch";

const PaginationItems = ({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationItemProps) => {
  const renderPaginationItems = () => {
    const items = [];
    const adjacentPages = 1;

    let startPage = Math.max(currentPage - adjacentPages, 1);
    let endPage = Math.min(currentPage + adjacentPages, totalPages);

    if (currentPage > 2) {
      items.push(
        <PaginationItem key="first-page">
          <PaginationLink
            isActive={1 === currentPage}
            onClick={() => handlePageChange(1)}
            className="px-[5px] rounded-full w-[34px] h-[34px] cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => handlePageChange(i)}
            className="px-[5px] rounded-full w-[34px] h-[34px] cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 1) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="last-page">
          <PaginationLink
            isActive={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
            className="px-[5px] rounded-full w-[34px] h-[34px] cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return <>{renderPaginationItems()}</>;
};

export default PaginationItems;
