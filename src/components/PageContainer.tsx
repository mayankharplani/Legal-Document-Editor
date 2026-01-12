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
    showPageNumber = true
}: PageContainerProps) {
    return (
        <div
            className="page-container bg-white shadow-lg mx-auto relative"
            style={{
                width: `${PAGE_CONFIG.WIDTH_PX}px`,
                minHeight: `${PAGE_CONFIG.HEIGHT_PX}px`,
                marginBottom: `${PAGE_BREAK.GAP_PX}px`,
                boxShadow: PAGE_BREAK.SHADOW,
            }}
        >
            {/* Content area with margins */}
            <div
                className="page-content"
                style={{
                    padding: `${PAGE_CONFIG.MARGIN_PX}px`,
                    minHeight: `${PAGE_CONFIG.HEIGHT_PX}px`,
                }}
            >
                {children}
            </div>

            {/* Page number */}
            {showPageNumber && (
                <div
                    className="absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500"
                    style={{
                        fontSize: '12px',
                    }}
                >
                    {pageNumber}
                </div>
            )}
        </div>
    );
}
