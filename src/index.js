import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './Components/App';

import registerServiceWorker from './registerServiceWorker';

import './css/bootstrap.min.css';
import './css/style.css';

/*
 fonts Import here
*/
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Karla', 'Lato', 'Open Sans', 'Roboto', 'sans-serif']
  }
});



const Root = () => {
    return (
      <Router>
        <div className="container h-100">
          <Switch>
            <Route path="/" exact component={App} />
          </Switch>
        </div>
      </Router>
    )
  }


render(<Root />, document.getElementById('root'));
registerServiceWorker();
