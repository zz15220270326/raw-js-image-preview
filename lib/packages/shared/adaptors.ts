/**
 * html 元素适配器
 */
export function htmlAdaptor(
  origin: string | HTMLElement | DocumentFragment
): null | HTMLElement {
  if (typeof origin === 'string') {
    return document.querySelector(origin);
  }
  if (origin instanceof DocumentFragment) {
    return null;
  }
  return origin;
}

/**
 * 获取 nextIndex 的 adpator
 */
export function indexAdpator<T extends Record<string, any>>(
  currentIndex: number,
  list: T[],
  dir: 'next' | 'prev',
) {
  switch (dir) {
    case 'next':
      if (currentIndex === list.length - 1) {
        return 0;
      }
      return currentIndex + 1;
    case 'prev':
      if (currentIndex === 0) {
        return list.length - 1;
      }
      return currentIndex - 1;
      break;
    default:
      return currentIndex;
  }
}

/**
 * 获取 可选值的默认值的 adaptor
 */
export function getDefaultValueAdaptor<T extends Record<string, any>>(
  originOptions: Partial<T> | T,
  defaultOptions: T
): T {
  return {
    ...defaultOptions,
    ...originOptions,
  };
}