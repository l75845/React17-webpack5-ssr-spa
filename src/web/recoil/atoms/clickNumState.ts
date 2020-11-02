import { atom } from 'recoil';

const clickState = atom({
  key: 'clickState',
  default: 0,
});

export default clickState;
