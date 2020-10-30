import React from 'react';
import { Link } from 'react-router-dom';
import Routes from 'web/routes';
import './index.module.css';
import '@assets/styles/global.css';
import '@assets/styles/jquery.fullpage.min.css';
import { RecoilRoot } from 'recoil';

const App = () => (
  <RecoilRoot>
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
