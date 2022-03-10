import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteClass: '',
      favoriteMusics: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    this.setState({
      favoriteClass: pathname,
    });

    getFavoriteSongs().then((favoriteMusics) => this.setState({
      favoriteMusics,
    }));
  }

  handleInputChange(event) {
    const { favoriteMusics } = this.state;
    const isFavoriteChecked = event.target.checked;
    let getAlbumId;

    getAlbumId = event.target.id;
    const filteredAlbum = favoriteMusics
      .filter((albumId) => albumId.trackId === Number(getAlbumId));

    const reducedFilteredAlbum = filteredAlbum[0];
    getAlbumId = reducedFilteredAlbum;

    if (!isFavoriteChecked) {
      this.setState({
        loading: true,
      },
      async () => {
        await removeSong(reducedFilteredAlbum);
        const newFavAlbum = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoriteMusics: newFavAlbum,
        });
      });
    }
  }

  render() {
    const { favoriteClass, favoriteMusics, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header favoriteClass={ favoriteClass } />
        { loading
          ? <Loading />
          : (
            <div className="favoriteMusics-section">
              { favoriteMusics.map(({ trackId, previewUrl, trackName }) => (
                <MusicCard
                  key={ trackId }
                  trackId={ trackId }
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                  handleInputChange={ this.handleInputChange }
                  favoriteCheck={ favoriteMusics
                    .some((checkAlbum) => checkAlbum.trackId === trackId) }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Favorites.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Favorites.defaultProps = {
  location: PropTypes.shape({
    pathname: '',
  }),
};

export default Favorites;
