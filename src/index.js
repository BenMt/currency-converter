import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App'

// Inject App component in the #app div
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
