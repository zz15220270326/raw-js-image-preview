import type {
  ImagePreviewData,
  SetCurrentIndexOptions,
  SetDataInfoOptions
} from '../typings';
import { indexAdpator } from '../shared/adaptors';

class StateInstance {
  private list: ImagePreviewData[];
  private currentIndex: number;
  
  private timer: NodeJS.Timeout | null = null;

  constructor(data: ImagePreviewData[]) {
    this.list = data;
    this.currentIndex = 0;

    this.init();
  }

  public getState() {
    const { getCurrentIndex, getList } = this;

    return {
      currentIndex: getCurrentIndex(),
      dataList: getList(),
    };
  }

  public getCurrentIndex() {
    return this.currentIndex;
  }

  public getList() {
    return this.list;
  }
  
  private init(): void {
    
  }

  private autoplay(): void {

  }

  public get imageList(): ImagePreviewData[] {
    return [...this.list];
  }

  public setCurrentIndex(options: SetCurrentIndexOptions) {
    const { currentIndex: prevCurrentIndex } = this;
    const {
      list,
      dir,
      callback
    } = options;
    this.currentIndex = indexAdpator(prevCurrentIndex, list, dir);

    callback(this.currentIndex, prevCurrentIndex);
  }

  public setDataInfo<T = Record<string, any>>(
    options: SetDataInfoOptions<T>,
    newData: Partial<T>
  ) {
    const { currentIndex, dataList, callback } = options;
    const oldValue: T = dataList[currentIndex];

    if (oldValue) {
      dataList[currentIndex] = {
        ...oldValue,
        ...newData
      };
      callback(dataList[currentIndex], oldValue);
    }
  }
}

export default StateInstance;
