import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import './Album.css';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      img: '',
      artist: '',
      albumName: '',
      favoriteAlbum: [],
      loading: undefined,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    // Req 7
    getMusics(id).then((album) => this.setState({
      album,
      img: album[0].artworkUrl100,
      artist: album[0].artistName,
      albumName: album[0].collectionName,
    }));

    // Req 9
    getFavoriteSongs().then((favoriteAlbum) => this.setState({
      favoriteAlbum,
    }));
  }

  handleInputChange(event) {
    const { album, favoriteAlbum } = this.state;
    const isFavoriteChecked = event.target.checked;
    let getAlbumId;

    getAlbumId = event.target.id;
    const filteredAlbum = album
      .filter((albumId) => albumId.trackId === Number(getAlbumId));

    const reducedFilteredAlbum = filteredAlbum[0];
    getAlbumId = reducedFilteredAlbum;

    if (isFavoriteChecked) {
      this.setState({
        favoriteAlbum: [...favoriteAlbum, reducedFilteredAlbum],
        loading: true,
      },
      async () => {
        await addSong(getAlbumId);
        this.setState({
          loading: false,
        });
      });
    } else { // Req 11
      this.setState({
        favoriteAlbum: favoriteAlbum
          .filter((favAlbum) => favAlbum.trackId !== reducedFilteredAlbum.trackId),
        loading: true,
      },
      async () => {
        await removeSong(getAlbumId);
        this.setState({
          loading: false,
        });
      });
    }
  }

  render() {
    const { album, img, artist, albumName, loading, favoriteAlbum } = this.state;

    return (
      <div>
        <div data-testid="page-album">
          <Header />
        </div>

        { loading
          ? <Loading />
          : (
            <div className="main-album-component">
              <div className="album-component">
                <img
                  src={ img }
                  alt={ albumName }
                  width="290px"
                  height="290px"
                  className="album-component-img"
                />
                <h3
                  data-testid="album-name"
                  className="album-component-collectionName"
                >
                  { albumName }
                </h3>
                <p
                  data-testid="artist-name"
                  className="album-component-artistName"
                >
                  { artist }
                </p>
              </div>

              <div>
                {album.map(({ trackId, previewUrl, trackName }) => (
                  !trackId
                    ? ''
                    : (
                      <MusicCard
                        key={ trackId }
                        trackId={ trackId }
                        previewUrl={ previewUrl }
                        trackName={ trackName }
                        handleInputChange={ this.handleInputChange }
                        // Got help from Débora Serra - Turma 19 - Tribo B, to figure how to set props to checked
                        favoriteCheck={ favoriteAlbum
                          .some((checkAlbum) => checkAlbum.trackId === trackId) }
                      />)))}
              </div>
            </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default Album;
