import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { changeValue, login } from './action';
import style from './style.css';

const reqImg = require.context('./image');

class LoginCom extends React.Component {
  componentWillMount() {
  }
  render() {
    const props = this.props;
    return (
      <div className={style.loginBg} style={{ height: window.innerHeight }}>
        <div className={style.loginBorder}>
          <div className={style.loginBorderBg1} />
          <div className={style.loginBorderCon}>
            <div className={style.loginlogo}>
              <img role="presentation" src={reqImg('./logo.png')} alt="logo" />
            </div>
            <h3 className={style.loginTitle}>
              <img className={style.loginIcon} role="presentation" alt="icon" src={reqImg('./icon.png')} />
              营销管理系统
            </h3>
            <form
              className={style.loginBorderBg}
              onSubmit={(e) => {
                e.preventDefault();
                props.dispatch(login(props.name, props.password, props.referpage));
              }}
            >
              <span className={style.loginLeft}>用户名：</span>
              <Input
                type="text" value={props.name}
                placeholder="用户名" className={style.loginInput}
                name="username"
                onChange={e => props.dispatch(changeValue('name', e.target.value))}
              />
              <hr className={style.hr} />
              <span className={style.loginLeft}>密码：</span>
              <Input
                type="password" value={props.password} name="password"
                placeholder="密码" className={style.loginInput}
                onChange={e => props.dispatch(changeValue('password', e.target.value))}
              />
              <hr className={style.hr} />
              <Button type="primary" className={style.loginButton} htmlType="submit">登录</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const propsMaptoState = state => state['user/login'];
export default connect(propsMaptoState)(LoginCom);
