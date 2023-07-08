import { ToolBoxItem } from "packages/typings";

/** 错误信息表 */
export const errorCodeMap = {
  /** 根元素不存在 */
  RootElNotExist: '"rootEl" is not exist in document',
};

/** className Map */
export const classNameMap = {
  container: 'image-preview-container',

  containerList: 'image-preview-list',
  containerListItem: 'image-preview-list-item',
  containerListItemLink: 'image-preview-list-item-link',
  containerListItemImage: 'image-preview-list-item-img',

  toolBox: 'tool-box',
  toolBoxItem: 'tool-box-item',

  itemShow: 'image-item-active',

  indicator: 'switch-indicator',

  descBoard: 'desc-board',
  descBoardItem: 'desc-board-item'
};

/**
 * animateCssMap
 */
export const animateCssMap = {
  base: 'animate__animated',

  fadeIn: 'animate__fadeIn',
  fadeOut: 'animate__fadeOut'
};

/** 工具箱 */
export const toolList: ToolBoxItem[] = [
  {
    id: 'amplify',
    name: '放大'
  },
  {
    id: 'shimp',
    name: '缩小'
  },
  {
    id: 'rotate',
    name: '旋转'
  },
  {
    id: 'copy',
    name: '复制'
  }
];
