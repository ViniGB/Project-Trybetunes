import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteClass: '',
    };
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    this.setState({
      favoriteClass: pathname,
    });
  }

  render() {
    const { favoriteClass } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header favoriteClass={ favoriteClass } />
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
