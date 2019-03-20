import React from 'react';
import PropTypes from 'prop-types';
import { Input, Radio, Icon, Alert, Select } from 'antd';
import { SketchPicker } from 'react-color';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { commit, addImageEntry } from './action';
import ImageMsgSurface from './imageMsgSurface';
import NewImageMsgSurface from './newImageMsgSurface';
import SelectInput from '../../public/selectInput';
import style from './style.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const DragcomNew = (category_recommend_imgs, dispatch, props) => (
  <DragDropContext
    onDragEnd={(result) => {
      if (!result.destination) {
        return;
      }
      const recommendResults = reorder(
        category_recommend_imgs,
        result.source.index,
        result.destination.index,
      );
      dispatch(commit('category_recommend_imgs', recommendResults));
    }}
  >
    <Droppable droppableId="droppable">
      {
        droppableProvided => (
          <div ref={droppableProvided.innerRef}>
            {
              category_recommend_imgs.map((info, index) => (
                <Draggable key={index} draggableId={index} index={index} >
                  {draggableProvided => (
                    <div>
                      <div ref={draggableProvided.innerRef}{...draggableProvided.draggableProps}{...draggableProvided.dragHandleProps}>
                        <NewImageMsgSurface
                          siteUid={props.siteUid}
                          dispatch={props.dispatch}
                          info={props.category_recommend_imgs[index]}
                          index={index}
                          moreBtnShow={(props.category_recommend_imgs.length - 1) === index}
                          onClose={() => dispatch(commit('category_recommend_imgs', [
                            ...props.category_recommend_imgs.slice(0, index),
                            ...props.category_recommend_imgs.slice(index + 1),
                          ]))}
                        />
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
);
const DragCom = (imageMsgs, dispatch, props) => (
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
    <Droppable droppableId="droppableOld">
      {
        droppableProvided => (
          <div ref={droppableProvided.innerRef}>
            {
              imageMsgs.map((info, index) => (
                <Draggable key={index} draggableId={index} index={index} >
                  {draggableProvided => (
                    <div>
                      <div ref={draggableProvided.innerRef}{...draggableProvided.draggableProps}{...draggableProvided.dragHandleProps}>
                        <ImageMsgSurface index={index} {...props} />
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
);

const showImgConfig = (props) => {
  if (props.params.isApp > 1 && props.level < 3 && Number(props.items.category_type) !== 3) {
    return (
      <div>
        {
          DragCom(props.imageMsgs, props.dispatch, props)
        }
        <a onClick={() => props.dispatch(addImageEntry())} className={style.addImage}>
          <Icon type="plus" /> 添加更多
        </a>
        {
          props.level === 2 && DragcomNew(props.category_recommend_imgs, props.dispatch, props)
        }
      </div>
    );
  }
  if (props.params.isApp <= 1 && Number(props.items.category_type) !== 3) {
    return (
      <div>
        {
          props.level < 2 &&
          DragCom(props.imageMsgs, props.dispatch, props)
        }
        {
          props.level < 2 &&
          <a onClick={() => props.dispatch(addImageEntry())} className={style.addImage}>
            <Icon type="plus" /> 添加更多
          </a>
        }
        {
          props.level === 2 && DragcomNew(props.category_recommend_imgs, props.dispatch, props)
        }
      </div>
    );
  }
  return null;
};


const NormalEdit = props => (
  <div>
    {
      Number(props.items.category_type) === 2 &&
        <div>
          <span>链接:</span>
          <Input type="text" value={props.cateLink} onChange={e => props.dispatch(commit('cateLink', e.target.value))} />
        </div>
    }
    {
      Number(props.items.category_type) === 4 &&
        <div style={{ margin: '10px 0' }}>
          <span>虚拟分类ID:</span>
          <Input type="text" style={{ maxWidth: '50%', marginLeft: 10 }} value={props.cateVirId} onChange={e => props.dispatch(commit('cateVirId', e.target.value))} />
        </div>
    }
    {
      Number(props.items.category_type) === 9 &&
      <div style={{ margin: '10px 0' }}>
        <span>选品分类ID:</span>
        <Input type="text" style={{ maxWidth: '50%', marginLeft: 10 }} value={props.productSelectUrlId} onChange={e => e.target.value.length <= 8 && props.dispatch(commit('productSelectUrlId', e.target.value))} />
      </div>
    }
    {
      props.level > 1 &&
      <div style={{ margin: '10px 0' }}>
        <span>是否设置推荐:</span>
        <SelectInput style={{ width: '75%', marginLeft: '15px' }} value={props.rec_content || {}} onChange={v => props.dispatch(commit('rec_content', v))} />
      </div>
    }
    <Alert message="没有图片的图片信息将不会被保存" type="warning" showIcon closable style={{ margin: '5px 0' }} />
    <div className={style.fileInputconbg}>
      {
        showImgConfig(props)
      }
      {/* { */}
      {/* props.params.isApp > 1 ? */}
      {/* props.level < 3 && Number(props.items.category_type) !== 3 && */}
      {/* <div> */}
      {/* /!* { *!/ */}
      {/* /!* DragCom(props.imageMsgs.filter(v => v.imgUrl), props.dispatch, props) *!/ */}
      {/* /!* } *!/ */}
      {/* { */}
      {/* DragcomNew(props.category_recommend_imgs, props.dispatch, props) */}
      {/* } */}
      {/* <a onClick={() => props.dispatch(addImageEntry())} className={style.addImage}> */}
      {/* <Icon type="plus" /> 添加更多 */}
      {/* </a> */}
      {/* </div> */}
      {/* : */}
      {/* props.level < 2 && Number(props.items.category_type) !== 3 && */}
      {/* <div> */}
      {/* /!* { *!/ */}
      {/* /!* DragCom(props.imageMsgs.filter(v => v.imgUrl), props.dispatch, props) *!/ */}
      {/* /!* } *!/ */}
      {/* { */}
      {/* DragcomNew(props.category_recommend_imgs, props.dispatch, props) */}
      {/* } */}
      {/* <a onClick={() => props.dispatch(addImageEntry())} className={style.addImage}> */}
      {/* <Icon type="plus" /> 添加更多 */}
      {/* </a> */}
      {/* </div> */}
      {/* } */}
    </div>
    {
      // 此处修改判断条件
      // (props.dailyCate || []).length > 0 && Number(props.items.category_type) === 3 &&
      <div style={{ margin: '10px 0' }}>
        <span>Daily new 跳转分类</span>
        <Select
          value={props.daily_new_cat}
          onChange={v => props.dispatch(commit('daily_new_cat', v))}
          style={{ width: '75%', marginLeft: 10 }}
        >
          {
            (props.dailyCate || []).map(v => <Select.Option key={v.cat_ids}>{v.value}</Select.Option>)
          }
        </Select>
      </div>
    }
    <span className={style.newspan}>字体颜色:</span>
    <div style={{ marginLeft: '80px', marginTop: '35px' }}>
      <SketchPicker
        className={style.colorWidth}
        color={props.color}
        onChangeComplete={v => props.dispatch(commit('color', v.hex))}
      />
    </div>

    <span className={style.newspan}>是否加粗:</span>
    <Radio.Group
      name="bold"
      size="large"
      style={{ display: 'block', marginTop: '35px', marginLeft: '80px' }}
      value={props.bold}
      onChange={e => props.dispatch(commit('bold', e.target.value))}
    >
      <Radio value={1}>是</Radio>
      <Radio value={0}>否</Radio>
    </Radio.Group>
  </div>
);

showImgConfig.propTypes = {
  isApp: PropTypes.string,
  imageMsgs: PropTypes.arrayOf(PropTypes.shape()),
  category_recommend_imgs: PropTypes.arrayOf(PropTypes.shape()),
  params: PropTypes.shape(),
  level: PropTypes.number,
  dispatch: PropTypes.func,
  items: PropTypes.shape(),
};
NormalEdit.propTypes = {
  dispatch: PropTypes.func,
  cateVirId: PropTypes.string,
  productSelectUrlId: PropTypes.string,
  items: PropTypes.shape(),
  bold: PropTypes.number,
  color: PropTypes.string,
  cateLink: PropTypes.string,
  daily_new_cat: PropTypes.string,
  rec_content: PropTypes.shape(),
  level: PropTypes.number,
  dailyCate: PropTypes.arrayOf(PropTypes.shape()),
};
export default NormalEdit;
