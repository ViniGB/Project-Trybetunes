import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      profileClass: '',
    };
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    this.setState({
      profileClass: pathname,
    });
  }

  render() {
    const { profileClass } = this.state;

    return (
      <div data-testid="page-profile">
        <Header profileClass={ profileClass } />
      </div>
    );
  }
}

Profile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Profile.defaultProps = {
  location: PropTypes.shape({
    pathname: '',
  }),
};

export default Profile;
