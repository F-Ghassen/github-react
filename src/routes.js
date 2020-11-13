import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main/Main';
import Repository from './pages/Repository/Repository';
import Repositories from './pages/Repositories/Repositories';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/repos/:user/:repo" component={Repository} />
        <Route path="/users/:user/repos" component={Repositories} />
      </Switch>
    </BrowserRouter>
  );
}
