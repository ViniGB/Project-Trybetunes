import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchClass: '',
    };
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    this.setState({
      searchClass: pathname,
    });
  }

  render() {
    const { searchClass } = this.state;

    return (
      <div data-testid="page-search">
        <Header searchClass={ searchClass } />
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
