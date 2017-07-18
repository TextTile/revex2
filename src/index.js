import React from 'react';
import ReactDOM from 'react-dom';
import App from './local/UI/App';
import store from './local/store/store';
import { Provider } from 'react-redux'

const rootEl = document.getElementById('root')

function render(Root) {
  ReactDOM.render(<Provider store={store}>
      <Root />
  </Provider>, rootEl)
}


if (module.hot) {
    module.hot.accept('./local/UI/App', () => {
      const NextApp = require('./local/UI/App').default;
      render(NextApp);
    }); 
}


render(App);
