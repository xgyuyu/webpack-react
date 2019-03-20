import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import assign from 'object-assign';
import * as types from './types';
import { commit } from './action';
import BannerEdit from './bannerEdit';
import NormalEdit from './normalEdit';
import SplitTitleEdit from './splitTitleEdit';


const renderEdit = (props, type) => {
  switch (type) {
    case 7:
      return <BannerEdit {...props} />;
    case 8:
      return <SplitTitleEdit {...props} />;
    default:
      return <NormalEdit {...props} />;
  }
};

const Editmodal = props => (
  <Modal
    title={props.items.category_raw_title}
    visible={props.open} width={750}
    onOk={() => {
        if (props.nameValue === '') return;
        const mseeages = props.imageMsgs.map(item => assign({}, item, {
            imgUrl: item.imgUrl || '',
            alt: item.alt || '',
            alt2: item.alt2 || '',
          }));
        const imgMsg = mseeages.filter(item => item.target && item.target !== '');
        props.dispatch(commit('open', false));
        props.dispatch({
          type: types.EDIT_EVERY_CATE,
          data: {
            category_title: props.nameValue,
            category_color: props.color,
            bold: props.bold,
            rec_content: props.rec_content,
            category_link: Number(props.items.category_type) === 2 || Number(props.items.category_type) === 10 ?
              props.cateLink : Symbol('noNeed'),
            category_virtual_id: parseInt(props.items.category_type, 10) === 4 ?
              props.cateVirId : Symbol('noNeed'),
            product_select_url_id: parseInt(props.items.category_type, 10) === 9 ?
              props.productSelectUrlId : Symbol('noNeed'),
            category_image: imgMsg.map(v => (
              v.img_position ? v : assign({}, v, { img_position: '1' }))),
            category_recommend_imgs: props.category_recommend_imgs.filter(v => v.imgs.every(d => d.target)),
            daily_new_cat: Number(props.items.category_type) === 3 ? (props.daily_new_cat || '').split(',').filter(v => v) : Symbol('noNeed'),
          },
          id: props.items.id,
        });
      }}
    onCancel={() => props.dispatch(commit('open', false))}
  >
    <div>
      <span>名称:</span>
      <Input
        type="text"
        style={{ width: '75%', marginLeft: '15px' }}
        value={props.nameValue}
        placeholder={props.items.category_title}
        onChange={e => props.dispatch(commit('nameValue', e.target.value))}
      />
    </div>
    {
      Number(props.items.category_type) === 10 &&
      <div>
        <span>链接:</span>
        <Input type="text" value={props.cateLink} onChange={e => props.dispatch(commit('cateLink', e.target.value))} style={{ width: '75%', margin: '10px 0 0 15px' }} />
      </div>
    }
    {
      props.items.category_type != 10 && renderEdit(props, Number(props.items.category_type))
    }
  </Modal>
);

Editmodal.propTypes = {
  dispatch: PropTypes.func,
  open: PropTypes.bool,
  cateVirId: PropTypes.string,
  productSelectUrlId: PropTypes.string,
  items: PropTypes.shape(),
  bold: PropTypes.number,
  nameValue: PropTypes.string,
  color: PropTypes.string,
  daily_new_cat: PropTypes.string,
  imageMsgs: PropTypes.arrayOf(PropTypes.shape()),
  category_recommend_imgs: PropTypes.arrayOf(PropTypes.shape()),
  cateLink: PropTypes.string,
  rec_content: PropTypes.shape(),
};
export default Editmodal;
