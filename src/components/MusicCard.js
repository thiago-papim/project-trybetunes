import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { url, name } = this.props;
    return (
      <div>
        <h5>{ name }</h5>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {/* <form>
          <label htmlFor="favorita">
            Favorita
            <input
              id="favorita"
              type="checkbox"
              // data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </form> */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // trackId: PropTypes.string.isRequired,
};

export default MusicCard;
