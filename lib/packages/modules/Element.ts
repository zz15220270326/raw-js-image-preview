import { errorCodeMap, classNameMap } from '../shared/configs';

class ElementInstance {
  private rootEl: HTMLElement;

  constructor(el: HTMLElement | null) {
    if (!(el instanceof HTMLElement)) {
      throw new Error(errorCodeMap.RootElNotExist);
    }
    this.rootEl = el;
  }

  /** 所有的元素节点 */
  public get allNodes() {
    return {
      $container: this.elContainer as HTMLElement,
      $list: this.elList  as HTMLElement,
      $listItems: this.elListItems as HTMLElement[],
      $toolBox: this.elToolBox as HTMLElement,
      $leftIndicator: this.elLeftIndicator as HTMLElement,
      $rightIndicator: this.elRightIndicator as HTMLElement,
      $descBoard: this.elDescBoard as HTMLElement,
      $descBoardItems: this.elDescBoardItems as HTMLElement[]
    };
  }

  /** 容器组件 */
  private get elContainer() {
    return this.rootEl.getElementsByClassName(
      classNameMap.container
    )[0];
  }

  /** 整个列表组件 */
  private get elList() {
    return this.rootEl.getElementsByClassName(
      classNameMap.containerList
    )[0];
  }

  /** 列表内的所有 preview-item */
  private get elListItems() {
    const collection: HTMLCollectionOf<Element> | Element[] = this.elList?.getElementsByClassName(
      classNameMap.containerListItem
    ) || [];
    return [
      ...collection
    ];
  }

  /** 工具箱 */
  private get elToolBox() {
    return this.elContainer.getElementsByClassName(classNameMap.toolBox)[0];
  }

  private get elLeftIndicator() {
    return this.elContainer.getElementsByClassName(`${classNameMap.indicator} left`)[0];
  }

  private get elRightIndicator() {
    return this.elContainer.getElementsByClassName(`${classNameMap.indicator} right`)[0];
  }

  private get elDescBoard() {
    return this.elContainer.getElementsByClassName(`${classNameMap.descBoard}`)[0];
  }

  private get elDescBoardItems() {
    if (!this.elDescBoard) return [];
    return [
      ...this.elDescBoard.getElementsByClassName(classNameMap.descBoardItem)
    ];
  }
}

export default ElementInstance;
