import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Icon, Button } from 'antd';
import Upload from '../../public/uploadImagePreview';
import STYLE from '../../public/style.css';
import { recommendImgChanage, addImageEntryNew } from './action';

const positions = [
  { value: '1', name: '单图', num: 1 },
  { value: '2', name: '双图（上下双图）', num: 2 },
  { value: '3', name: '四图（等比四图）', num: 4 },
  { value: '4', name: '四图（交错四图）', num: 4 },
];

const NewImageMsgSurface = ({
  siteUid, info, dispatch, index, onClose, moreBtnShow,
}) => {
  const {
    alt, alt2, layoutType, imgs,
  } = info;
  return (
    <div>
      <div className={STYLE.imgbordder}>
        <Icon
          className={STYLE.imgClose} type="close"
          onClick={() => onClose()}
        />
        <div className={STYLE.imgMsgLay}>
          <div>
            <span>请选择图片组样式:</span>
            <Select
              value={layoutType}
              style={{ minWidth: 200, marginLeft: '10px' }}
              onChange={val => dispatch(recommendImgChanage(index, 'layoutType', val))}
            >
              {
                positions.map(v => <Select.Option key={v.value}>{v.name}</Select.Option>)
              }
            </Select>
          </div>
          <div style={{ marginBottom: 10 }}>
            {
              imgs.map((img, i) => (
                <div key={i} className={STYLE.imgItemLay}>
                  <span style={{ minWidth: 50, marginRight: 10 }}>图{['一', '二', '三', '四'][i]}：</span>
                  <Upload
                    index={i}
                    siteUid={siteUid}
                    onChange={val => dispatch(recommendImgChanage(index, 'imgs', val, i))}
                  />
                  <span style={{ minWidth: 80 }}>跳转链接:</span>
                  <Input
                    value={img.imgUrl}
                    onChange={e => dispatch(recommendImgChanage(index, 'imgs', { imgUrl: e.target.value }, i))}
                  />
                </div>
              ))
            }
          </div>
          <div className={STYLE.imgTipLay} style={{ marginTop: 'auto' }}>
            <span style={{ minWidth: 120 }}>图片组主标题:</span>
            <Input disabled={layoutType == 2 || layoutType == 3} value={alt} onChange={e => dispatch(recommendImgChanage(index, 'alt', e.target.value))} />
          </div>
          <div className={STYLE.imgTipLay}>
            <span style={{ minWidth: 120 }}>图片组副标题:</span>
            <Input disabled={layoutType == 2 || layoutType == 3} value={alt2} onChange={e => dispatch(recommendImgChanage(index, 'alt2', e.target.value))} />
          </div>
        </div>
        <div className={STYLE.imgPreview}>
          {
            layoutType === '1' &&
            <span>
              {
                imgs[0] && imgs[0].target &&
                <img src={imgs[0].target} style={{ width: '100%' }} alt="pre" />
              }
            </span>
          }
          {
            layoutType === '2' &&
            <span>
              {
                imgs.map(img => (
                  img.target && <img src={img.target} style={{ height: '50%', padding: 2 }} alt="pre" />
                ))
              }
            </span>
          }
          {
            layoutType === '3' &&
            <span>
              {
                imgs.map(img => (
                  img.target && <img src={img.target} style={{ height: '50%', width: '50%', padding: 2 }} alt="pre" />
                ))
              }
            </span>
          }
          {
            layoutType === '4' &&
            <div className={STYLE.flex}>
              <div className={STYLE.flexCuowei}>
                {
                  imgs[0] && imgs[0].target &&
                  <img src={imgs[0].target} style={{ height: 90, width: '100%', padding: 2 }} alt="pre" />
                }
                {
                  imgs[2] && imgs[2].target &&
                  <img src={imgs[2].target} style={{ height: 180, width: '100%', padding: 2 }} alt="pre" />
                }
              </div>
              <div className={STYLE.flexCuowei}>
                {
                  imgs[1] && imgs[1].target &&
                  <img src={imgs[1].target} style={{ height: 180, width: '100%', padding: 2 }} alt="pre" />
                }

                {
                  imgs[3] && imgs[3].target &&
                  <img src={imgs[3].target} style={{ height: 90, width: '100%', padding: 2 }} alt="pre" />
                }
              </div>
            </div>
          }
        </div>
      </div>
      {
        moreBtnShow &&
        <Button icon="plus" style={{ width: '100%', border: '1px dashed' }} onClick={() => dispatch(addImageEntryNew())}>添加更多</Button>
      }
    </div>


  );
};

NewImageMsgSurface.propTypes = {
  siteUid: PropTypes.string.isRequired,
  info: PropTypes.shape(),
  dispatch: PropTypes.func,
  onClose: PropTypes.func,
  index: PropTypes.number,
  moreBtnShow: PropTypes.bool,
};

export default NewImageMsgSurface;
