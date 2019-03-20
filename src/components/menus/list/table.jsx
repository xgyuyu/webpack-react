import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Icon, Popconfirm, Tooltip, Pagination, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { EditModal, AddModal } from './modal';
import * as types from './types';
import changeValue, { fetchParams, showConfigAll, getSitegroup } from './action';
import style from './style.css';

const confirm = Modal.confirm;

const menusDetailsTable = props => (
  <div>
    <div>
      <Table
        rowKey="menu_id" dataSource={props.configAllData} className={style.antTable} pagination={false}
        columns={
        [{
          title: '菜单',
          dataIndex: 'menu_name',
          key: 'menu',
          render: (text, record) => (
            <div>
              <Link
                to={`/menus/edit/${record.site_uid}/${record.menu_id}/${record.site_platform ? record.site_platform : 1}/${record.position_id}`}
                title="编辑菜单"
              >
                <Icon type="link" /> {text}
              </Link>
              <Tooltip title="修改菜单名称" placement="right">
                <a
                  className={style.tableMargin}
                  style={{ color: '#666' }}
                  disabled={parseInt(record.menu_status, 10) === 3}
                  onClick={() => {
                    props.dispatch(changeValue('editTitle', text));
                    props.dispatch({
                      type: types.INIT_MENU_NAME, value: text, editId: record.menu_id,
                    });
                    props.dispatch(changeValue('visible', true));
                  }
                    }
                ><Icon type="edit" title="修改菜单名称" />
                </a>
              </Tooltip>
            </div>
            ),
        }, {
          title: '站点',
          dataIndex: 'site_name',
          width: '20%',
          key: 'site',
        }, {
          title: '更新时间',
          dataIndex: 'last_update_time',
          key: 'time',
          width: '15%',
          sorter: (a, b) => {
            const aTime = a.last_update_time.replace(/-/g, '/');
            const bTime = b.last_update_time.replace(/-/g, '/');
            const aDate = new Date(aTime);
            const bDate = new Date(bTime);
            return (aDate - bDate);
          },
        }, {
          title: '位置',
          dataIndex: 'position_id',
          width: '15%',
          key: 'position',
          render: position => (<span>{['首边', '底边', '侧边', 'discount list', '新首边'][parseInt(position, 10) - 1]}</span>),
        }, {
          title: '状态',
          dataIndex: 'menu_status',
          key: 'status',
          width: '15%',
          render: (text, record) => (
              parseInt(text, 10) === 2
                ?
                  <a
                    onClick={() => window.open(`${record.site_domain}/preview/${Number(record.position_id) === 5 ? 'menu2' : 'menu'}?menu_id=${record.menu_id}`)}
                  >
                    <Icon type="eye-o" /> {Number(record.position_id) === 5 ? '预览 new' : '预览'}
                  </a>
                :
                ['待发布', '预览', '发布', '已删除'][parseInt(text, 10) - 1]
            ),
        }, {
          title: '发布',
          dataIndex: 'menu_status',
          key: 'operation',
          render: (text, record) => (
            <Button
              disabled={record.dataLoading || parseInt(text, 10) === 3}
              onClick={() => {
                if (text >= '3') return;
                let release = false;
                if (text === '2') {
                  release = true;
                }
                confirm({
                  title: `您想要${['待预览', '预览', '发布', '不可操作'][parseInt(text, 10)]}此菜单了吗 ?`,
                  content: '请谨慎操作 !',
                  onOk() {
                    props.dispatch(fetchParams(
                      types.EDIT_CONDIG_MENU_STATUS,
                          {
                            menu_id: record.menu_id,
                            menu_name: record.menu_name,
                            menu_status: parseInt(record.menu_status, 10) + 1,
                            site_uid: record.site_uid,
                            currentPage: props.currentPage,
                            searching: props.searching,
                            release,
                            searchParams: {
                              site_uid: props.site,
                              menu_name: props.menuName,
                              menu_status: props.menuStatus,
                              p: props.currentPage,
                            },
                          },
                        ));
                    if (parseInt(text, 10) === 1) {
                      window.open(`${record.site_domain}/preview/${Number(record.position_id) === 5 ? 'menu2' : 'menu'}?menu_id=${record.menu_id}`);
                    }
                  },
                  onCancel() {},
                });
              }}
            >{['待预览', Number(record.position_id) === 5 ? '预览 new' : '预览', '发布', '不可操作'][parseInt(text, 10)] || '不可操作'}
            </Button>
            ),
        }, {
          title: '操作',
          width: 200,
          render: record => (
            <div>
              <Popconfirm
                placement="left"
                title="确认要复制此菜单吗?"
                onConfirm={
                    () => {
                      props.dispatch(getSitegroup(record.site_uid));
                      props.dispatch(changeValue('addMenuName', record.menu_name));
                      props.dispatch(changeValue('copyId', record.menu_id));
                      props.dispatch(changeValue('copySiteUid', record.site_uid));
                      props.dispatch(changeValue('isApp', record.site_platform ? record.site_platform : '1'));
                      props.dispatch(changeValue('addMenuVisible', true));
                    }
                  }
              >
                <Button className={style.tableMargin} type="ghost">
                    复制 <Icon type="copy" />
                </Button>
              </Popconfirm>
              <Popconfirm
                placement="left" title="确认要删除此菜单吗?"
                onConfirm={() => {
                  props.dispatch(fetchParams(
                    types.EDIT_CONDIG_MENU_STATUS,
                        {
                          menu_id: record.menu_id,
                          menu_name: record.menu_name,
                          menu_status: 4,
                          currentPage: props.currentPage,
                          searching: props.searching,
                          searchParams: {
                            site_uid: props.site,
                            menu_name: props.menuName,
                            menu_status: props.menuStatus,
                            p: props.currentPage,
                          },
                        },
                      ));
                }}
              >
                <Button
                  disabled={parseInt(record.menu_status, 10) === 3 && record.position_id != 4}
                  type="ghost"
                >
                    删除 <Icon type="delete" />
                </Button>
              </Popconfirm>
            </div>
            ),
        }]
        }

      />
      <div className={style.pageBg}>
        <Pagination
          onChange={(page) => {
            props.dispatch(changeValue('currentPage', page));
            if (props.searching) {
              return props.dispatch(fetchParams(
                types.SEARCH,
                {
                  site_uid: props.site,
                  menu_name: props.menuName,
                  menu_status: props.menuStatus,
                  p: page,
                },
                ));
            }
            return props.dispatch(showConfigAll(page));
          }}
          current={props.currentPage}
          total={props.total} pageSize={10}
          className={style.page}
        />
      </div>
    </div>
    <EditModal {...props} />
    <AddModal {...props} />
  </div>
);
menusDetailsTable.propTypes = {
  configAllData: PropTypes.arrayOf(PropTypes.shape({})),
  site: PropTypes.string,
  release: PropTypes.bool,
  dispatch: PropTypes.func,
  editId: PropTypes.string,
  total: PropTypes.number,
  currentPage: PropTypes.number,
  searching: PropTypes.bool,
  menuName: PropTypes.string,
  menuStatus: PropTypes.string,
};
export default menusDetailsTable;
