import { ImagePreviewData } from './stateConfig';

/**
 * useImagePreview hook 的配置项
 */
export interface UseImagePreviewOptions {
  el: string | HTMLElement | DocumentFragment;
  data: ImagePreviewData[];
  showDesc?: boolean;
}
