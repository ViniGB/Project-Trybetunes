import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchClass: '',
      name: '',
      entryButton: false,
      loading: undefined,
      allAlbuns: [],
      loaded: false,
      value: '',
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
    const { name } = this.state;

    let disabledEntryButton = false;
    const enableButtonCondition = 2;

    if (name.length >= enableButtonCondition) disabledEntryButton = true;

    this.setState({
      entryButton: disabledEntryButton,
    });
  }

  fetchAlbums() {
    const { name } = this.state;

    this.setState(
      { loading: true },
      async () => {
        const requestAlbum = await searchAlbumsAPI(name);
        if (requestAlbum === []) {
          this.setState({
            loading: false,
            allAlbuns: [],
            loaded: true,
            name: '',
            value: name,
          });
        } else {
          this.setState({
            loading: false,
            allAlbuns: requestAlbum,
            loaded: true,
            name: '',
            value: name,
          });
        }
      },
    );
  }

  render() {
    const {
      searchClass,
      entryButton,
      loading,
      allAlbuns,
      name,
      loaded,
      value } = this.state;

    return (
      <div data-testid="page-search">
        <Header searchClass={ searchClass } />

        <div>
          <form className="search-artist-form-section">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="name"
              value={ name }
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

        {/* Had help from Gabriel Pondaco - Turma 19 - Tribo B, to figure ternary concat */}
        { loading
          ? <Loading />
          : (
            <div className="albums-main-section">
              <p className="artistname-result">
                { loaded && allAlbuns.length <= 0
                  ? 'Nenhum álbum foi encontrado'
                  : (
                    <div>
                      <p>
                        { !loaded
                          ? ''
                          : `Resultado de álbuns de: ${value}`}
                      </p>
                      <div className="albums-section">
                        { allAlbuns.map((album) => (
                          <Link
                            to={ `/album/${album.collectionId}` }
                            key={ album.collectionId }
                            className="all-albums"
                            data-testid={ `link-to-album-${album.collectionId}` }
                          >
                            <img
                              src={ album.artworkUrl100 }
                              alt={ album.collectionName }
                              width="250px"
                              height="150px"
                            />
                            <h3 className="album-collectionName">
                              { album.collectionName }
                            </h3>
                            <p className="album-artistName">{ album.artistName }</p>
                          </Link>
                        )) }
                      </div>
                    </div>
                  ) }
              </p>
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
