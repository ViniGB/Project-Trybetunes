import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import './Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchClass: '',
      artistName: '',
      entryButton: false,
      loading: undefined,
      allAlbuns: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleEntryButton = this.handleEntryButton.bind(this);
    this.fetchAlbums = this.fetchAlbums.bind(this);
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    this.setState({
      searchClass: pathname,
    });
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.handleEntryButton());
  }

  handleEntryButton() {
    const { artistName } = this.state;

    let disabledEntryButton = false;
    const enableButtonCondition = 2;

    if (artistName.length >= enableButtonCondition) disabledEntryButton = true;

    this.setState({
      entryButton: disabledEntryButton,
    });
  }

  async fetchAlbums() {
    const { artistName } = this.state;

    this.setState(
      { loading: true },
      async () => {
        const requestAlbum = await searchAlbumsAPI(artistName);
        if (requestAlbum) {
          this.setState({
            loading: false,
            allAlbuns: requestAlbum,
          });
        }
      },
    );
  }

  render() {
    const { searchClass, entryButton, loading, allAlbuns, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header searchClass={ searchClass } />

        <div>
          <form className="search-artist-form-section">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="artistName"
              value={ artistName }
              className="artist-name-input"
              onChange={ this.handleInput }
            />
            <br />
            <button
              type="button"
              className="search-artist-button-input"
              data-testid="search-artist-button"
              onClick={ this.fetchAlbums }
              disabled={ !entryButton }
            >
              Search
            </button>
          </form>
        </div>

        { loading
          ? <Loading />
          : (
            <div>
              <p>
                { loading
                  ? `Resultado de álbuns de ${allAlbuns.artistName}`
                  : '' }
              </p>
              { allAlbuns.map((album) => (
                <div key={ album.collectionId }>
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionName }
                  />
                </div>
              )) }
            </div>)}
      </div>
    );
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Search.defaultProps = {
  location: PropTypes.shape({
    pathname: '',
  }),
};

export default Search;
