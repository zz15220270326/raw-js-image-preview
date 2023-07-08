import { animateCssMap, classNameMap } from '../shared/configs';
import { ImagePreviewData, ToolBoxItem } from '../typings';

class TemplateInstance {
  /** 创建容器盒子 */
  public createImageContainer(children: string = ''): string {
    return `
      <div class="${classNameMap.container}" style="display: none;">
        ${children}
      </div>
    `;
  }

  /** 创建列表容器 */
  public createImagePreviewList(list: ImagePreviewData[]): string {
    const itemTpls: string = list.map(
      (item, index) => this.createImagePreviewItem(item, index)
    ).join('\n');

    return `
      <ul
        class="${classNameMap.containerList}"
      >
        ${this.createIndicator('left')}
        <div class="inner" style="width: ${
          // list.length * 100
          100
        }%;">
          ${itemTpls}
        </div>
        ${this.createIndicator('right')}
      </ul>
    `;
  }

  /** 创建每一个图片容器item */
  public createImagePreviewItem(item: ImagePreviewData, index?: number): string {
    const isItemShow: boolean = index === 0; // 一开始 currentIndex 写死为 0
    
    return `
      <li
        class="${classNameMap.containerListItem} ${animateCssMap.base} ${isItemShow ? classNameMap.itemShow : ''}"
        style="scale: 1; rotate: 0deg;"
        data-index="${index}"
      >
        <a
          class="${classNameMap.containerListItemLink}"
          class="" href="javascript:;"
        >
          <img class="${classNameMap.containerListItemImage}" alt="" title="" src="${item.src}" />
        </a>
      </li>
    `;
  }

  public createToolBox(list: ToolBoxItem[]): string {
    const itemsTpl: string = list.map(
      item => this.createToolBoxItem(item)
    ).join('\n');

    return `
      <footer class="${classNameMap.toolBox}">
        <ul class="inner">
          ${itemsTpl}
        </ul>
      </footer>
    `;
  }

  public createToolBoxItem(item: ToolBoxItem): string {
    const { id, name } = item;

    return `
      <li class="${classNameMap.toolBoxItem}" data-id="${id}">
        ${name}
      </li>
    `;
  }

  public createIndicator(dir: 'left' | 'right'): string {
    return `
      <button
        class="${classNameMap.indicator} ${dir}"
        data-dir="${dir === 'left' ? 'prev': 'next'}"
      >
        ${dir === 'left' ? '上一张' : '下一张'}
      </button>
    `;
  }

  public createDescBoard(item: ImagePreviewData): string {
    const { id, src, rotate, scale } = item;

    return `
      <div class="${classNameMap.descBoard}">
        ${
          this.createDescBoardItem(`ID: ${String(id)}`)
        }
        ${this.createDescBoardItem(`
          SRC: 
          <a href="${src}" target="_blank">
            图片 src
          </a>
        `)}
        ${
          this.createDescBoardItem(`当前比例: ${scale * 100}%`)
        }
        ${
          this.createDescBoardItem(`旋转角度: ${String(rotate)}°`)
        }
      </div>
    `;
  }

  public createDescBoardItem(inner: string) {
    return `
      <p class="${classNameMap.descBoardItem}">
        ${inner}
      </p>
    `;
  }
}

export default TemplateInstance;
