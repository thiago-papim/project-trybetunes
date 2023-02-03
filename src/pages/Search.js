import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    btnPesquisa: true,
    search: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validation(value));
  };

  validation = (valor) => {
    const numberThree = 2;
    if (valor.length >= numberThree) {
      this.setState({ btnPesquisa: '' });
    } else { this.setState({ btnPesquisa: true }); }
  };

  render() {
    const { search, btnPesquisa } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              value={ search }
              type="text"
              id="search"
              name="search"
              placeholder="Nome da banda ou artista"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <input
            type="button"
            data-testid="search-artist-button"
            value="Procurar"
            disabled={ btnPesquisa }
          />
        </form>
      </div>
    );
  }
}

export default Search;
