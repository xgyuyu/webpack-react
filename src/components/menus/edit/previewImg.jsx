import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Card, Tooltip } from 'antd';
import { commit } from './action';
import Styles from './style.css';

const { Meta } = Card;

const catetype = {
  1: '真实分类', 2: '特殊分类', 3: '虚拟分类', 4: 'web链接', 5: '礼品卡',
};
const PreView = ({ preViewVisible, preViewData, dispatch }) => (
  <Modal
    visible={preViewVisible} footer={null} width={600}
    onCancel={() => {
      dispatch(commit('preViewVisible', false));
      dispatch(commit('preViewData', []));
    }}
  >
    <div className={Styles.previewLay}>
      {
        (preViewData || []).map(({
          alt, alt2, target, bannerImgType, imgUrl, img_position: imgPosition,
        }, index) => (
          <Card style={{ width: 240, margin: '10px' }} cover={<img alt={alt || 'ex'} src={target} />} key={index} >
            <Meta
              title={alt}
              description={
                <span>
                  {!!alt2 && <p>{alt2}</p>}
                  <p>
                    {catetype[bannerImgType]}
                    <Tooltip title={imgUrl}>
                      <span>{imgUrl.length < 20 ? imgUrl : (`${imgUrl.slice(0, 20)}....`)}</span>
                    </Tooltip>
                  </p>
                  <p>{({ 1: '右边', 2: '左边' }[imgPosition])}</p>
                </span>
              }
            />
          </Card>
        ))
      }
    </div>
  </Modal>
);
PreView.propTypes = {
  preViewVisible: PropTypes.bool,
  preViewData: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
};
export default PreView;
