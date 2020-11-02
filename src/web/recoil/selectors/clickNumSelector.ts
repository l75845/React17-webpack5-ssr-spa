import { selector } from 'recoil';
import clickState from '../atoms/clickNumState';

const getClickState = selector({
  key: 'getClickState',
  get: ({ get }) => `click ${get(clickState)}`,
});

export default getClickState;
