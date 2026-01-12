'use client';

import React from 'react';
import { PAGE_CONFIG, PAGE_BREAK } from '@/utils/constants';

interface PageContainerProps {
  children: React.ReactNode;
  pageNumber: number;
  showPageNumber?: boolean;
}

export default function PageContainer({
  children,
  pageNumber,
  showPageNumber = true,
}: PageContainerProps) {
  return (
    <div
      className="relative mx-auto bg-white shadow-lg"
      style={{
        width: PAGE_CONFIG.WIDTH_PX,
        minHeight: PAGE_CONFIG.HEIGHT_PX,
        marginBottom: PAGE_BREAK.GAP_PX,
        boxShadow: PAGE_BREAK.SHADOW,
      }}
    >
      <div
        className="page-content"
        style={{
          padding: PAGE_CONFIG.MARGIN_PX,
          minHeight: PAGE_CONFIG.HEIGHT_PX,
        }}
      >
        {children}
      </div>

      {showPageNumber && (
        <div className="absolute bottom-6 inset-x-0 text-center text-xs text-gray-500">
          {pageNumber}
        </div>
      )}
    </div>
  );
}