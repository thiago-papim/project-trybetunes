import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './ProfileEdit';
import '../components/styleProfile.css';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    load: true,
  };

  async componentDidMount() {
    const usuario = await getUser();
    const { name, email, image, description } = usuario;
    this.setState({
      name,
      email,
      image,
      description,
      load: false,
    });
  }

  render() {
    const { history } = this.props;
    const { name, email, image, description, load } = this.state;
    const perfil = (
      <div className="divProfile">
        <img
          src={ image || 'https://api.ejcomp.com.br/members/1586969992913-perfilsemfoto.jpg' }
          alt={ `Foto de ${name}` }
          data-testid="profile-image"
        />
        <p>{name}</p>
        <p>{email}</p>
        <p className="description">{description}</p>
        <button
          onClick={ () => history.push('/profile/edit') }
        >
          Editar perfil

        </button>
      </div>);
    return (
      <div data-testid="page-profile">
        <Header props={ this.props } />
        { load ? <Loading /> : perfil }
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
