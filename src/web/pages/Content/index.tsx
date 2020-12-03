import React, { useEffect } from 'react';
import contentState from '@recoil/atoms/contentState';
import { useRecoilState } from 'recoil';
import contentApi from 'web/services/contentApi';
import contentCSS from './index.module.css';

const Content = () => {
  const [getContentState, setContentState] = useRecoilState(contentState);
  useEffect(() => {
    if (!getContentState || JSON.stringify(getContentState) === '{}') {
      contentApi()
        .then((res: { data: {} }) => {
          console.log(res.data);
          setContentState(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  return <div className={contentCSS.content}>{getContentState?.name}</div>;
};

export default Content;
