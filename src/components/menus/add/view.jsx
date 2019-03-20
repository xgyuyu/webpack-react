import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tree, Spin, Button, Card } from 'antd';
import * as types from './types';
import { toggleChecked, addNomalCate, commit, newMenu } from './action';
import MenuDetailsTree from './tree';
import CustomLink from './link';
import style from './style.css';

function filterChecked(arr = []) {
  return arr.reduce((sum, item) => {
    if (item.checked) {
      return [...sum, Object.assign({}, item, {
        id: `temp${new Date().valueOf()}${Math.random()}`,
        category_children: filterChecked(item.category_children),
      })];
    }
    return [...sum, ...filterChecked(item.category_children)];
  }, []);
}

class AddMenuDetail extends React.Component {
  componentWillMount() {
    const props = this.props;
    props.dispatch({ type: types.INIT });
    if (props.params.isApp > 2) {
      props.dispatch({
        type: types.GET_DIY_SPECIAL_APP,
        siteUid: props.params.siteUid,
      });
    }
    props.dispatch({
      type: types.SHOW_DATA_SOURCE,
      siteUid: props.params.siteUid,
    });
    props.dispatch({
      type: types.getDaliyCate,
      siteUid: props.params.siteUid,
    });
  }
  componentDidMount() {
    const props = this.props;
    const tempId = `temp${new Date().valueOf()}`;
    if (props.params.operate === 'new') {
      return props.dispatch(newMenu(props.params.siteUid, tempId, props.params.menuName));
    } else if (props.params.operate === 'copy') {
      if (props.params.toSiteUid) {
        return props.dispatch({
          type: types.NEW_COPY_API,
          menuId: props.params.menuId,
          tempId,
          menuName: props.params.menuName,
          toSiteUid: props.params.toSiteUid,
        });
      }
      return props.dispatch({
        type: types.SHOW_CATEGORYS,
        menuId: props.params.menuId,
        tempId,
        menuName: props.params.menuName,
      });
    }
    return props.dispatch({ type: types.INIT });
  }
  loopList(c, index = 0) {
    const count = c || [];
    if (count.length > 0) {
      return count.map((item) => {
        const title = item.category_raw_title_en ? `${item.category_title}(${item.category_raw_title_en})` : `${item.category_title}`;
        return (
          <Tree.TreeNode
            title={title}
            key={item.category_id}
            item={item}
            // disableCheckbox={!!(this.props.forbid.find(v => item.category_id == v))} // 此处修改判断条件
          >
            {this.loopList(item.category_children, index + 1)}
          </Tree.TreeNode>
        );
      });
    }
    return null;
  }
  render() {
    const props = this.props;
    if (props.load) {
      return (
        <Card
          title={props.menuDetails.menu_name}
          bordered={false}
          bodyStyle={{ padding: '15px' }}
        >
          <div className={style.menuCateLeft}>
            {
              props.menuDetails.position_id !== '4' &&
              <Card
                title="数据源"
                className={style.categoryBg} bodyStyle={{ padding: '10px 10px 15px' }}
              >
                <Tree
                  className={style.categoryList}
                  checkable multiple
                  checkedKeys={props.selected}
                  onCheck={
                    (info, e) => {
                      props.dispatch(commit('selected', info));
                      props.dispatch(toggleChecked(e.node.props.eventKey, e.checked));
                    }
                  }
                >
                  {this.loopList(props.dataSource)}
                </Tree>
                <div className={style.menuButton}>
                  <Button
                    onClick={
                      () => {
                        props.dispatch(addNomalCate(filterChecked(props.dataSource)));
                      }
                    }
                  >配置到菜单
                  </Button>
                </div>
              </Card>
            }
            <CustomLink {...props} />
          </div>
          <div className={style.menuCateRight}>
            {
              props.loadDetails
                ?
                  <MenuDetailsTree {...props} />
                :
                  <Spin size="large" />
            }
          </div>
        </Card>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}
AddMenuDetail.propTypes = {
  dispatch: PropTypes.func,
  menu_name: PropTypes.string,
  params: PropTypes.shape({}),
  forbid: PropTypes.arrayOf(PropTypes.number),
};
const propsMaptoState = state => state['menus/add'];
export default connect(propsMaptoState)(AddMenuDetail);
