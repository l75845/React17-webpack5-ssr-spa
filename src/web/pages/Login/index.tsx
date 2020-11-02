import React from 'react';
import getClickState from '@recoil/selectors/clickNumSelector';
import clickState from '@recoil/atoms/clickNumState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import loginCSS from './index.module.css';

const Login = () => {
  const clickText = useRecoilValue(getClickState);
  const setClickNum = useSetRecoilState(clickState);

  const clickHandler = () => {
    setClickNum((prodState) => prodState + 1);
  };

  return (
    <div className={loginCSS.login}>
      <h1>login</h1>
      <button onClick={clickHandler} type="button">click</button>
      <span>{clickText}</span>
    </div>
  );
};

export default Login;
