import { selector, useSetRecoilState } from 'recoil';
import contentApi from 'web/services/contentApi';
import contentState from '../atoms/contentState';

const getClickState = selector({
  key: 'contentSelector',
  get: async ({ get }) => {
    let value = get(contentState);
    const setValue = useSetRecoilState(contentState);
    if (!value || JSON.stringify(value) === '{}') {
      value = await contentApi();
      setValue(value);
    }
    return value;
  },
});

export default getClickState;
