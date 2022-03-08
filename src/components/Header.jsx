import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import trybetunescropped from '../images/trybetunescropped.png';
import './Header.css';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const userName = await getUser();

    this.setState({
      loading: false,
      user: userName.name,
    });
  }

  render() {
    const { searchClass, favoriteClass, profileClass } = this.props;
    const { user, loading } = this.state;

    const searchLinkClass = searchClass === '/search'
      ? 'nav-links-search'
      : 'nav-links';

    const favoriteLinkClass = favoriteClass === '/favorites'
      ? 'nav-links-favorites'
      : 'nav-links';

    const profileLinkClass = profileClass === '/profile'
      ? 'nav-links-profile'
      : 'nav-links';

    const iconStyle = {
      color: 'rgb(47, 193, 139)',
      fontSize: '36px',
    };

    // if (loading) {
    //   return <Loading />;
    // }

    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <header data-testid="header-component" className="search-header-section">
                <img
                  src={ trybetunescropped }
                  alt="Logo-TrybeTunes"
                  className="search-img-section"
                />

                <div className="user-info-section">
                  <i className="fas fa-user-circle icon" style={ iconStyle } />
                  <p data-testid="header-user-name" className="userinfo">{ user }</p>
                </div>
              </header>

              <nav className="nav-links-section">
                <Link
                  className={ searchLinkClass }
                  to="/search"
                  data-testid="link-to-search"
                >
                  Search
                </Link>
                <Link
                  className={ favoriteLinkClass }
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favorites
                </Link>
                <Link
                  className={ profileLinkClass }
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Profile
                </Link>
              </nav>
            </div>
          )}
      </div>
    );
  }
}

Header.propTypes = {
  searchClass: PropTypes.string,
  favoriteClass: PropTypes.string,
  profileClass: PropTypes.string,
};

Header.defaultProps = {
  searchClass: '',
  favoriteClass: '',
  profileClass: '',
};

export default Header;
