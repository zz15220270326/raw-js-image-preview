/**
 * 图片预览的集合
 */
export interface ImagePreviewData {
  id: number | string | symbol;
  src: string;
  rotate: number;
  scale: number;
}


export interface ToolBoxItem {
  id: string;
  name: string;
}

export interface SetCurrentIndexOptions <T = Record<string, any>> {
  list: T[];
  dir: 'next' | 'prev';
  callback: (newValue: number, oldValue?: number) => void;
}

export interface SetDataInfoOptions <T = Record<string, any>> {
  currentIndex: number;
  dataList: T[];
  callback: (newValue: T, oldValue: T) => void;
}
