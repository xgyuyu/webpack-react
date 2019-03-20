import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getPermission } from '../../lib/permission';

const SubMenu = Menu.SubMenu;
const Sider = ({
  menus,
  current,
}) => {
  const defaultOpenKeys = menus.filter(menu => menu.children.findIndex(item => item.link === current) > -1).map(menu => menu.key);
  return (
    <Menu
      selectedKeys={[current]}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline" theme="dark"
    >{
      menus.map(({
 name, key, icon, children,
}) => (
  <SubMenu
    key={key} title={<span><Icon type={icon} /><span>{name}</span></span>}
  >
    {
            children.filter(({ nav, permission }) => (
              !!nav && (permission ? permission & getPermission() : true)
            )).map(prop => (
              <Menu.Item key={prop.link}>
                <Link to={prop.link} style={{ marginLeft: '-30px' }}>
                  <Icon type={prop.icon} /> {prop.name}
                </Link>
              </Menu.Item>
            ))
          }
  </SubMenu>
      ))
    }
    </Menu>
  );
};

Sider.propTypes = {
  current: PropTypes.string,
  menus: PropTypes.arrayOf(PropTypes.shape()),
};
export default Sider;

