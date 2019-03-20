import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button, Icon, Spin, Tooltip, Radio, message } from 'antd';
import assign from 'object-assign';
import { Tree } from 'tea-ui';
import style from './style.css';
import { genCateDetailData, commit, initCateEditData, fetchParams } from './action';
import * as types from './types';
import Edit from './edit';

const Chip = ({
  backgroundColor,
  text,
}) => (
  <span style={{ backgroundColor }} className={style.categoryAttr}>
    {text}
  </span>
);

Chip.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
export default class MenuDetails extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const props = this.props;
    return (
      <div className={style.categoryEditBg}>
        <Spin
          spinning={props.detailLoad || false}
          tip="正在保存数据..."
        >
          <div style={{ textAlign: 'right' }}>
            <a
              onClick={() => props.dispatch({ type: 'cancel' })}
              style={{ marginRight: '45px' }}
            >
              <Icon type="rollback" /> 撤销
            </a>
          </div>
          <div
            style={{
              position: 'relative',
              marginBottom: '10px',
              maxHeight: '650px',
              overflowY: 'auto',
              height: window.innerHeight - 270,
            }}
          >
            <Tree
              dataSource={props.menuDetails.category_children}
              render={(args, level) =>
                (
                  <div className={style.categoryBorder}>
                    {
                      props.menuDetails.category_children.length &&
                      props.menuDetails.category_children[0] &&
                      props.menuDetails.category_children[0].id === args.id &&
                      props.menuDetails.position_id === '4' &&
                      '(默认)'
                    }
                    {args.category_title}{args.category_raw_title_en ? `(${args.category_raw_title_en})` : '' }
                    <span className={style.categoryprimitive}>
                      {
                        args.category_image && args.category_image.length > 0 &&
                        <Button
                          shape="circle" type="ghost" icon="eye-o" size="small" style={{ margin: '0 5px' }}
                          onClick={() => props.dispatch({ type: types.PREVIEW_IMG_INFO, data: args.category_image })}
                        />
                      }
                      {args.category_raw_title}
                      {args.sour_flag === 'attr' && <Chip text="属性" backgroundColor="#FFA726" />}
                      <Tooltip title={`${level}级分类`}>
                        <span className={style.categoryLevel}>{level}</span>
                      </Tooltip>
                    </span>
                    {
                    parseInt(args.category_type, 10) !== 6 && Number(args.category_type) !== 11 ?
                      <a
                        className={style.editMargin}
                        onClick={() => {
                          props.dispatch(initCateEditData(args));
                          props.dispatch(commit('open', true));
                          props.dispatch(commit('items', args));
                          props.dispatch(commit('level', level));
                        }}
                      > 编辑 <Icon type="edit" />
                      </a> : null
                  }
                    <a onClick={() => props.dispatch({ type: types.DEL_EVERY_CATE, id: args.id })}> 删除 <Icon type="delete" /></a>
                  </div>
                )}
              dataShouldChange={(type, source, target, targetLevel) => {
                // 顶部标题只能为第一级
                if (source.category_type === 10 && targetLevel !== 1) {
                  return false;
                }
                return true;
              }}
              dataSourceDidChange={arg => props.dispatch(genCateDetailData(arg))}
              styles={{
                border: '1px solid #E5E5E5',
                backgroundColor: '#FAFAFA',
                color: '#000',
                height: 36,
                lineHeight: '36px',
                padding: '0px 8px',
                position: 'relative',
              }}
              alias={{ children: 'category_children' }}
              paddingUnit={50}
            />
          </div>
          <Edit {...props} />
          <Radio.Group
            name="menu_position"
            size="large"
            style={{ margin: '35px 0', display: 'block' }}
            value={props.menuDetails.position_id}
            onChange={e => props.dispatch(commit('menuDetails', assign({}, props.menuDetails, { position_id: e.target.value })))}
          >
            <Radio value="1" disabled={props.menuDetails.category_children.find(v => v.category_type == 10)}>首边</Radio>
            <Radio value="3" disabled={props.menuDetails.category_children.find(v => v.category_type == 10)}>侧边</Radio>
            <Radio value="4" disabled={props.menuDetails.category_children.find(v => v.category_type == 10)}>Discount List</Radio>
            <Radio value="5">新首边</Radio>
          </Radio.Group>
          {
            props.menuDetails.category_children.length > 0 ?
              <div>
                <Button
                  loading={props.saveLoad}
                  type="primary" size="large"
                  disabled={parseInt(props.menuDetails.menu_status, 10) === 3}
                  onClick={() => {
                    if (!props.menuDetails.position_id) return message.warning('请选择菜单位置', 5);
                    props.dispatch(fetchParams(types.CATEGORYS_DETAILS_SAVE, props.menuDetails));
                    document.documentElement.scrollTop = document.body.scrollTop = 0;
                    return null;
                  }
                  }
                >保存
                </Button>
                <Button
                  disabled={parseInt(props.menuDetails.menu_status, 10) === 3}
                  size="large"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    props.dispatch(fetchParams(
                      types.CATEGORYS_DETAILS_SAVE,
                        assign({}, props.menuDetails, { operate: 'preview' }),
                    ));
                    document.documentElement.scrollTop = document.body.scrollTop = 0;
                  }
                  }
                >{Number(props.menuDetails.position_id) === 5 ? '预览 new' : '预览'}
                </Button>
              </div>
              : <span><Icon type="frown" />暂无数据</span>
          }
        </Spin>
      </div>
    );
  }
}
