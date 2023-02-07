import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './ProfileEdit';

class Profile extends React.Component {
  state = {
    user: '',
    load: true,
  };

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ user: usuario, load: false });
  }

  render() {
    const { history } = this.props;
    const { user, load } = this.state;
    const { name, email, image, description } = user;
    console.log(user);
    const perfil = (
      <>
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        <img
          src={ image }
          alt={ `Foto de ${name}` }
          data-testid="profile-image"
        />
        <button
          onClick={ () => history.push('/profile/edit') }
        >
          Editar perfil

        </button>
      </>);
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
