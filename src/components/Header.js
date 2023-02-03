import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './style.css';
import '../images/som.png';

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
        <div className="usuario">
          <img src="https://seeklogo.com/images/S/sua-musica-logo-FB924E2959-seeklogo.com.png" alt="som" />
          { load ? <Loading /> : nameLogin }
        </div>
        <div className="links">
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Musicas Favoritas
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
