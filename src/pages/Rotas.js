import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

class Rotas extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/trybetunes/search" component={ Search } />
        <Route path="/trybetunes/album/:id" component={ Album } />
        <Route path="/trybetunes/favorites" component={ Favorites } />
        <Route path="/trybetunes/profile/edit" component={ ProfileEdit } />
        <Route path="/trybetunes/profile" component={ Profile } />
        <Route exact path="/trybetunes" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Rotas;
