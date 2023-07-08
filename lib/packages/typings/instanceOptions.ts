import ElementInstance from '../modules/Element';
import TemplateInstance from '../modules/Template';
import StateInstance from '../modules/State';

/**
 * 初始化 RenderInstance 参数
 */
export interface RenderInstanceOptions {
  el: HTMLElement;
  showDesc?: boolean;
  templateInstance: TemplateInstance;
  stateInstance: StateInstance;
}

/**
 * 初始化 EventInstance 的参数
 */
export interface EventInstanceOptions {
  elInstance: ElementInstance;
  stateInstance: StateInstance;
  templateInstance: TemplateInstance;
}