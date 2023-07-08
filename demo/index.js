// 开发版本
// import { useImagePreview } from '../lib';
// import { useImagePreview } from '../dist/esm';

import { useImagePreview } from '@jackzhang0715/raw-js-image-preview';

// 生产版本
// import { useImagePreview } from '../dist/esm';

// 全量引入
// const { useImagePreview } = ImagePreview;

;(() => {
  const data =  [
    {
      id: 1,
      src: 'https://img.alicdn.com/imgextra/i4/6000000007748/O1CN01Vk9UoS276dZM27y20_!!6000000007748-2-octopus.png',
      rotate: 0,
      scale: 1
    },
    {
      id: 2,
      src: 'https://img.alicdn.com/imgextra/i4/6000000003879/O1CN01e0c4Eq1eWdC24ncT5_!!6000000003879-0-octopus.jpg',
      rotate: 0,
      scale: 1
    },
    {
      id: 3,
      src: 'https://img.alicdn.com/imgextra/i4/6000000006239/O1CN01ePfulN1vxVuMf9bfy_!!6000000006239-0-octopus.jpg',
      rotate: 0,
      scale: 1
    },
    {
      id: 4,
      src: 'https://img.alicdn.com/imgextra/i4/6000000002469/O1CN01iZSDFT1U6qjlpxkqh_!!6000000002469-0-octopus.jpg',
      rotate: 0,
      scale: 1
    },
  ];

  const oOpenBtn = document.querySelector('.J_OpenImagePreviewBtn');

  const { getElements, open, close } = useImagePreview({
    el: '#J_ImagePreview',
    data,
    showDesc: false
  });


  const init = () => {
    console.log('image-preview elements', getElements());

    bindEvent();
  }

  function bindEvent() {
    oOpenBtn.addEventListener('click', handleOpenBtnClick, false);
  }

  function handleOpenBtnClick() {
    open();
  }

  init();
})();