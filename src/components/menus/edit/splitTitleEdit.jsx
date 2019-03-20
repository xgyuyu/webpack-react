import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { commit } from './action';
import style from './style.css';

const NormalEdit = props => (
  <div>
    <span className={style.newspan}>字体颜色:</span>
    <div style={{ marginLeft: '80px', marginTop: '35px' }}>
      <SketchPicker
        className={style.colorWidth}
        color={props.color}
        onChangeComplete={v => props.dispatch(commit('color', v.hex))}
      />
    </div>
  </div>
);

NormalEdit.propTypes = {
  dispatch: PropTypes.func,
  color: PropTypes.string,
};
export default NormalEdit;
