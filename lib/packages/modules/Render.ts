import TemplateInstance from './Template';
import StateInstance from './State';
import { RenderInstanceOptions } from '../typings';
import { toolList } from '../shared/configs';

class RenderInstance {
  private el: HTMLElement;

  private templateInstance: TemplateInstance;
  
  private stateInstance: StateInstance;

  private showDesc: boolean = false;

  constructor(options: RenderInstanceOptions) {
    this.el = options.el;
    this.templateInstance = options.templateInstance;
    this.stateInstance = options.stateInstance;
    this.showDesc = options.showDesc;
  }

  public render() {
    const { stateInstance, templateInstance, el, showDesc } = this;
    const { imageList, getCurrentIndex } = stateInstance;
    const currentPreviewImage = imageList[getCurrentIndex.call(stateInstance)];
    const innerHTML = templateInstance.createImageContainer(
      `
        <!-- ImagePreviewList -->
        ${templateInstance.createImagePreviewList(imageList)}
        <!-- ToolBoxList -->
        ${templateInstance.createToolBox(toolList)}
        ${
          showDesc
            ? `
        <!-- DescBoard -->
        ${templateInstance.createDescBoard(currentPreviewImage)}
            `
            : ''
        }
      `
    );
    el.innerHTML = innerHTML;
  }

  /**
   * type & payload -> update-data -> update-dom
   **/
  public update(type: string, payload?: unknown) {

  }
}

export default RenderInstance;
