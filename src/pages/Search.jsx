import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchClass: '',
      name: '',
      entryButton: false,
    };

    this.handleInput = this.handleInput.bind(this);
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

  render() {
    const { searchClass, entryButton } = this.state;

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
              className="artist-name-input"
              onChange={ this.handleInput }
            />
            <br />
            <button
              type="button"
              className="search-artist-button-input"
              data-testid="search-artist-button"
              onClick={ this.handleClick }
              disabled={ !entryButton }
            >
              Search
            </button>
          </form>
        </div>
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
