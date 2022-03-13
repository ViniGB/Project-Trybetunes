import React from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import trybetunes from '../images/trybetunes.png';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      entryButton: false,
      loading: undefined,
      redirect: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleEntryButton = this.handleEntryButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const enableButtonCondition = 3;

    if (name.length >= enableButtonCondition) disabledEntryButton = true;

    this.setState({
      entryButton: disabledEntryButton,
    });
  }

  handleClick() {
    const { name, email, description, image } = this.state;

    this.setState(
      { loading: true },
      async () => {
        const requestUser = await createUser({
          name,
          email,
          description,
          image,
        });
        if (requestUser) {
          this.setState({
            loading: false,
            redirect: true,
          });
        }
      },
    );
  }

  // Had help from Thiago Muniz - Turma 19 - Tribo B, to figure rendering conditionals
  render() {
    const { entryButton, loading, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/search" />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-login" className="login-section">
        <img
          src={ trybetunes }
          alt="Logo-TrybeTunes"
          className="login-img-section"
        />

        <form className="login-form-section">
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            name="name"
            className="form-input"
            onChange={ this.handleInput }
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form-input"
            onChange={ this.handleInput }
          />
          <br />
          <textarea
            placeholder="Descrição"
            name="description"
            className="form-input"
            onChange={ this.handleInput }
            rows="5"
          />
          <br />
          <input
            placeholder="User Avatar Url"
            name="image"
            className="form-input"
            onChange={ this.handleInput }
            rows="5"
          />
          <br />
          <button
            type="button"
            className="form-button-input"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ !entryButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
