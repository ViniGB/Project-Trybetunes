import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import './Album.css';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      img: '',
      artist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id).then((album) => this.setState({
      album,
      img: album[0].artworkUrl100,
      artist: album[0].artistName,
      albumName: album[0].collectionName,
    }));
  }

  render() {
    const { album, img, artist, albumName } = this.state;

    return (
      <div>
        <div data-testid="page-album">
          <Header />
        </div>

        { !album
          ? <Loading />
          : (
            <div className="main-album-component">
              <div className="album-component">
                <img
                  src={ img }
                  alt={ albumName }
                  width="290px"
                  height="290px"
                  className="album-component-img"
                />
                <h3
                  data-testid="album-name"
                  className="album-component-collectionName"
                >
                  { albumName }
                </h3>
                <p
                  data-testid="artist-name"
                  className="album-component-artistName"
                >
                  { artist }
                </p>
              </div>

              <div>
                <MusicCard album={ album } />
              </div>
            </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default Album;
