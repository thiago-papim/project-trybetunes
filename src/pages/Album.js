// import React from 'react';
// import PropTypes, { element } from 'prop-types';
// import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';
// import MusicCard from '../components/MusicCard';
// import '../components/style.css';
// import { addSong } from '../services/favoriteSongsAPI';

// class Album extends React.Component {
//   state = {
//     artist: '',
//     musics: '',
//     album: '',
//     favorites: [],
//     loadCard: '',
//   };

//   async componentDidMount() {
//     const { match: { params: { id } } } = this.props;
//     const { favorites, loadCard } = this.state;
//     const arr = await getMusics(id);
//     const filterMusic = arr.filter((element) => element.kind === 'song');
//     const musics = filterMusic.map((musica) => (
//       <div
//         key={ musica.trackId }
//         className="cardMusic"
//       >
//         <MusicCard
//           url={ musica.previewUrl }
//           name={ musica.trackName }
//           trackId={ musica.trackId }
//           music={ musica }
//           handle={ this.handleChange }
//           favorites={ favorites }
//           load={ loadCard }
//         />
//       </div>
//     ));
//     this.setState({
//       artist: arr[0].artistName,
//       musics,
//       album: arr[0].collectionName,
//     });
//   }

//   handleChange = async (event, music) => {
//     const { target: { checked } } = event;
//     const { trackId } = music;
//     const { favorites } = this.state;
//     this.setState({ loadCard: true });
//     const verifica = favorites.some((element) => element[trackId]);
//     if (checked && !verifica) {
//       this.setState({
//         favorites: [...favorites, { [trackId]: checked }] });
//       await addSong(music);
//     }
//     this.setState({ loadCard: false });
//   };

//   render() {
//     const { artist, album, musics } = this.state;
//     // this.setState({ loadCard: true });
//     return (
//       <div>
//         <Header props={ this.props } />
//         <div
//           data-testid="page-album"
//           className="musicas"
//         >
//           <h2 data-testid="artist-name">{ artist }</h2>
//           <h3 data-testid="album-name">{ album }</h3>
//           { musics }
//         </div>
//       </div>
//     );
//   }
// }

// Album.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

// export default Album;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../components/style.css';

class Album extends React.Component {
  state = {
    artist: '',
    musics: '',
    album: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const arr = await getMusics(id);
    console.log(arr);
    const filterMusic = arr.filter((element) => element.kind === 'song');
    const musics = filterMusic.map((musica) => (
      <div key={ musica.trackId } className="cardMusic">
        <MusicCard
          url={ musica.previewUrl }
          name={ musica.trackName }
          trackId={ musica.trackId }
          music={ musica }
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
      <div>
        <Header props={ this.props } />
        <div
          data-testid="page-album"
          className="musicas"
        >
          <h2 data-testid="artist-name">{ artist }</h2>
          <h3 data-testid="album-name">{ album }</h3>
          { musics }
        </div>
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
