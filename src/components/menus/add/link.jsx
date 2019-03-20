import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Card, Button, message, Tabs, Icon, Popover } from 'antd';
import { commit, addDiyLink, addDiyApp, addDiySpecialApp, addProductSelect } from './action';
import { ADD_DALIYNEW, ADD_NEXT_LINE, ADD_BANNER_LINE, ADD_SPLIT_TITLE, addTopCate, addSplitLine } from './types';
import style from './style.css';

const Option = Select.Option;
const TabPane = Tabs.TabPane;

const DIYWebLink = ({
  dispatch,
  diyName,
  diyLink,
}) => (
  <Card title="自定义链接" className={style.categoryBg} bodyStyle={{ padding: '15px 10px' }} >
    <Input onChange={e => dispatch(commit('diyLink', `${e.target.value}`))} placeholder="http://www.google.com" />
    <Input
      className={style.categoryListAlt}
      placeholder="分类名称"
      onChange={e => dispatch(commit('diyName', e.target.value))}
    />
    <div className={style.menuButton}>
      <Button
        onClick={
          () => {
            if (!diyName || diyName.trim().length < 1) {
              return message.warning('请输入有效名称', 2);
            }
            return dispatch(addDiyLink(diyLink, diyName));
          }
        }
      >配置到菜单
      </Button>
    </div>
  </Card>
);
DIYWebLink.propTypes = {
  dispatch: PropTypes.func,
  diyLink: PropTypes.string,
  diyName: PropTypes.string,
};

const DIYAppLink = ({
  dispatch,
  diyAppName,
  diyAppId,
  diyAppSpecial,
  specialSour,
  menuDetails,
  productSelectName,
  productSelectId,
}) => (
  <Card className={style.categoryBg} bodyStyle={{ padding: '0 10px 15px' }} >
    <Tabs defaultActiveKey="1" type="card" position="left">
      <TabPane tab={<span className={style.tabName}>虚拟分类</span>} key="1">
        <Input
          placeholder="分类名称"
          onChange={e => dispatch(commit('diyAppName', e.target.value))}
        />
        <Input
          className={style.categoryListAlt}
          placeholder="虚拟分类ID"
          onChange={e =>
            dispatch(commit('diyAppId', e.target.value))}
        />
        <div className={style.menuButton}>
          <Button
            onClick={
              () => {
                if (!diyAppName || diyAppName.trim().length < 1) {
                  return message.warning('请输入有效名称', 2);
                }
                if (!diyAppId || diyAppId.trim().length < 1) {
                  return message.warning('请输入有效ID', 2);
                }
                return dispatch(addDiyApp(diyAppId, diyAppName));
              }
            }
          >配置到菜单
          </Button>
        </div>
      </TabPane>
      <TabPane tab={<span className={style.tabName}>特殊分类</span>} key="2" disabled={menuDetails.position_id === '4'}>
        <Select
          className={style.categoryListAlt2}
          placeholder="请选择..."
          disabled={menuDetails.position_id === '4'}
          onChange={
            value => dispatch(commit(
                'diyAppSpecial',
                specialSour.find(v => v.category_special_key === value),
                ))
            }
        >
          {
            specialSour.map((v, i) => (
              <Option value={v.category_special_key} key={i}>{v.category_special_name}</Option>
            ))
          }
        </Select>
        <div className={style.menuButton}>
          <Button
            onClick={
              () => (
                diyAppSpecial.category_special_key
                  ?
                  dispatch(addDiySpecialApp(diyAppSpecial.category_special_key, diyAppSpecial.category_special_name))
                  :
                  message.warning('请选择特殊分类', 2)
              )
            }
          >配置到菜单
          </Button>
        </div>
      </TabPane>
      <TabPane tab={<span className={style.tabName}>选品类型</span>} key="3">
        <Input
          placeholder="分类名称"
          onChange={e => dispatch(commit('productSelectName', e.target.value))}
        />
        <Input
          className={style.categoryListAlt}
          placeholder="选品id"
          onChange={(e) => {
            const value = e.target.value;
            return dispatch(commit('productSelectId', value));
          }
          }
        />
        <div className={style.menuButton}>
          <Button
            onClick={
              () => {
                if (!productSelectName || productSelectName.trim().length < 1) {
                  return message.warning('请输入有效名称');
                }
                if (!productSelectId || productSelectId.trim().length < 1 || productSelectId.trim().length > 8) {
                  return message.warning('请输入有效ID,不可超过8个字符');
                }
                return dispatch(addProductSelect(productSelectId, productSelectName));
              }
            }
          >配置到菜单
          </Button>
        </div>
      </TabPane>
    </Tabs>
  </Card>
);
DIYAppLink.propTypes = {
  dispatch: PropTypes.func,
  diyAppId: PropTypes.string,
  diyAppName: PropTypes.string,
  productSelectName: PropTypes.string,
  productSelectId: PropTypes.string,
  diyAppSpecial: PropTypes.shape({}),
  specialSour: PropTypes.shape({}),
  menuDetails: PropTypes.shape({}),
};

const link = props => (
  <div className={style.linkbtnLay}>
    {
      Number(props.params.isApp) < 4 ?
        props.menuDetails.position_id === '4' ? <DIYAppLink {...props} /> : <DIYWebLink {...props} />
        :
        <DIYAppLink {...props} />
    }
    {
      props.menuDetails.position_id !== '4' &&
      <Button onClick={() => props.dispatch({ type: ADD_DALIYNEW })} style={{ margin: '10px 0' }}>{"What's New"}<Icon type="right" /></Button>
    }
    {
      Number(props.params.isApp) < 2 && <Button onClick={() => props.dispatch({ type: ADD_NEXT_LINE })} style={{ margin: '10px 0' }}>跳列栏 <Icon type="right" /></Button>
    }
    {
      ((Number(props.params.isApp) >= 4 && props.menuDetails.position_id !== '4') || Number(props.params.isApp) === 2) &&
      <Popover content="M站点下此功能配置无效">
        <Button onClick={() => props.dispatch({ type: ADD_BANNER_LINE })} style={{ margin: '10px 0' }} icon="warning">Banner图 <Icon type="right" /></Button>
      </Popover>
    }
    {
      (Number(props.params.isApp) >= 4 || Number(props.params.isApp) === 2) &&
      <Popover content="M站点下此功能配置无效">
        <Button onClick={() => props.dispatch({ type: ADD_SPLIT_TITLE })} style={{ margin: '10px 0' }} icon="warning">
          <span>标题<Icon type="right" /></span>
        </Button>
      </Popover>
    }
    <Button disabled={props.menuDetails.position_id !== '5'} onClick={() => props.dispatch({ type: addTopCate })} style={{ margin: '10px 0' }}>顶部分类<Icon type="right" /></Button>
    <Button disabled={props.menuDetails.position_id !== '5'} onClick={() => props.dispatch({ type: addSplitLine })} style={{ margin: '10px 0' }}>隔断竖线<Icon type="right" /></Button>
  </div>
);

link.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  menuDetails: PropTypes.shape(),
};
export default link;
