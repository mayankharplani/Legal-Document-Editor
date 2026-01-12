import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { PAGE_CONFIG } from '@/utils/constants';

export const PageBreakPluginKey = new PluginKey('pageBreak');

export const PageBreakExtension = Extension.create({
    name: 'pageBreak',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: PageBreakPluginKey,

                state: {
                    init() {
                        return DecorationSet.empty;
                    },
                    apply(tr, decorationSet) {
                        const meta = tr.getMeta(PageBreakPluginKey);
                        if (meta) {
                            return meta;
                        }
                        return decorationSet.map(tr.mapping, tr.doc);
                    },
                },

                view(editorView) {
                    const updateDecorations = () => {
                        const { state } = editorView;
                        const decorations: Decoration[] = [];
                        const { doc } = state;

                        let currentPageHeight = 0;
                        let pageNumber = 1;
                        // Use the actual content height that will be used in print
                        const maxPageHeight = PAGE_CONFIG.CONTENT_HEIGHT_PX;

                        // Get the editor container to measure from the top
                        const editorContainer = editorView.dom.closest('.editor-container') as HTMLElement;
                        const containerTop = editorContainer?.getBoundingClientRect().top || 0;

                        console.log('🔍 PageBreak Plugin: Calculating decorations...');
                        console.log('📏 Max page height:', maxPageHeight, 'px');
                        console.log('📍 Container top:', containerTop, 'px');

                        // Track positions for page breaks
                        const pageBreakPositions: number[] = [];
                        let accumulatedHeight = 0;

                        // First pass: calculate where page breaks should be
                        doc.descendants((node, pos) => {
                            if (!node.isBlock || node.type.name === 'doc') {
                                return true;
                            }

                            try {
                                const domAtPos = editorView.domAtPos(pos + 1);
                                let element: HTMLElement | null = null;

                                if (domAtPos.node.nodeType === Node.ELEMENT_NODE) {
                                    element = domAtPos.node as HTMLElement;
                                } else if (domAtPos.node.parentElement) {
                                    element = domAtPos.node.parentElement;
                                }

                                if (element) {
                                    const rect = element.getBoundingClientRect();
                                    const nodeHeight = rect.height;

                                    // Check if adding this node would exceed the page
                                    if (accumulatedHeight + nodeHeight > maxPageHeight && accumulatedHeight > 0) {
                                        console.log(`✂️ Page break needed at pos ${pos} (accumulated: ${accumulatedHeight}px, node: ${nodeHeight}px)`);
                                        pageBreakPositions.push(pos);
                                        accumulatedHeight = nodeHeight;
                                    } else {
                                        accumulatedHeight += nodeHeight;
                                    }
                                }
                            } catch (e) {
                                console.error('❌ Error measuring node:', e);
                            }

                            return true;
                        });

                        // Second pass: create decorations at the calculated positions
                        pageBreakPositions.forEach((pos, index) => {
                            const decoration = Decoration.widget(
                                pos,
                                () => {
                                    const pageBreak = document.createElement('div');
                                    pageBreak.className = 'page-break-decoration';
                                    pageBreak.contentEditable = 'false';
                                    pageBreak.setAttribute('data-page-number', String(index + 1));

                                    pageBreak.style.cssText = `
                    height: 1px;
                    margin: 40px -${PAGE_CONFIG.MARGIN_PX}px;
                    background: #d1d5db;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    user-select: none;
                    page-break-after: always;
                    break-after: page;
                  `;

                                    const pageLabel = document.createElement('div');
                                    pageLabel.textContent = `Page ${index + 2}`;
                                    pageLabel.style.cssText = `
                    background: white;
                    color: #6b7280;
                    padding: 4px 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                  `;
                                    pageBreak.appendChild(pageLabel);

                                    return pageBreak;
                                },
                                {
                                    side: -1,
                                    key: `page-break-${index}`,
                                }
                            );

                            decorations.push(decoration);
                        });

                        console.log(`✅ Total page breaks: ${pageBreakPositions.length}`);
                        console.log(`📊 Total pages: ${pageBreakPositions.length + 1}`);

                        // Apply decorations
                        const tr = editorView.state.tr;
                        tr.setMeta(PageBreakPluginKey, DecorationSet.create(doc, decorations));
                        editorView.dispatch(tr);
                    };

                    // Initial update
                    setTimeout(() => {
                        console.log('🚀 PageBreak Plugin: Initial decoration update');
                        updateDecorations();
                    }, 300);

                    return {
                        update(view, prevState) {
                            if (view.state.doc !== prevState.doc) {
                                console.log('📝 PageBreak Plugin: Document changed, updating decorations');
                                setTimeout(() => updateDecorations(), 100);
                            }
                        },
                        destroy() {
                            console.log('🛑 PageBreak Plugin: Destroyed');
                        },
                    };
                },

                props: {
                    decorations(state) {
                        return this.getState(state);
                    },
                },
            }),
        ];
    },
});
