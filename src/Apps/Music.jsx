import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { capitlaizeWord, handleImageError } from '../utilites/helpers';
import Img from '../Components/CustomImage';
import album_cover from '../Images/fake_album.jpg';
import musics from '../Resources/musicData.json';
import './Music.css';
import { se } from 'date-fns/locale';

export const MusicApp = forwardRef((props, ref) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(musics?.playlists[0] || null);
  const [selectedSection, setSelectedSection] = useState("playlist");
  const [showAlbumPage, setShowAlbumPage] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedSection("playlist");
      }
    };
  }, []);

  const clickAlbumSection = () => {
    setShowAlbumPage(false);
    setSelectedSection("album");
  }

  return (
    <div className="music-app-container">
      <MusicPlayer />
      {/* Music Library */}
      <div className="music-library"
        style={{ background: `linear-gradient(0deg, ${selectedPlaylist ? selectedPlaylist.color : 'var(--music-accent-color)'} -80%, var(--music-bg-color) 50%)` }}>
        <div className='music-section-toggle-container'>
          <div 
            className={`music-toggle-button ${selectedSection === 'playlist' ? 'music-toggle-button-selected' : ''}`} 
            id='music-toggle-playlist' 
            onClick={() => setSelectedSection("playlist")}>
            <p>Playlists</p>
          </div>
          <div 
            className={`music-toggle-button ${selectedSection === 'album' ? 'music-toggle-button-selected' : ''}`} 
            id='music-toggle-album' 
            onClick={() => clickAlbumSection()}>
            <p>Albums</p>
          </div>
        </div>
        <div className="music-library-content">
          {selectedSection === "playlist" ?
            <MusicPlaylist selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist}/>
            : <MusicAlbum setShowAlbumPage={setShowAlbumPage} showAlbumPage={showAlbumPage}/>}
        </div>
      </div>
    </div>
  );
});

const MusicPlayer = () => {
  return (
    <div className="music-player">
      <div className="music-progress-bar">
        <div className="music-progress"></div>
      </div>
      <div className="music-below-bar">
        <div className="music-player-info">
          <p className='music-playing-title'>Song Title</p>
          <p className='music-playing-artist'>Song Artist</p>
        </div>
        <div className="music-player-controls">
          <TbPlayerSkipBackFilled className="music-control-button music-control-skip" />
          <TbPlayerSkipForwardFilled className="music-control-button music-control-skip" />
          <TbPlayerPlayFilled className="music-control-button" id="music-control-play" />
        </div>
      </div>
    </div>
  );
}

const MusicPlaylist = ({ selectedPlaylist, setSelectedPlaylist }) => {
  return (
    <div 
      className="music-app-page music-playlist-page">
      <div className='music-playlist-list'>
        <ul>
          {musics && musics["playlists"].map((playlist, index) => (
            <li 
              key={index} 
              className={`music-playlist-item ${selectedPlaylist === playlist ? 'music-playlist-selected' : ''}`} 
              onClick={() => setSelectedPlaylist(playlist)}
              style={{ borderTop: `2px solid ${playlist?.color}` }}>
              {playlist.title}
            </li>
          ))}
        </ul>
      </div>
      {selectedPlaylist && (
        <MusicItemPage
          itemType="playlist"
          selectedPage={selectedPlaylist}
        />
      )}
    </div>
  );
}

const MusicAlbum = ({ setShowAlbumPage, showAlbumPage }) => {
  const [selectedAlbum, setSelectedAlbum] = useState("");
  
  const openAlbum = (selected) => {
    setSelectedAlbum(selected);
    setShowAlbumPage(true);
  }
  
  return (
    <div 
      className="music-app-page music-album-page">
      {!showAlbumPage ? 
        <div className='music-album-list'>
          {musics && musics["albums"].map((album, index) => (
            <MusicAlbumCard key={index} album={album} itemType="album" onClick={openAlbum} />
          ))}
        </div> 
        : <MusicItemPage itemType="album" selectedPage={selectedAlbum} />}
    </div>
  );
}

const MusicAlbumCard = ({ album, onClick, additionalClassNames = [] }) => {
  const albumColor = album?.color || "var(--music-accent-color)";
  const albumCover = album?.cover || album_cover;
  const albumTitle = album?.title || "";
  
  return (
    <div
      className={`music-album-card-wrap ${additionalClassNames.toString()}`}
      onClick={() => { onClick(album) }}
    >
      <div
        className='music-album-card'
        style={{ backgroundColor: `${albumColor}` }}
      >
        <Img imageName={albumCover} alt={albumTitle} title={albumTitle} draggable="false" />
      </div>
      {/* {!isAlbum && <p>{item?.title || item?.name}</p>} */}
    </div>
  );
}

const MusicItemPage = ({ itemType, selectedPage }) => {
  const isPlaylist = itemType === "playlist";
  const isAlbum = itemType === "album";
  const pageTitle = isPlaylist ? selectedPage?.title : selectedPage?.title || selectedPage?.name || "";
  const pageColor = selectedPage?.color || "--var(--music-accent-color)";
  const pageArtist = isAlbum ? selectedPage?.artist : null;
  const pageListLength = selectedPage?.tracks?.length || 0;
  const pageAlbumCover = isAlbum ? selectedPage?.cover : null;

  return (
    <div className='music-page-container'>
      <div
        className='music-page-header'
      >
        <div className='music-page-header-text'>
          <h1 className='page-header-title'>{pageTitle}</h1>
          {isAlbum && <p className='page-header-artist'>{pageArtist}</p>}
          <p className='page-header-type'>{capitlaizeWord(itemType)} - <span>{pageListLength} songs</span></p>
        </div>
        {isAlbum && (
          <div className='music-page-header-img-div'>
            <Img imageName={pageAlbumCover} alt={pageTitle} title={pageTitle} draggable="false" />
          </div>
        )}
      </div>
      <div className='music-page-table-div'>
        {isPlaylist ?
          <div className={`music-page-row music-page-table-head ${isPlaylist ? 'music-page-playlist-track' : 'music-page-album-track'} `}>
            <div>#</div>
            <div>Title</div>
            <div>Artist</div>
            <div>Duration</div>
          </div> :
          <div className={`music-page-row music-page-table-head ${isPlaylist ? 'music-page-playlist-track' : 'music-page-album-track'}`}>
            <div>#</div>
            <div>Title</div>
            <div>Duration</div>
          </div>
        }
        <div className='music-page-table-contents'>
          {selectedPage && selectedPage.tracks.map((songId, index) => {
            const song = musics.songs.find(s => s.id === songId);
            return song && (<div key={index} className={`music-page-row music-page-track-row ${isPlaylist ? 'music-page-playlist-track' : 'music-page-album-track'}`}>
              <div>{index}</div>
              <div>{song.title}</div>
              {isPlaylist && <div>{song.artist}</div>}
              <div>{song.duration}</div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}