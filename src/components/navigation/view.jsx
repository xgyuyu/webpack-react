import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackTop, Breadcrumb, Spin, Modal, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Sider from './sider';
import styles from './style.css';
import { getUserInfo } from '../../lib/userInfo';

const confirm = Modal.confirm;
const showConfirm = (dispatch) => {
  confirm({
    title: '确定要退出吗',
    onOk() {
      dispatch({ type: 'user_my_account_log_out' });
    },
    onCancel() {},
  });
};
class Navigation extends Component {
  componentWillMount() {
    this.props.dispatch({ type: 'nav_init_user_info' });
  }
  render() {
    if (this.props.load) {
      const {
        linkList, children, current, menus,
      } = this.props;
      const routerMatchList = linkList.filter(({ link }) => current.startsWith(link))
        .sort((item1, item2) => item1.link.length > item2.link.length);
      document.title = [...routerMatchList].reverse()[0]
        ?
        [...routerMatchList].reverse()[0].name : '';
      return (
        <div className={styles.antLayoutAside}>
          <aside
            className={styles.antLayoutSider}
            style={{ width: this.props.expandable === 'expand' ? '180px' : '0px' }}
          >
            <div className={styles.antLayoutLogo} >营销中心</div>
            <Sider current={current} menus={menus} routerMatchList={routerMatchList} />
          </aside>

          <div
            className={styles.antLayoutMain}
            style={{ marginLeft: this.props.expandable === 'expand' ? '180px' : '0px' }}
          >
            <div className={styles.antLayouttop}>
              <Breadcrumb style={{ display: 'inline-block' }}>
                <Button
                  type="ghost"
                  shape="circle-outline"
                  className={styles.expandBtn}
                  onClick={() => (
                    this.props.dispatch({
                        type: 'nav_expand',
                        value: this.props.expandable === 'expand' ? 'close' : 'expand',
                      })
                  )}
                ><Icon
                  type="swap"
                  style={{ fontSize: '15px' }}
                />
                </Button>
                {
                  routerMatchList
                    .map(({ link, crubName, name }) => (
                      <Breadcrumb.Item key={link}>
                        <Link className={styles.linkcolor} to={link}>{crubName || name}</Link>
                      </Breadcrumb.Item>
                    ))
                }
                <div className={styles.antLayoutright}>
                  <Link
                    to="/user/myAccount"
                  >{getUserInfo().userName ? getUserInfo().userName : '我的信息'}
                  </Link>
                  <a
                    onClick={() => showConfirm(this.props.dispatch)}
                  >退出
                  </a>
                </div>
              </Breadcrumb>
            </div>
            <div>
              <div className={styles.antLayoutContent}>
                <BackTop />
                {children}
              </div>
            </div>
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

Navigation.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  children: PropTypes.element,
  current: PropTypes.string,
  linkList: PropTypes.arrayOf(PropTypes.shape({})),
  menus: PropTypes.arrayOf(PropTypes.shape({})),
  expandable: PropTypes.string,
};

const mapStateToProps = state => state.navigation;

export default connect(mapStateToProps)(Navigation);
