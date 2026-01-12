// Page dimensions and constants for US Letter format
// Page layout constants (US Letter)
const DPI = 96;

// Page size
const PAGE_WIDTH_PX = 8.5 * DPI;   // 816px
const PAGE_HEIGHT_PX = 11 * DPI;   // 1056px

// Margins
const MARGIN_PX = 1 * DPI;         // 96px

export const PAGE_CONFIG = {
  WIDTH_PX: PAGE_WIDTH_PX,
  HEIGHT_PX: PAGE_HEIGHT_PX,
  MARGIN_PX,

  CONTENT_WIDTH_PX: PAGE_WIDTH_PX - MARGIN_PX * 2,   // 624px
  CONTENT_HEIGHT_PX: PAGE_HEIGHT_PX - MARGIN_PX * 2, // 864px
};

// Typography settings
export const TYPOGRAPHY = {
  FONT_SIZE: 16,
  LINE_HEIGHT: 1.5,
  HEADING_LINE_HEIGHT: {
    h1: 1.2,
    h2: 1.3,
    h3: 1.4,
  },
};

export const PAGE_BREAK = {
  GAP_PX: 20,
  SHADOW: '0 2px 8px rgba(0, 0, 0, 0.1)',
};
