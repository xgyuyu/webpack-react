import RawDecorate from 'rrc-loader-helper/src/reducer-decorate';

import cancelable from './middlewares/cancelable';

export default function decorate(fn, page) {
  return cancelable(RawDecorate(fn, page), page);
}
