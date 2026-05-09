import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { capitlaizeWord } from '../utilities/helpers';
import Img from '../Components/CustomImage';
import record_img from '../Images/record.png';
import musics from '../Resources/musicData.json';
import './Music.css';

export const MusicApp = forwardRef((props, ref) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(musics?.playlists[0] || null);
  const [selectedSection, setSelectedSection] = useState("playlist");
  const [showAlbumPage, setShowAlbumPage] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedSection("playlist");
        setSelectedPlaylist(musics?.playlists[0] || null);
        setShowAlbumPage(false);
      }
    };
  }, []);

  const clickAlbumSection = () => {
    setShowAlbumPage(false);
    setSelectedSection("album");
  }

  const clickAlbum = (shouldShow) => {
    setShowAlbumPage(shouldShow);
    const musicLibrary = document.getElementById("music-library");
    if (musicLibrary) {
      musicLibrary.scrollTop = 0;
    }
  }

  const clickPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    const musicLibrary = document.getElementById("music-library");
    if (musicLibrary) {
      musicLibrary.scrollTop = 0;
    }
  }

  return (
    <div className="music-app-container">
      <MusicPlayer />
      {/* Music Library */}
      <div className="music-library" id="music-library"
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
            <MusicPlaylist selectedPlaylist={selectedPlaylist} clickPlaylist={clickPlaylist}/>
            : <MusicAlbum clickAlbum={clickAlbum} showAlbumPage={showAlbumPage}/>}
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
          <p className='music-playing-title'>Drawn</p>
          <p className='music-playing-artist'>Barrymore</p>
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

const MusicPlaylist = ({ selectedPlaylist, clickPlaylist }) => {
  return (
    <div 
      className="music-app-page music-playlist-page">
      <div className='music-playlist-list'>
        <ul>
          {musics && musics["playlists"].map((playlist, index) => (
            <li 
              key={index} 
              className={`music-playlist-item ${selectedPlaylist === playlist ? 'music-playlist-selected' : ''}`} 
              onClick={() => clickPlaylist(playlist)}
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

const MusicAlbum = ({ clickAlbum, showAlbumPage }) => {
  const [selectedAlbum, setSelectedAlbum] = useState("");
  
  const openAlbum = (selected) => {
    setSelectedAlbum(selected);
    clickAlbum(true);
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
  const albumCover = album?.cover || record_img;
  const albumTitle = album?.title || "";
  const albumArtist = album?.artist || "";
  
  return (
    <div
      className={`music-album-card-wrap ${additionalClassNames.toString()}`}
      onClick={() => { onClick(album) }}
    >
      <MusicAlbumRecordImage albumCover={albumCover} albumTitle={albumTitle} albumColor={albumColor} />
      <p className='music-album-card-title'>{albumTitle}</p>
      <p className='music-album-card-artist'>{albumArtist}</p>
    </div>
  );
}

const MusicAlbumRecordImage = ({ albumCover, albumTitle, albumColor }) => {
  return (
    <div className='music-album-card-record-div'>
      <div className='music-album-card'>
        <Img imageName={albumCover} defaultImg={record_img} alt={albumTitle} title={albumTitle} draggable="false" />
      </div>
      <div style={{ background: `${albumColor}` }} className='music-album-card-center'></div>
      <div className='music-album-card-center-dot'></div>
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
        {isAlbum && 
          <div className='music-page-header-record-div'>
            <MusicAlbumRecordImage albumCover={pageAlbumCover} albumTitle={pageTitle} albumColor={pageColor} />
          </div>}
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
              <div>{index+1}</div>
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