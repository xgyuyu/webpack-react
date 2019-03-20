import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Select, Spin, message, Input } from 'antd';
import * as types from './types';
import changeValue, { fetchParams } from './action';
import menusDetailsTable from './table';
import style from './style.css';

class Menulist extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: types.INIT, data: 1 });
    this.props.dispatch({ type: types.SHOW_WEBSITE });
  }
  render() {
    const props = this.props;
    const Option = Select.Option;
    if (props.websiteState === 2) {
      return (
        <div className={style.antFormBg}>
          <div className={style.antForm} >
            <span>站点:</span>
            <Select
              className={style.antSelect}
              value={props.site}
              onChange={(value) => {
                if (value && value.length > 0) {
                  return props.dispatch(changeValue('site', value));
                }
                return props.dispatch(changeValue('site', ''));
              }}
              optionFilterProp="children"
              showSearch allowClear
            >
              {
                props.websites.map((item, i) => (
                  <Option
                    value={item.site_uid}
                    key={`${item.site_uid}_${i}`}
                  >
                    {item.site_name.toLowerCase()}
                  </Option>
                  ))
              }
            </Select>
            <span>名称:</span>
            <Input
              className={style.antSelect}
              value={props.menuName}
              onChange={e => props.dispatch(changeValue('menuName', e.target.value))}
            />
            <span>页面类型:</span>
            <Select
              className={style.antSelect2}
              value={`${props.menu_postion || ''}`}
              allowClear
              onChange={(value) => {
                props.dispatch(changeValue('menu_postion', +value));
              }}
            >
              {
                ['顶部', '底部', 'app侧边栏', 'discount list'].map((item, i) => (
                  <Option
                    value={`${i + 1}`}
                    key={item}
                  >
                    {item}
                  </Option>
                ))
              }
            </Select>
            <span>状态:</span>
            <Select
              className={style.antSelect2}
              value={props.menuStatus}
              onChange={(value) => {
                props.dispatch(changeValue('menuStatus', value));
              }}
            >
              {
                ['待发布', '预览', '发布', '已删除'].map((item, i) => (
                  <Option
                    value={`${i + 1}`}
                    key={item}
                  >
                    {item}
                  </Option>
                  ))
              }
            </Select>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                props.dispatch(fetchParams(
                  types.SEARCH,
                  {
                    site_uid: props.site,
                    menu_name: props.menuName,
                    menu_status: props.menuStatus,
                    menu_postion: props.menu_postion,
                    p: 1,
                  },
                  ));
                props.dispatch(changeValue('currentPage', 1));
              }
              }
            >搜索
            </Button>
            <Button
              className={style.antBtn}
              onClick={() =>
                props.dispatch({ type: types.CLEAR_SEARCH_PARAMS })
              }
            >清除条件
            </Button>
            <Button
              className={style.circle}
              type="primary" shape="circle" icon="plus"
              onClick={() => {
                if (!props.site) return message.warning('请先选择一个站点');
                props.dispatch(changeValue('addMenuName', ''));
                props.dispatch(changeValue('copyId', ''));
                let isApp = props.websites.find(item => item.site_uid === props.site).site_platform;
                if (!isApp) {
                  isApp = '1';
                }
                props.dispatch(changeValue('isApp', isApp));
                return props.dispatch(changeValue('addMenuVisible', true));
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Spin tip="正在读取数据..." spinning={props.tableLoad || false}>
              { menusDetailsTable(props) }
            </Spin>
          </div>
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}
Menulist.propTypes = {
  dispatch: PropTypes.func,
};

const propsMaptoState = state => state['menus/list'];
export default connect(propsMaptoState)(Menulist);
