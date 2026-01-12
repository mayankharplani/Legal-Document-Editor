# Tiptap Document Pagination Editor

A production-ready, WYSIWYG rich text editor built with **Next.js**, **Tiptap**, and **Tailwind CSS** that features **real-time pagination** with visible page breaks. Designed specifically for legal document drafting where precise page layout is critical.


## 🎯 Features

### Core Functionality
- ✅ **Real-time Pagination**: Content automatically flows across multiple pages as you type
- ✅ **Visible Page Breaks**: Clear visual separation between pages with shadows and spacing
- ✅ **WYSIWYG Print Output**: Editor view matches print output 100%
- ✅ **US Letter Format**: Standard 8.5" × 11" page dimensions
- ✅ **1-inch Margins**: Enforced on all sides with visual margin guides
- ✅ **Rich Text Formatting**: Bold, italic, headings (H1-H3), bullet lists, numbered lists
- ✅ **Dynamic Page Count**: Real-time page counter in toolbar
- ✅ **Print/PDF Export**: Native browser print functionality (Ctrl+P / Cmd+P)

### Technical Highlights
- 🚀 Built with **Next.js 14+** App Router
- 🎨 Styled with **Tailwind CSS**
- ⚡ **Real-time content height calculation** using ResizeObserver and MutationObserver
- 📱 Responsive toolbar with active state indicators
- 🎯 TypeScript for type safety
- 🖨️ Print-optimized CSS for accurate PDF generation



## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mayankharplani/Legal-Document-Editor.git
cd tiptap-pagination-editor

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```


## 🏗️ Architecture & Pagination Logic

### How Pagination Works

The pagination system uses the **"Continuous Model with Decorations"** approach:

1. **Single Continuous Editor**: One Tiptap editor instance with content flowing naturally
2. **ProseMirror Decorations**: Visual page break elements inserted dynamically based on content height
3. **Real-time Height Measurement**: Plugin measures each block node's DOM height
4. **Automatic Page Breaks**: When accumulated height exceeds page capacity (864px), a decorative spacer is inserted

### Technical Implementation

```typescript
// Page dimensions calculation
const PAGE_CONFIG = {
  WIDTH_PX: 8.5 * 96 = 816px,    // US Letter width
  HEIGHT_PX: 11 * 96 = 1056px,    // US Letter height
  MARGIN_PX: 1 * 96 = 96px,       // 1-inch margins
  CONTENT_HEIGHT_PX: 864px,       // Available content area
};
```

### ProseMirror Decoration Plugin

The `PageBreakExtension` is a custom Tiptap extension that:

1. Traverses the document tree on every update
2. Uses `editorView.domAtPos()` to find actual DOM nodes
3. Measures each block element's `getBoundingClientRect().height`
4. Accumulates heights and inserts `Decoration.widget()` when threshold is exceeded
5. Creates visual page break elements with page numbers


### Why This Approach?

**Advantages:**
- ✅ Single editor instance - no complex content splitting
- ✅ Accurate height measurements using actual DOM
- ✅ Works with all Tiptap extensions
- ✅ Real-time updates with decorations
- ✅ Clean separation between content and presentation
- ✅ Easy to maintain and extend

**Trade-offs:**
- ⚠️ Decorations recalculate on every document change (mitigated with `requestAnimationFrame`)
- ⚠️ Content doesn't split mid-paragraph (uses CSS `break-inside: avoid`)
- ⚠️ Performance may degrade with 100+ pages (can be optimized with debouncing)


## 📋 Project Structure

```
tiptap-pagination-editor/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page rendering Editor
│   │   └── globals.css         # Global styles + print CSS
│   ├── components/
│   │   ├── Editor.tsx          # Main editor component
│   │   └── PageContainer.tsx   # Individual page container (unused in final)
│   └── utils/
│       └── constants.ts        # Page dimensions and constants
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```



### Why Tiptap?
- Modern, extensible, and well-maintained
- Built on ProseMirror (proven editor framework)
- Excellent TypeScript support
- Rich ecosystem of extensions

### Why Next.js?
- Server-side rendering for better SEO
- Excellent developer experience
- Built-in optimization
- Easy deployment to Vercel

### Why This Pagination Approach?
After researching various approaches (CSS Paged Media, PDF.js, custom splitting), the **overlay + height calculation** method provides the best balance of:
- Implementation simplicity
- Performance
- Accuracy
- Maintainability


## 🙏 Acknowledgments

- [Tiptap](https://tiptap.dev/) - Excellent editor framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

**Live Demo:** [Deploy to see live URL]
