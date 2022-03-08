import React from 'react';
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
    const { user, loading } = this.state;

    const iconStyle = {
      color: 'green',
      fontSize: '36px',
    };

    if (loading) {
      return <Loading />;
    }

    return (
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
    );
  }
}

export default Header;
