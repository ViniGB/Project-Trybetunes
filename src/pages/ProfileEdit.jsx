import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      profileClass: '',
      loading: undefined,
      name: '',
      email: '',
      description: '',
      image: '',
      entryButton: false,
      redirect: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleEntryButton = this.handleEntryButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
        name: userProfile.name,
        email: userProfile.email,
        description: userProfile.description,
        image: userProfile.image,
        loading: false,
        redirect: false,
      }, () => this.handleEntryButton());
    });
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.handleEntryButton());
  }

  handleEntryButton() {
    const { name, email, description, image } = this.state;

    let disabledEntryButton = false;
    const enableButtonCondition = 0;

    // Regex test taken from https://www.w3resource.com/javascript/form/email-validation.php
    if (name.length > enableButtonCondition
      && email.length > enableButtonCondition
      && description.length > enableButtonCondition
      && image.length > enableButtonCondition
      && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      disabledEntryButton = true;
    }

    this.setState({
      entryButton: disabledEntryButton,
    });
  }

  handleClick() {
    const { name, email, description, image } = this.state;

    this.setState(
      { loading: true },
      async () => {
        await updateUser({
          name,
          email,
          image,
          description,
        });
        this.setState({
          loading: false,
          redirect: true,
        });
      },
    );
  }

  render() {
    const {
      loading,
      name,
      email,
      description,
      image,
      profileClass,
      entryButton,
      redirect,
    } = this.state;

    const iconStyle = {
      color: 'rgb(109, 109, 109)',
      fontSize: '100px',
    };

    if (redirect) {
      return <Redirect to="/profile" />;
    }

    return (
      <div>
        <div data-testid="page-profile-edit">
          <Header profileClass={ profileClass } />
        </div>

        { loading
          ? <Loading />
          : (
            <div className="global-profile-section">
              <div className="main-profile-section edit-profile-section">
                <div className="profile-avatar-toedit-section">
                  { !image.length <= 0
                    ? (
                      <img
                        src={ image }
                        alt="User-avatar"
                        className="profile-image"
                      />)
                    : <i className="fas fa-user-circle icon" style={ iconStyle } />}

                  <div className="edit-image">
                    <input
                      placeholder="User Avatar Url"
                      data-testid="edit-input-image"
                      name="image"
                      value={ image }
                      className="form-input"
                      onChange={ this.handleInput }
                      rows="5"
                    />
                  </div>
                </div>

                <div className="profile-user-section">
                  <h2>Nome</h2>
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    placeholder="Nome"
                    name="name"
                    value={ name }
                    className="form-input edit-input"
                    onChange={ this.handleInput }
                  />
                </div>

                <div className="profile-email-section">
                  <h2>E-mail</h2>
                  <input
                    type="email"
                    data-testid="edit-input-email"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    className="form-input edit-input"
                    onChange={ this.handleInput }
                  />
                </div>

                <div className="profile-description-section">
                  <h2>Descrição</h2>
                  <textarea
                    data-testid="edit-input-description"
                    placeholder="Descrição"
                    name="description"
                    value={ description }
                    className="form-input edit-input description-edit"
                    onChange={ this.handleInput }
                    rows="5"
                  />
                </div>
              </div>
              <div>
                <button
                  className="finish-edit-button"
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ !entryButton }
                  onClick={ this.handleClick }
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

ProfileEdit.defaultProps = {
  location: PropTypes.shape({
    pathname: '',
  }),
};

export default ProfileEdit;
