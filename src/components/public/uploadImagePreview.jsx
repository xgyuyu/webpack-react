import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Button, Icon, Input } from 'antd';
import assign from 'object-assign';
import { imgUpload } from '../../services/menus/menus';
import STYLE from './style.css';

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      index: this.props.index,
      siteUid: this.props.siteUid,
    };
  }
  render() {
    const { index, siteUid } = this.state;
    return (
      <div style={{ display: 'flex', lineHeight: '30px' }}>
        <Button className={STYLE.fileInputBg} loading={this.state.loading} icon="upload">上传图片</Button>
        <Input
          type="file" name="file" className={STYLE.fileInput}
          onChange={(e) => {
            const file = e.target.files[0];
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              message.error('文件大小不能超过5M!');
            }
            if (window.FileReader) {
              const fr = new FileReader();
              this.setState({ loading: true });
              fr.onloadend = (event) => {
                imgUpload({
                  param: {
                    thumb: event.target.result,
                    index,
                    siteUid,
                  },
                }).then((v) => {
                  this.setState({ loading: false });
                  this.props.onChange({ width: v.width, height: v.height, target: v.img_url });
                });
              };
              fr.readAsDataURL(file);
            }
          }}
        />
      </div>
    );
  }
}
Avatar.propTypes = {
  index: PropTypes.number,
  siteUid: PropTypes.string,
  onChange: PropTypes.func,
};
export default Avatar;
