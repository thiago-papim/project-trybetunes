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
    const usuario = await getUser();
    const { image } = usuario;
    this.setState({
      name,
      load: false,
      image,
    });
  }

  render() {
    const { name, load, image } = this.state;
    const { props: { history } } = this.props;
    const imagem = image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const nameLogin = <p data-testid="header-user-name">{ `Bem-vindo ${name}` }</p>;
    const nameImage = (
      <>
        { nameLogin }
        <img className="perfil" src={ imagem } alt="" />
      </>
    );
    return (
      <header data-testid="header-component">
        <div className="usuario">
          <img
            className="logo"
            src="https://seeklogo.com/images/S/sua-musica-logo-FB924E2959-seeklogo.com.png"
            alt="som"
          />
          { load ? <Loading /> : nameImage }
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
