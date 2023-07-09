import type { UseImagePreviewOptions, ImagePreviewData } from '../typings';

import { htmlAdaptor } from '../shared/adaptors';

import TemplateInstance from '../modules/Template';
import ElementInstance from '../modules/Element';
import StateInstance from '../modules/State';
import RenderInstance from '../modules/Render';
import EventInstance from '../modules/Event';

/**
 * 创建并使用 image-preview
 */
export function useImagePreview(options: UseImagePreviewOptions) {
  const {
    el,
    data,
    showDesc
  } = options;
  const rootEl = htmlAdaptor(el);
  
  const templateInstance = new TemplateInstance();
  const stateInstance = new StateInstance(data);
  const elInstance = new ElementInstance(rootEl);
  const renderInstance = new RenderInstance({
    el: rootEl,
    showDesc,
    templateInstance,
    stateInstance
  });
  const eventInstance = new EventInstance({
    elInstance,
    stateInstance,
    templateInstance,
  });

  const init = (): void => {
    new Promise<void>((resolve) => {
      renderInstance.render();
      resolve();
    }).then(() => {
      eventInstance.init();
    })
  }

  init();

  function open() {
    const { $container } = elInstance.allNodes;
    $container.style.display = '';
  }

  function close() {
    const { $container } = elInstance.allNodes;
    $container.style.display = 'none';
  }

  function getState() {
    return stateInstance.getState();
  }

  function dispatch(type: string, ...payloads: any[]) {
    renderInstance.update(type, { ...payloads });
  }

  function getElements() {
    return elInstance.allNodes;
  }

  return {
    // getElements
    getElements,
    // open image-previewer
    open,
    // close image-previewer
    close,
    // update dispatch
    dispatch,
    // get all state
    getState,
  };
}