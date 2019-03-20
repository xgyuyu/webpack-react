import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Input, Radio, Select, Button, Icon, message } from 'antd';
import * as types from './types';
import { commit, msgDataChange, fetchParams } from './action';
import style from './style.css';

const Option = Select.Option;
const showPreview = (props, source, index) => {
  const file = source.files[0];
  if ((file.size / 1024 / 1024) > 5) {
    message.error('文件大小不能超过5M');
    return;
  }
  if (!file) return;
  if (window.FileReader) {
    const fr = new FileReader();
    fr.onloadend = (e) => {
      props.dispatch(fetchParams(types.CATE_IMG_UPLOAD, {
        thumb: e.target.result,
        index,
        siteUid: props.params.siteUid,
      }));
    };
    fr.readAsDataURL(file);
  }
};
const ImgUrlbefore = (props) => {
  const { index } = props;
  return (
    <div key={index} className={style.fileInputcon}>
      <Icon
        className={style.imgClose} type="close"
        onClick={() => props.dispatch(commit('imageMsgs', [
          ...props.imageMsgs.slice(0, index),
          ...props.imageMsgs.slice(index + 1),
        ]))}
      />
      <div className={style.fileInputleft}>
        <Spin spinning={props.imgloading || false}>
          {
            props.imageMsgs[index] && props.imageMsgs[index].target ?
              <img
                src={props.imageMsgs[index].target}
                role="presentation"
                alt="presentation"
                height={200}
              /> : null
          }
        </Spin>
      </div>
      <div className={style.fileInputright}>
        <Input
          type="text"
          value={!!props.imageMsgs[index] && props.imageMsgs[index].imgUrl}
          onChange={event => props.dispatch(msgDataChange(index, 'imgUrl', event.target.value))}
          placeholder="图片链接"
        />
        <Input
          type="text" className={style.fileInputurl}
          value={props.imageMsgs[index] ? props.imageMsgs[index].alt : ''}
          onChange={event =>
            props.dispatch(msgDataChange(index, 'alt', event.target.value))}
          placeholder="图片主标题"
        />
        <Input
          type="text" className={style.fileInputurl}
          value={props.imageMsgs[index] ? props.imageMsgs[index].alt2 : ''}
          onChange={event =>
            props.dispatch(msgDataChange(index, 'alt2', event.target.value))}
          placeholder="图片副标题"
        />
        {
          props.params.isApp < 2 ?
            <Radio.Group
              name="img_position"
              size="large"
              style={{ marginTop: '5px' }}
              value={props.imageMsgs[index] ? props.imageMsgs[index].img_position || '1' : '1'}
              onChange={e => props.dispatch(msgDataChange(index, 'img_position', e.target.value))}
            >
              <Radio value="1">右边</Radio>
              <Radio value="2">左边</Radio>
            </Radio.Group>
            : null
        }
        <Button className={style.fileInputBg}>上传图片</Button>
        <Input
          type="file" name="file" className={style.fileInput}
          onChange={e => showPreview(props, e.target, index)}
        />
      </div>
    </div>
  );
};
ImgUrlbefore.propTypes = {
  dispatch: PropTypes.func,
  imgloading: PropTypes.bool,
  isApp: PropTypes.string,
  index: PropTypes.number,
  imageMsgs: PropTypes.arrayOf(PropTypes.shape()),
  params: PropTypes.shape(),
};
export default ImgUrlbefore;
