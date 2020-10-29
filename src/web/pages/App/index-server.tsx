import React from 'react';
import { Link } from 'react-router-dom';
import Routes from 'web/routes/index-server';
import { StaticRouter } from 'react-router-dom';
import './index.module.css';
import '@assets/styles/global.css';
import '@assets/styles/jquery.fullpage.min.css';

const App = (url) => {
  return (
    <>
      <StaticRouter location={url}>
        <h1>
          <Link to="/login">login</Link>
        </h1>
        <h1>
          <Link to="/content">content</Link>
        </h1>
        {Routes()}
      </StaticRouter>
    </>
  );
};

export default App;
