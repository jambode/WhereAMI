import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Success from './Success';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
 
const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  );
ReactDOM.hydrate(<Routes />, document.getElementById('root'));
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();