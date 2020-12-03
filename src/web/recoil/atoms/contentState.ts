import { atom } from 'recoil';

const contentState = atom<Window['__INITIAL__DATA__']>({
  key: 'contentData',
  default: {},
});

export default contentState;
