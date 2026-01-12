'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useRef, useState } from 'react';
import { PAGE_CONFIG } from '@/utils/constants';
import { PageBreakExtension } from '@/extensions/PageBreakExtension';

export default function Editor() {
  const [pageCount, setPageCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Typography,
      Placeholder.configure({
        placeholder: 'Start typing your document…',
      }),
      PageBreakExtension,
    ],
    content: `
      <p>This editor demonstrates real-time pagination.</p>
      <p>Content flows across pages as you type, similar to Word or Google Docs.</p>
    `,
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none',
      },
    },
    onUpdate: () => {
      requestAnimationFrame(updatePageCount);
    },
  });

  const updatePageCount = () => {
    const editorEl = containerRef.current?.querySelector('.ProseMirror');
    if (!editorEl) return;

    const totalHeight = editorEl.scrollHeight;
    const pages = Math.max(
      1,
      Math.ceil(totalHeight / PAGE_CONFIG.HEIGHT_PX)
    );

    setPageCount(pages);
  };

  useEffect(() => {
    if (editor) updatePageCount();
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Toolbar */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            H1
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            H2
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            H3
          </button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            Bullet List
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            Numbered List
          </button>

          <div className="ml-auto flex items-center gap-4">
            <button onClick={() => window.print()}>Print</button>
            <span className="text-sm text-gray-600">
              Pages: {pageCount}
            </span>
          </div>
        </div>
      </div>

            {/* Editor Container - Single continuous page with decorations */}
            <div className="pages-wrapper bg-gradient-to-br from-gray-200 to-gray-300 min-h-screen py-16">
                <div
                    className="editor-container mx-auto bg-white shadow-2xl"
                    style={{
                        width: `${PAGE_CONFIG.WIDTH_PX}px`,
                        minHeight: `${PAGE_CONFIG.HEIGHT_PX}px`,
                        padding: `${PAGE_CONFIG.MARGIN_PX}px`,
                    }}
                    ref={containerRef}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
