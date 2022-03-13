import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      profileClass: '',
      loading: undefined,
      user: '',
      email: '',
      description: '',
      avatar: '',
    };
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    this.setState({
      profileClass: pathname,
      loading: true,
    },
    async () => {
      const userProfile = await getUser();
      this.setState({
        user: userProfile.name,
        email: userProfile.email,
        description: userProfile.description,
        avatar: userProfile.image,
        loading: false,
      });
    });
  }

  render() {
    const {
      loading,
      user,
      email,
      description,
      avatar,
      profileClass,
    } = this.state;

    const iconStyle = {
      color: 'rgb(109, 109, 109)',
      fontSize: '100px',
    };

    return (
      <div>
        <div data-testid="page-profile">
          <Header profileClass={ profileClass } />
        </div>

        { loading
          ? <Loading />
          : (
            <div className="main-profile-section">
              <div className="profile-avatar-edit-section">
                { !avatar.length <= 0
                  ? (
                    <img
                      src={ avatar }
                      alt="User-avatar"
                      data-testid="profile-image"
                      className="profile-image"
                    />)
                  : <i className="fas fa-user-circle icon" style={ iconStyle } />}

                <div className="profile-edit-section">
                  <Link
                    className="profile-link"
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </div>
              </div>

              <div className="profile-user-section">
                <h2>Nome</h2>
                <p>{ user }</p>
              </div>

              <div className="profile-email-section">
                <h2>E-mail</h2>
                <p>{ email }</p>
              </div>

              <div className="profile-description-section">
                <h2>Descrição</h2>
                <p>{ description }</p>
              </div>
            </div>
          )}

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
