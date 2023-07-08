import { getDefaultValueAdaptor } from './adaptors';

import { NextTickOptions } from '../typings';

/**
 * @function 设置元素样式
 */
export function setStyle(el: HTMLElement, [styleName, value]: [keyof CSSStyleDeclaration, string]) {
  Object.defineProperty(el.style, styleName, {
    value
  });
}

/**
 * @function 获取图片元素的 src
 */
export function getImgWidth(imgEl: HTMLImageElement): Promise<number> {
  return new Promise((resolve) => {
    const src = imgEl.src;

    const oImgGetter: HTMLImageElement = new Image();

    oImgGetter.src = src;
    oImgGetter.style.position = 'fixed';
    oImgGetter.style.visibility = 'hidden';
    // oImgGetter.style.display = 'none';

    oImgGetter.onload = function () {
      resolve(oImgGetter.clientWidth);
      setTimeout(() => {
        oImgGetter.remove();
      }, 2000);
    }

    document.body.appendChild(oImgGetter);
  })
}

/**
 * @function 复制字符串
 */
export async function copyString(str: string): Promise<boolean> {
  try {
    if (window.navigator) {
      await navigator.clipboard.writeText(str);
      return true;
    }
    const oCopyInput = document.createElement('textarea');
    oCopyInput.style.display = 'none';
    await document.body.appendChild(oCopyInput);
    oCopyInput.value = str;
    oCopyInput.focus();
    oCopyInput.select();
    await document.execCommand('copy');
    document.body.removeChild(oCopyInput);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @function 定时任务执行 (优化 setTimeout)
 */
export function setNextTick(
  options: Partial<NextTickOptions>
) {
  const {
    callback,
    duration,
    before,
    after
  } = getDefaultValueAdaptor(options, {
    callback: () => {},
    duration: 2000,
    before: () => {},
    after: () => {},
  });
  let t: null | NodeJS.Timer;

  return Promise.resolve()
      .then(() => {
        return new Promise<void>((resolve) => {
          before();
          resolve();
        });
      })
      .then(() => {
        callback();
        return new Promise<void>((resolve) => {
          if (t) {
            return resolve();
          }
          t = setTimeout(() => {
            resolve();
          }, duration);
        });
      })
      .then(after)
      .finally(() => {
        if (t) {
          clearTimeout(t);
          t = null;
        }
      });
}
