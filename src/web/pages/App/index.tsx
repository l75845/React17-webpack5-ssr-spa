import React from 'react';
import { Link } from 'react-router-dom';
import Routes from 'web/routes/index-server';
import './index.module.css';
import '@assets/styles/global.css';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import contentState from '@recoil/atoms/contentState';

export const getInitialData = () => {
  const initalData = window.__INITIAL__DATA__ || {};
  window.__INITIAL__DATA__ = undefined;
  return initalData;
};
function initializeState({ set }: MutableSnapshot): void {
  set(contentState, getInitialData);
}

const App = () => (
  <RecoilRoot initializeState={initializeState}>
    <h1>
      <Link to="/login">login</Link>
    </h1>
    <h1>
      <Link to="/content">content</Link>
    </h1>
    {Routes()}
  </RecoilRoot>
);

export default App;
