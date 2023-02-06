import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    name: '',
    btnDisabled: true,
    load: false,
  };

  componentDidMount() {
    console.log(this.props);
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validation(value));
  };

  validation = (valor) => {
    const numberThree = 3;
    if (valor.length >= numberThree) {
      this.setState({ btnDisabled: '' });
    } else { this.setState({ btnDisabled: true }); }
  };

  render() {
    const { name, btnDisabled, load } = this.state;
    const { history } = this.props;
    console.log(history);
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Digite seu nome
            <input
              type="text"
              id="name"
              name="name"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <input
            type="button"
            data-testid="login-submit-button"
            value="Entrar"
            disabled={ btnDisabled }
            onClick={ async () => {
              this.setState({ load: true });
              await createUser({ name });
              history.push('/search');
            } }
          />
        </form>
        <h1>{ load ? <Loading /> : '' }</h1>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
