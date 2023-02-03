import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumApi from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    btnPesquisa: true,
    search: '',
    musics: '',
    resultado: '',
    validar: false,
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

  searchMusic = async () => {
    const { search } = this.state;
    const arrAlbum = await searchAlbumApi(search);
    if (arrAlbum.length === 0) this.setState({ musics: '' });
    if (arrAlbum.length > 0) this.setState({ musics: arrAlbum });
    this.setState({ resultado: search, search: '', validar: true });
  };

  arrMusic = () => {
    const { musics } = this.state;
    return musics
      .map((cd) => (
        <div key={ cd.collectionName }>
          <p>
            {cd.collectionName}
          </p>
          <Link
            to={ `/album/${cd.collectionId}` }
            data-testid={ `link-to-album-${cd.collectionId}` }
          >
            Detalhes

          </Link>
        </div>));
  };

  render() {
    const { search, btnPesquisa, musics, resultado, validar } = this.state;
    const result = musics ? (
      <div>
        <h3>{`Resultado de álbuns de: ${resultado}`}</h3>
        {this.arrMusic()}
      </div>) : <p>Nenhum álbum foi encontrado</p>;
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
            onClick={ this.searchMusic }
          />
        </form>
        <div>
          { validar ? result : ''}
        </div>
      </div>
    );
  }
}

export default Search;