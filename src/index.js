import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Welcome from './Welcome'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();

// ReactDOM.render(
//   <Welcome name="小张张" />,
//   document.getElementById('root')
// )