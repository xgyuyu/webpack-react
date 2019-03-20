import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Input, Select, Button, Upload, Icon, message, Alert } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import * as types from './types';
import { msgDataChange, fetchParams, addImageEntry, commit } from './action';
import style from './style.css';

const Option = Select.Option;
const typeOfCom = ({
  type, imageMsgs, index, dispatch, specialSour,
}) => {
  switch (type) {
    case '1':
      return (<Input style={{ width: '60%' }} value={imageMsgs[index] && imageMsgs[index].imgUrl} placeholder="分类ID" onChange={event => dispatch(msgDataChange(index, 'imgUrl', event.target.value))} />);
    case '2':
      return (
        <Select
          style={{ width: '60%' }}
          placeholder="请选择..."
          onChange={v => dispatch(msgDataChange(index, 'imgUrl', v))}
        >
          {
            specialSour.map(v => (
              <Option key={v.category_special_key}>{v.category_special_name}</Option>
            ))
          }
        </Select>
      );
    case '3':
      return (<Input style={{ width: '60%' }} value={imageMsgs[index] && imageMsgs[index].imgUrl} placeholder="分类ID" onChange={event => dispatch(msgDataChange(index, 'imgUrl', event.target.value))} />);
    case '4':
      return (
        <Input
          style={{ width: '60%' }}
          value={imageMsgs[index] && imageMsgs[index].imgUrl}
          onChange={event => dispatch(msgDataChange(index, 'imgUrl', event.target.value))}
          placeholder="图片链接"
        />
      );
    default:
      return null;
  }
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const BannerEdit = (props) => {
  const {
    dispatch, imageMsgs, imgloading, params, specialSour,
  } = props;
  return (
    <div>
      <Alert message="没有图片的图片信息将不会被保存" type="warning" showIcon closable style={{ margin: '5px 0' }} />
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }
          const items = reorder(
            imageMsgs,
            result.source.index,
            result.destination.index,
          );

          dispatch(commit('imageMsgs', items));
        }}
      >
        <Droppable droppableId="droppable">
          {
            (droppableProvided, droppableSnapshot) => (
              <div ref={droppableProvided.innerRef}>
                {
                  imageMsgs.map((info, index) => (
                    <Draggable key={index} draggableId={index} index={index} >
                      {(draggableProvided, draggableSnapshot) => (
                        <div>
                          <div ref={draggableProvided.innerRef}{...draggableProvided.draggableProps}{...draggableProvided.dragHandleProps}>
                            <div key={index} className={style.everyBannerLay}>
                              <div className={style.bannerImgpartLay}>
                                <Spin spinning={imgloading || false}>
                                  {
                                    !!(imageMsgs[index] && imageMsgs[index].target) &&
                                    <img
                                      src={imageMsgs[index].target}
                                      role="presentation"
                                      alt="presentation"
                                      height={200}
                                    />
                                  }
                                </Spin>
                              </div>
                              <div className={style.bannerInfopartLay}>
                                <div>
                                  <Upload
                                    beforeUpload={(file) => {
                                      if (!file) return false;
                                      if ((file.size / 1024 / 1024) > 5) {
                                        message.error('文件大小不能超过5M');
                                        return false;
                                      }
                                      if (window.FileReader) {
                                        const fr = new FileReader();
                                        fr.onloadend = (e) => {
                                          dispatch(fetchParams(types.CATE_IMG_UPLOAD, {
                                            thumb: e.target.result,
                                            index,
                                            siteUid: params.siteUid,
                                          }));
                                        };
                                        fr.readAsDataURL(file);
                                      }
                                      return false;
                                    }}
                                  ><Button style={{ margin: '10px 0' }}>上传图片</Button>
                                  </Upload>
                                </div>
                                <div style={{ margin: '10px 0' }}>
                                  <span>名称</span>
                                  <Input
                                    style={{ width: '80%', marginLeft: '10px' }}
                                    value={imageMsgs[index] && imageMsgs[index].alt}
                                    onChange={event => dispatch(msgDataChange(index, 'alt', event.target.value))}
                                  />
                                </div>
                                <div />
                                <div style={{ margin: '10px 0' }}>
                                  <Input
                                    placeholder="宽（选填）" style={{ width: '45%' }}
                                    value={imageMsgs[index] && imageMsgs[index].width}
                                    onChange={event => dispatch(msgDataChange(index, 'width', event.target.value))}
                                  />
                                  <Input
                                    placeholder="高（选填）" style={{ width: '45%', marginLeft: '10px' }}
                                    value={imageMsgs[index] && imageMsgs[index].height}
                                    onChange={event => dispatch(msgDataChange(index, 'height', event.target.value))}
                                  />
                                </div>
                                <div>
                                  <Select
                                    value={imageMsgs[index] && imageMsgs[index].bannerImgType}
                                    style={{ width: '30%', marginRight: '10px' }}
                                    onChange={value => dispatch(msgDataChange(index, 'bannerImgType', value))}
                                  >
                                    {
                                      [{ id: 1, name: '真实分类' }, { id: 3, name: '虚拟分类' }, { id: 2, name: '特殊分类' }, { id: 4, name: 'web链接' }, { id: 5, name: '礼品卡' }].map(v => (<Option key={v.id}>{v.name}</Option>))
                                    }
                                  </Select>
                                  {
                                    typeOfCom({
                                      type: imageMsgs[index] && imageMsgs[index].bannerImgType, imageMsgs, index, dispatch, specialSour,
                                    })
                                  }
                                </div>
                                <div />
                              </div>
                              <Button
                                shape="circle" icon="delete" type="danger"
                                onClick={() => props.dispatch(commit('imageMsgs', imageMsgs.filter((_, i) => i !== index)))}
                              />
                            </div>
                          </div>
                          {draggableProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))
                }
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
      <a onClick={() => props.dispatch(addImageEntry())} className={style.addImage}>
        <Icon type="plus" /> 添加更多
      </a>
    </div>
  );
};
BannerEdit.propTypes = {
  dispatch: PropTypes.func,
  imgloading: PropTypes.bool,
  imageMsgs: PropTypes.arrayOf(PropTypes.shape()),
  specialSour: PropTypes.arrayOf(PropTypes.shape()),
  params: PropTypes.shape(),
};
export default BannerEdit;
