const defaultUserInfo = {};
let userInfo = defaultUserInfo;

export const getUserInfo = () => userInfo;

export function setUserInfo(info = defaultUserInfo) {
  userInfo = info;
}
