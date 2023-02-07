import React from 'react';
import PropTypes from 'prop-types';
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
    const { props: { history } } = this.props;

    const nameLogin = <p data-testid="header-user-name">{ `Bem-vindo ${name}` }</p>;
    return (
      <header data-testid="header-component">
        <div className="usuario">
          <img
            src="https://seeklogo.com/images/S/sua-musica-logo-FB924E2959-seeklogo.com.png"
            alt="som"
          />
          { load ? <Loading /> : nameLogin }
        </div>
        <div className="links">
          <button
            id="teste"
            data-testid="link-to-search"
            value="Pesquisa"
            onClick={ () => history.push('/search') }
            className="inputButton"
          >
            Pesquisa

          </button>
          <input
            type="button"
            data-testid="link-to-favorites"
            value="Musicas Favoritas"
            onClick={ () => history.push('/favorites') }
            className="inputButton"
          />
          <input
            type="button"
            data-testid="link-to-profile"
            value="Perfil"
            onClick={ () => history.push('/profile') }
            className="inputButton"
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Header;
