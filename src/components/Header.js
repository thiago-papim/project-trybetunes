import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    name: '',
    load: true,
  };

  async componentDidMount() {
    const obj = await getUser();
    const { name } = obj;
    this.setState({
      name,
      load: false,
    });
  }

  render() {
    const { name, load } = this.state;
    const nameLogin = <p data-testid="header-user-name">{ `Usuário: ${name}` }</p>;
    return (
      <header data-testid="header-component">
        { load ? <Loading /> : nameLogin }
      </header>
    );
  }
}

export default Header;
