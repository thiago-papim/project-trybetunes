// import React from 'react';
// import PropTypes from 'prop-types';
// import Loading from './Loading';
// // import addSong from '../services/searchAlbumsAPI';

// class MusicCard extends React.Component {
//   state = {
//     favorites: '',
//   };

//   // check = () => {
//   //   const { favorites } = this.state;
//   // }

//   render() {
//     const { url, name, trackId, music, handle, load } = this.props;
//     // this.setState({ favorites });
//     return (
//       <div>
//         { load ? <p>oi</p> : ''}
//         <h5>{ name }</h5>
//         <audio data-testid="audio-component" src={ url } controls>
//           <track kind="captions" />
//           O seu navegador não suporta o elemento
//           {' '}
//           {' '}
//           <code>audio</code>
//           .
//         </audio>
//         <form>
//           <label htmlFor="favorita">
//             Favorita
//             <input
//               id="favorita"
//               type="checkbox"
//               data-testid={ `checkbox-music-${trackId}` }
//               onChange={ (event) => handle(event, music) }
//             />
//           </label>
//         </form>
//       </div>
//     );
//   }
// }

// MusicCard.propTypes = {
//   url: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
//   music: PropTypes.string.isRequired,
//   handle: PropTypes.func.isRequired,
// };

// export default MusicCard;

import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
  };

  addFavorite = async (music) => {
    this.setState({ load: true });
    await addSong(music);
    this.setState({ load: false });
  };

  render() {
    const { url, name, trackId, music } = this.props;
    const { load } = this.state;
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
              onChange={ () => this.addFavorite(music) }
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
  trackId: PropTypes.string.isRequired,
  music: PropTypes.func.isRequired,
};

export default MusicCard;
