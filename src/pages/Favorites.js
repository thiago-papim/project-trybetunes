import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  state = {
    musics: '',
    load: true,
  };

  async componentDidMount() {
    const favoritas = await getFavoriteSongs();
    this.setState({ load: false });
    const favorite = favoritas.map((element) => element.trackId);
    const musics = favoritas.map((musica) => (
      <div key={ musica.trackId } className="cardMusic">
        <MusicCard
          url={ musica.previewUrl }
          name={ musica.trackName }
          trackId={ musica.trackId }
          music={ musica }
          favoritas={ favorite }
        />
      </div>
    ));
    this.setState({ musics });
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  render() {
    const { musics, load } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header props={ this.props } />
        <p>Favoritos</p>
        { load ? <Loading /> : '' }
        { musics }
      </div>
    );
  }
}

export default Favorites;
