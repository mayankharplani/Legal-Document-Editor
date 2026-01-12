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
    const editorRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Typography,
            Placeholder.configure({
                placeholder: 'Start typing your document here...',
            }),
            PageBreakExtension,
        ],
        content: `<p>Welcome to the Tiptap Document Pagination Editor!</p><p>This editor demonstrates real-time pagination with visible page breaks. As you type, the content will automatically flow across multiple pages, just like in Microsoft Word or Google Docs.</p><p><strong>Try it out:</strong></p><ul><li>Type some content and watch pages appear</li><li>Use the toolbar to format text</li><li>Press Ctrl+P (or Cmd+P) to print and see WYSIWYG output</li></ul><p>Keep typing to see the page break appear automatically when content exceeds the first page...</p>`,
        editorProps: {
            attributes: {
                class: 'tiptap-editor focus:outline-none',
            },
        },
        onUpdate: () => {
            // Calculate page count based on editor height
            requestAnimationFrame(() => {
                if (editorRef.current) {
                    const editorElement = editorRef.current.querySelector('.ProseMirror');
                    if (editorElement) {
                        const totalHeight = editorElement.scrollHeight;
                        const pageHeight = PAGE_CONFIG.HEIGHT_PX;
                        const calculatedPages = Math.max(1, Math.ceil(totalHeight / pageHeight));
                        setPageCount(calculatedPages);
                    }
                }
            });
        },
    });

    useEffect(() => {
        if (editor && editorRef.current) {
            const editorElement = editorRef.current.querySelector('.ProseMirror');
            if (editorElement) {
                const totalHeight = editorElement.scrollHeight;
                const pageHeight = PAGE_CONFIG.HEIGHT_PX;
                const calculatedPages = Math.max(1, Math.ceil(totalHeight / pageHeight));
                setPageCount(calculatedPages);
            }
        }
    }, [editor]);

    if (!editor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Loading editor...</div>
            </div>
        );
    }

    return (
        <div className="editor-wrapper min-h-screen">
            {/* Toolbar */}
            <div className="toolbar sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Text formatting */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`px-4 py-2 rounded-md font-bold transition-all duration-200 ${editor.isActive('bold')
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Bold (Ctrl+B)"
                            >
                                B
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`px-4 py-2 rounded-md italic transition-all duration-200 ${editor.isActive('italic')
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Italic (Ctrl+I)"
                            >
                                I
                            </button>
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Headings */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={`px-4 py-2 rounded-md transition-all duration-200 ${editor.isActive('heading', { level: 1 })
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Heading 1"
                            >
                                H1
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={`px-4 py-2 rounded-md transition-all duration-200 ${editor.isActive('heading', { level: 2 })
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Heading 2"
                            >
                                H2
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                className={`px-4 py-2 rounded-md transition-all duration-200 ${editor.isActive('heading', { level: 3 })
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Heading 3"
                            >
                                H3
                            </button>
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Lists */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`px-4 py-2 rounded-md transition-all duration-200 ${editor.isActive('bulletList')
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Bullet List"
                            >
                                • List
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={`px-4 py-2 rounded-md transition-all duration-200 ${editor.isActive('orderedList')
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                title="Numbered List"
                            >
                                1. List
                            </button>
                        </div>

                        <div className="flex-1"></div>

                        {/* Print button */}
                        <button
                            onClick={() => window.print()}
                            className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 font-medium"
                            title="Print / Export PDF (Ctrl+P)"
                        >
                            🖨️ Print
                        </button>

                        {/* Page count */}
                        <div className="px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-md text-sm font-semibold text-blue-800">
                            Pages: <span className="text-blue-600 text-lg">{pageCount}</span>
                        </div>
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
                    ref={editorRef}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
