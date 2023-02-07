import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
    check: false,
  };

  componentDidMount() {
    const { favoritas, music } = this.props;
    const { trackId } = music;
    const verifica = favoritas.some((id) => id === trackId);
    this.setState({ check: verifica });
  }

  addFavorite = async (event, music) => {
    const { target: { checked } } = event;
    const { trackId } = music;
    this.setState({ load: true });
    const favorites = await getFavoriteSongs();
    const verifica = favorites.some((element) => element.trackId === trackId);
    if (checked === true && verifica === false) {
      await addSong(music);
    }
    if (checked === false) {
      await removeSong(music);
    }
    this.setState({ load: false, check: checked });
  };

  render() {
    const { url, name, trackId, music } = this.props;
    const { load, check } = this.state;
    return (
      <div>
        { load ? <Loading /> : ''}
        <h5>{ name }</h5>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <form>
          <label htmlFor="favorita">
            Favorita
            <input
              id="favorita"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ (event) => this.addFavorite(event, music) }
              checked={ check }
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.func.isRequired,
  favoritas: PropTypes.shape({
    some: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MusicCard;
