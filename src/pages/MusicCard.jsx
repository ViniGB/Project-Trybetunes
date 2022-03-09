import PropTypes from 'prop-types';
import React from 'react';
import './MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      handleInputChange,
      favoriteCheck,
    } = this.props;
    // const inputCheckboxStyle = {
    //   border: '0',
    //   clip: 'rect(0 0 0 0)',
    //   height: '1px',
    //   margin: '-1px',
    //   overflow: 'hidden',
    //   padding: '0',
    //   position: 'absolute',
    //   width: '1px',
    // };

    return (
      <div className="musicCard-main">
        { previewUrl
          ? (
            <div className="musicCards">
              <div className="musicCards-span">
                <span>{ trackName }</span>
              </div>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
                className="musicCards-audios"
              >
                <track kind="captions" />
              </audio>
              <div>
                <label htmlFor={ trackId }>
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    id={ trackId }
                    type="checkbox"
                    name="favoriteCheck"
                    onChange={ handleInputChange }
                    checked={ favoriteCheck }
                  />
                  Favorita
                </label>
              </div>
            </div>
          )
          : ''}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  handleInputChange: PropTypes.func,
  favoriteCheck: PropTypes.bool,
};

MusicCard.defaultProps = {
  trackId: '',
  trackName: '',
  previewUrl: '',
  handleInputChange: PropTypes.func,
  favoriteCheck: PropTypes.bool,
};

export default MusicCard;
