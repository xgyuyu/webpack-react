import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersTable from './usersTable';
import { init } from './action';


class UserManage extends React.Component {
  componentWillMount() {
    this.props.dispatch(init());
  }
  render() {
    const props = this.props;
    return (
      <div>
        <UsersTable {...props} />
      </div>
    );
  }
}
UserManage.propTypes = {
  dispatch: PropTypes.func,
};
const propsMaptoState = state => state['user/userManagement/list'];
export default connect(propsMaptoState)(UserManage);
