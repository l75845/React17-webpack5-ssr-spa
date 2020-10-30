import React from 'react';
import loginCSS from './index.module.css';

const Login = () => {
  const clickHandler = () => {
    console.log('click');
  };

  return (
    <div className={loginCSS.login}>
      <h1>login</h1>
      <button onClick={clickHandler} type="button">click</button>
    </div>
  );
};

export default Login;
