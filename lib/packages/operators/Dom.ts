import StateInstance from '../modules/State';
import ElementInstance from '../modules/Element';
import TemplateInstance from '../modules/Template';

import {
  getImgWidth,
  setStyle,
  setNextTick,
  copyString
} from '../shared/utils';
import { classNameMap, animateCssMap } from '../shared/configs';

class DomOperator {
  /**
   * 设置当前的整个 image-pewviewer 是否展示
   */
  public setContainerShow(
    elInstance: ElementInstance,
    isShow = true
  ) {
    const { $container } = elInstance.allNodes;

    setStyle($container, ['display', isShow ? '' : 'none']);
  }

  /**
   * 设置一下 preview-image 的信息
   */
  public async setImageInfo(
    stateInstance: StateInstance,
    elInstance: ElementInstance
  ) {
    const currentIndex: number = stateInstance.getCurrentIndex();
    const { $container, $list, $listItems } = elInstance.allNodes;
    const oImg: HTMLImageElement =
      $listItems[currentIndex].getElementsByTagName('img')[0];
    const imgWidth = await getImgWidth(oImg);
    const currentMarginLF: number = imgWidth / 2;
  }

  /**
   * 设置当前的指示器状态
   */
  public setDirDisabled(
    stateInstance: StateInstance,
    elInstance: ElementInstance
  ): void {
    const currentIndex: number = stateInstance.getCurrentIndex();

    const {
      $leftIndicator,
      $rightIndicator,
      $listItems,
    } = elInstance.allNodes;

    if (currentIndex === 0) {
      setIndicator($leftIndicator, true);
      setIndicator($rightIndicator, false);
      return;
    }
    if (currentIndex === $listItems.length - 1) {
      setIndicator($rightIndicator, true);
      setIndicator($leftIndicator, false);
      return;
    }

    setIndicator($leftIndicator, false);
    setIndicator($rightIndicator, false);

    function setIndicator<El extends HTMLElement = HTMLElement>(
      el: El,
      disabled: boolean
    ) {
      if (disabled) {
        el.classList.add('disabled');
        
        if (el instanceof HTMLButtonElement) {
          el.disabled = true;
        }
      } else {
        el.classList.remove('disabled');
        if (el instanceof HTMLButtonElement) {
          el.disabled = false;
        }
      }
    }
  }

  /**
   * 根据当前的 index 设置 previewImage
   */
  public setPreviewImage(
    currentIndex: number,
    stateInstance: StateInstance,
    elInstance: ElementInstance,
    templateInstance: TemplateInstance
  ) {
    const { $listItems } = elInstance.allNodes;
    const activeCls: string = classNameMap.itemShow;
    const {
      fadeIn: fadeInCls,
      fadeOut: fadeOutCls
    } = animateCssMap;

    // 设置 item 的 activeCls
    $listItems.forEach((el, index) => {
      setNextTick({
        duration: 1500,
        before() {
          if (index === currentIndex) {
            el.classList.add(fadeInCls);
          } else {
            // el.classList.add(fadeOutCls);
          }
        },
        callback() {
          if (index === currentIndex) {
            el.classList.add(activeCls);
          } else {
            el.classList.remove(activeCls);
          }
        },
        after() {
          el.classList.remove(fadeInCls);
          el.classList.remove(fadeOutCls);
        }
      });
    });

    // 设置指示器的状态
    this.setDirDisabled(stateInstance, elInstance);

    // FIXME 设置 描述面板的信息 (全局更新， 可优化)
    this.setDescBoard(
      stateInstance,
      elInstance,
      templateInstance
    );
  }

  public setDescBoard(
    stateInstance: StateInstance,
    elInstance: ElementInstance,
    templateInstance: TemplateInstance,
  ) {
    const currentIndex: number = stateInstance.getCurrentIndex();
    const dataList = stateInstance.getList();
    const currentData = dataList[currentIndex];
    const { id, src, scale, rotate } = currentData;

    const { $descBoard } = elInstance.allNodes;

    if (!$descBoard) return;

    const createDescBoardItem = templateInstance.createDescBoardItem.bind(templateInstance);

    $descBoard.innerHTML = `
      ${
        createDescBoardItem(`ID: ${String(id)}`)
      }
      ${
        createDescBoardItem(`
          SRC: 
          <a href="${src}" target="_blank">
            图片 src
          </a>
        `)
      }
      ${
        createDescBoardItem(`当前比例: ${scale * 100}%`)
      }
      ${
        createDescBoardItem(`旋转角度: ${String(rotate)}°`)
      }
    `;
  }

  public setListItem<
    T extends Record<string, any> = Record<string, any>
  >(
    currentData: T,
    el: HTMLElement
  ): void {
    el.style.cssText = `
      scale: ${String(currentData.scale)};
      rotate: ${String(currentData.rotate ?? 0)}deg;
    `;
  }

  public setCopyItemSrc(
    stateInstance: StateInstance,
    elInstance: ElementInstance,
  ) {
    const currentIndex: number = stateInstance.getCurrentIndex();
    const { $listItems } = elInstance.allNodes;
    const currentPreviewItem = $listItems[currentIndex];

    const oCurrentImg = currentPreviewItem.querySelector('img');

    copyString(oCurrentImg.src)
      .then((res) =>
        window.alert(`${res ? '复制成功' : '复制失败'}`)
      );
  }
}

export default DomOperator;
