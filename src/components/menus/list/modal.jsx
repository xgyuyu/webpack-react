import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Modal, Input, message, Select, Spin } from 'antd';
import changeValue, { fetchParams } from './action';
import * as types from './types';

const EditModal = (props) => {
  if (!props.visible) return null;
  const record = props.configAllData.find(item => item.menu_id === props.editId);
  return (
    <Modal
      title="修改菜单名称"
      visible={props.visible}
      onOk={() => {
        if (props.editTitle.trim() === record.menu_name) {
          return props.dispatch(changeValue('visible', false));
        }
        if (props.editTitle && props.editTitle.trim().length) {
          props.dispatch(fetchParams(
            types.EDIT_CONDIG_MENU_STATUS,
              {
                menu_id: record.menu_id,
                menu_name: props.editTitle || record.menu_name,
                menu_status: record.menu_status,
                site_uid: props.site,
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
          return props.dispatch(changeValue('visible', false));
        }
        return message.warning('请输入有效的菜单名');
      }}
      onCancel={() => {
        props.dispatch(changeValue('visible', false));
      }}
    >
      <Input
        placeholder={record.menu_name}
        value={props.editTitle}
        onChange={e => props.dispatch(changeValue('editTitle', e.target.value))}
      />
    </Modal>
  );
};
EditModal.propTypes = {
  configAllData: PropTypes.arrayOf(PropTypes.shape({})),
  dispatch: PropTypes.func,
  visible: PropTypes.bool,
  editTitle: PropTypes.string,
  site: PropTypes.string,
  currentPage: PropTypes.string,
  searching: PropTypes.string,
  menuName: PropTypes.string,
  menuStatus: PropTypes.string,
  editId: PropTypes.string,
};

const AddModal = (props) => {
  if (!props.addMenuVisible) return null;
  return (
    <Modal
      title="新建菜单"
      visible={props.addMenuVisible}
      onOk={
        () => {
          if (!props.addMenuName || props.addMenuName.trim().length < 1) {
            return message.warning('请输入有效名称');
          }
          if (props.originalNames.indexOf(props.addMenuName.trim()) > -1) {
            return message.warning('已经有相同的菜单名');
          }
          if (props.copyId && !props.toSite) {
            return message.warning('请选择站点');
          }
          props.dispatch(changeValue('addMenuVisible', false));
          if (props.copyId && props.copyId.length) {
            const {
              toSite, copySiteUid, addMenuName, copyId, isApp,
            } = props;
            // 复制逻辑，是使用原site 还是使用用户选择的site
            const siteOrTosite = !toSite || (toSite === copySiteUid) ? copySiteUid : toSite;
            // 是否使用换站复制接口
            const flag = toSite && (toSite !== copySiteUid) ? toSite : '';
            const param = `${siteOrTosite}/${addMenuName}/copy/${copyId}/${isApp}/${flag}/`;
            return props.dispatch(push(`/menus/add/${param}`));
          }
          return props.dispatch(push(`/menus/add/${props.site}/${props.addMenuName}/new/empty/${props.isApp}/`));
        }
      }
      onCancel={() => {
        props.dispatch(changeValue('addMenuVisible', false));
        props.dispatch(changeValue('copyId', ''));
        props.dispatch(changeValue('sitesGroup', []));
        props.dispatch(changeValue('toSite', ''));
      }}
    >
      <Input
        placeholder="菜单名称"
        value={props.addMenuName}
        onChange={e => props.dispatch(changeValue('addMenuName', e.target.value))}
      />
      {
        props.copyId &&
          <Spin spinning={!props.sitesGroup.length}>
            <Select
              placeholder="请选择站点"
              style={{ width: '100%', marginTop: '15px' }}
              value={props.toSite}
              onChange={v => props.dispatch(changeValue('toSite', v))}
            >
              {
                props.sitesGroup.map(v => (
                  <Select.Option key={v.site_uid}>{v.site_name}</Select.Option>
                ))
              }
            </Select>
          </Spin>
      }
    </Modal>
  );
};

AddModal.propTypes = {
  addMenuVisible: PropTypes.bool,
  addMenuName: PropTypes.string,
  copyId: PropTypes.string,
  dispatch: PropTypes.func,
  originalNames: PropTypes.arrayOf(PropTypes.shape({})),
  sitesGroup: PropTypes.arrayOf(PropTypes.shape({})),
  copySiteUid: PropTypes.string,
  isApp: PropTypes.number,
  toSite: PropTypes.string,
  site: PropTypes.string,
};

export {
  EditModal,
  AddModal,
};
