// Page dimensions and constants for US Letter format
export const PAGE_CONFIG = {
    // US Letter dimensions at 96 DPI (standard web DPI)
    WIDTH_INCHES: 8.5,
    HEIGHT_INCHES: 11,
    DPI: 96,

    // Calculated pixel dimensions
    get WIDTH_PX() {
        return this.WIDTH_INCHES * this.DPI; // 816px
    },
    get HEIGHT_PX() {
        return this.HEIGHT_INCHES * this.DPI; // 1056px
    },

    // Margins (1 inch on all sides)
    MARGIN_INCHES: 1,
    get MARGIN_PX() {
        return this.MARGIN_INCHES * this.DPI; // 96px
    },

    // Content area (page minus margins)
    get CONTENT_WIDTH_PX() {
        return this.WIDTH_PX - (2 * this.MARGIN_PX); // 624px
    },
    get CONTENT_HEIGHT_PX() {
        return this.HEIGHT_PX - (2 * this.MARGIN_PX); // 864px
    },
} as const;

// Typography settings
export const TYPOGRAPHY = {
    BASE_FONT_SIZE: 16, // px
    LINE_HEIGHT: 1.5,
    HEADING_LINE_HEIGHTS: {
        h1: 1.2,
        h2: 1.3,
        h3: 1.4,
    },
} as const;

// Page break settings
export const PAGE_BREAK = {
    GAP_PX: 20, // Visual gap between pages
    SHADOW: '0 2px 8px rgba(0, 0, 0, 0.1)',
} as const;
