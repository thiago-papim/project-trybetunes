import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../components/style.css';

class ProfileEdit extends React.Component {
  state = {
    load: true,
    name: '',
    email: '',
    image: '',
    description: '',
    carregando: false,
  };

  async componentDidMount() {
    const usuario = await getUser();
    const { name, email, image, description } = usuario;
    this.setState({
      load: false,
      name,
      email,
      image,
      description,
      btn: true,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.edit());
  };

  edit = () => {
    const { name, image, description } = this.state;
    const testName = (name.length > 0 && image.length > 0 && description.length > 0);
    if (testName === true) {
      this.setState({ btn: '' });
    }
  };

  clickEdit = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ carregando: true });
    const { history } = this.props;
    await updateUser({ name, email, image, description });
    this.setState({ carregando: '' });
    history.push('/profile');
  };

  render() {
    const { load, name, email, image, description, btn, carregando } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header props={ this.props } />
        <p>Editar perfil</p>
        { load ? <Loading /> : '' }
        <form className="formEdit">
          <label htmlFor="nome">
            Nome:
            <input
              name="name"
              className="inputEdit"
              type="text"
              id="nome"
              data-testid="edit-input-name"
              value={ name }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              className="inputEdit"
              type="email"
              id="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ (event) => this.handleChange(event) }
              required
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              className="inputEdit"
              type="text"
              id="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              name="image"
              className="inputEdit"
              type="text"
              id="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <input
            type="button"
            data-testid="edit-button-save"
            onClick={ () => this.clickEdit() }
            value="Salvar"
            disabled={ btn }
          />
        </form>
        {carregando ? <Loading /> : ''}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
