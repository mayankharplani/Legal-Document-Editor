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
          apply(tr, decorations) {
            const meta = tr.getMeta(PageBreakPluginKey);
            return meta ?? decorations.map(tr.mapping, tr.doc);
          },
        },

        view(editorView) {
          const maxPageHeight = PAGE_CONFIG.CONTENT_HEIGHT_PX;

          const updatePageBreaks = () => {
            const { doc } = editorView.state;
            const decorations: Decoration[] = [];

            let usedHeight = 0;
            const breakPositions: number[] = [];

            doc.descendants((node, pos) => {
              if (!node.isBlock || node.type.name === 'doc') return true;

              const dom = editorView.domAtPos(pos + 1).node;
              const element =
                dom instanceof HTMLElement ? dom : dom.parentElement;

              if (!element) return true;

              const height = element.getBoundingClientRect().height;

              if (usedHeight + height > maxPageHeight && usedHeight > 0) {
                breakPositions.push(pos);
                usedHeight = height;
              } else {
                usedHeight += height;
              }

              return true;
            });

            breakPositions.forEach((pos, index) => {
              decorations.push(
                Decoration.widget(
                  pos,
                  () => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'page-break-decoration';
                    wrapper.contentEditable = 'false';

                    wrapper.style.cssText = `
                      height: 1px;
                      margin: 40px -${PAGE_CONFIG.MARGIN_PX}px;
                      background: #d1d5db;
                      position: relative;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      page-break-after: always;
                      break-after: page;
                    `;

                    const label = document.createElement('div');
                    label.textContent = `Page ${index + 2}`;
                    label.style.cssText = `
                      background: white;
                      padding: 4px 12px;
                      border: 1px solid #d1d5db;
                      border-radius: 4px;
                      font-size: 11px;
                      color: #6b7280;
                      position: absolute;
                      top: 50%;
                      transform: translateY(-50%);
                      user-select: none;
                    `;

                    wrapper.appendChild(label);
                    return wrapper;
                  },
                  { side: -1, key: `page-break-${index}` }
                )
              );
            });

            const tr = editorView.state.tr;
            tr.setMeta(
              PageBreakPluginKey,
              DecorationSet.create(doc, decorations)
            );
            editorView.dispatch(tr);
          };

          // initial render
          setTimeout(updatePageBreaks, 200);

          return {
            update(view, prevState) {
              if (view.state.doc !== prevState.doc) {
                setTimeout(updatePageBreaks, 100);
              }
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