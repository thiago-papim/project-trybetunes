import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artist: '',
    musics: '',
    album: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const arr = await getMusics(id);
    const filterMusic = arr.filter((element) => element.wrapperType === 'track');
    const musics = filterMusic.map((musica) => (
      <div key={ musica.trackId }>
        <MusicCard
          url={ musica.previewUrl }
          name={ musica.trackName }
          trackId={ musica.trackId }
        />
      </div>
    ));
    this.setState({
      artist: arr[0].artistName,
      musics,
      album: arr[0].collectionName,
    });
  }

  render() {
    const { artist, album, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header props={ this.props } />
        <h1 data-testid="artist-name">{ artist }</h1>
        <h2 data-testid="album-name">{ album }</h2>
        { musics }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
