import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './ProfileEdit';
import '../components/styleProfile.css';

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
      <div className="divProfile">
        <img
          src={ image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }
          alt=""
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
