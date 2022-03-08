import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { album } = this.props;

    return (
      <div>
        { album.map((albums) => (
          <div key={ albums.collectionId }>
            <span>{ albums.trackName }</span>
            { albums.previewUrl
              ? (
                <audio data-testid="audio-component" src={ albums.previewUrl } controls>
                  <track kind="captions" />
                </audio>
              )
              : '' }
          </div>
        )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.shape([{
    collectionId: PropTypes.string,
    trackName: PropTypes.string,
  }]),
};

MusicCard.defaultProps = {
  album: PropTypes.shape([{
    collectionId: '',
    trackName: '',
  }]),
};

export default MusicCard;
