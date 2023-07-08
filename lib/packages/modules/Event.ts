import DomOperator from '../operators/Dom';
import { classNameMap } from '../shared/configs';
import { copyString } from '../shared/utils';
import { EventInstanceOptions } from '../typings';

import ElementInstance from './Element';
import StateInstance from './State';
import TemplateInstance from './Template';

class EventInstance {
  private elInstance: ElementInstance;

  private stateInstance: StateInstance;

  private templateInstance: TemplateInstance;

  private domOperator: DomOperator;

  constructor(options: EventInstanceOptions) {
    this.elInstance = options.elInstance;
    this.stateInstance = options.stateInstance;
    this.templateInstance = options.templateInstance;
    
    this.domOperator = new DomOperator();
  }

  public init(): void {
    this.initStyle();
    this.bindEvent();
  }

  private get allNodes() {
    return this.elInstance.allNodes;
  }

  async initStyle() {
    const {
      stateInstance,
      elInstance,
      domOperator
    } = this;

    domOperator.setImageInfo(stateInstance, elInstance);
    domOperator.setDirDisabled(stateInstance, elInstance);
    domOperator.setContainerShow(elInstance);
  }

  private bindEvent(): void {
    const { $container, $toolBox, $leftIndicator, $rightIndicator } = this.allNodes;

    $container.addEventListener('click', this.handleContainerClick.bind(this), false);
    $toolBox.addEventListener('click', this.handleToolBoxClick.bind(this), false);
    $leftIndicator.addEventListener('click', this.handleImageChange.bind(this), false);
    $rightIndicator.addEventListener('click', this.handleImageChange.bind(this), false);
  }

  handleContainerClick(ev: Event) {
    const { $container } = this.allNodes;
    const { domOperator, elInstance } = this;

    const e = ev || window.event;
    const el = (e.target || e.srcElement) as HTMLElement;

    if (el === $container) {
      domOperator.setContainerShow(elInstance, false);
    }
  }

  private handleToolBoxClick(ev: Event) {
    const { stateInstance, elInstance, templateInstance, domOperator } = this;
    const { $listItems } = elInstance.allNodes;

    const e = ev || window.event;
    const el = (e.target || e.srcElement) as HTMLElement;

    if (el.className.includes(classNameMap.toolBoxItem)) {
      const id = el.dataset.id;
      const $listItem: HTMLElement = $listItems[stateInstance.getCurrentIndex()];
      switch (id) {
        case 'amplify':
          stateInstance.setDataInfo({
            currentIndex: stateInstance.getCurrentIndex(),
            dataList: stateInstance.getList(),
            callback(newValue) {
              domOperator.setListItem.apply(
                domOperator,
                [newValue, $listItem]
              );
              domOperator.setDescBoard(
                stateInstance,
                elInstance,
                templateInstance
              );
            }
          }, {
            scale: Number($listItem.style.scale) + .2
          });
          break;
        case 'shimp':
          stateInstance.setDataInfo({
            currentIndex: stateInstance.getCurrentIndex(),
            dataList: stateInstance.getList(),
            callback(newValue) {
              domOperator.setListItem.apply(
                domOperator,
                [newValue, $listItem]
              );
              domOperator.setDescBoard(
                stateInstance,
                elInstance,
                templateInstance
              );
            }
          }, {
            scale: Number($listItem.style.scale) - .2
          });
          break;
        case 'rotate':
          stateInstance.setDataInfo({
            currentIndex: stateInstance.getCurrentIndex(),
            dataList: stateInstance.getList(),
            callback(newValue) {
              domOperator.setListItem.apply(
                domOperator,
                [newValue, $listItem]
              );
              domOperator.setDescBoard(
                stateInstance,
                elInstance,
                templateInstance
              );
            }
          }, {
            rotate: parseInt($listItem.style.rotate) >= 360
                  ? 0
                  : parseInt($listItem.style.rotate) + 90
          });
          break;
        case 'copy':
          domOperator.setCopyItemSrc(stateInstance, elInstance);
          break;
        default:
          break;
      }
    }
  }

  private handleImageChange(ev: Event) {
    const {
      stateInstance,
      elInstance,
      templateInstance,

      domOperator
    } = this;
    const { $listItems } = this.allNodes;
    const e = ev || window.event;
    const el = (e.target || e.srcElement) as HTMLElement;
    const dir = <'prev' | 'next'> el.getAttribute('data-dir');

    if (['prev', 'next'].includes( dir)) {
      stateInstance.setCurrentIndex({
        dir,
        list: $listItems,
        callback: (currentIndex: number) => {
          domOperator.setPreviewImage
          .bind(
            domOperator
          )
          (
            currentIndex,
            stateInstance,
            elInstance,
            templateInstance
          );
        }
      });
    }
  }
}

export default EventInstance;
