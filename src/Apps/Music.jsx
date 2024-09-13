import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { capitlaizeWord } from '../utilites/helpers';
import album_cover from '../Images/fake_album.jpg';
import musics from '../Resources/musicData.json';
import './Music.css';

export const MusicApp = forwardRef((props, ref) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState();
  const [pageType, setPageType] = useState("");
  const [showPage, setShowPage] = useState(false);

  const openPage = (item, itemType) => {
    setSelectedPage(item);
    setShowPage(true);
    setPageType(itemType);
  }

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedPageIndex(0);
        setSelectedPage(null);
        setPageType("");
        setShowPage(false);
      }
    };
  }, []);

  return (
    <div className="music-app-container">
      {showPage ?
        <MusicItemPage
          openPage={openPage}
          showPage={showPage}
          setShowPage={setShowPage}
          selectedPageIndex={selectedPageIndex}
          setSelectedPageIndex={setSelectedPageIndex}
          itemType={pageType}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        /> :
        <MusicLibrary
          openPage={openPage}
          showPage={showPage}
          setShowPage={setShowPage}
          selectedPageIndex={selectedPageIndex}
          setSelectedPageIndex={setSelectedPageIndex}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />}
      <MusicPlayer />
    </div>
  );
});

const MusicLibrary = ({ openPage, showPage, setShowPage, selectedPageIndex, setSelectedPageIndex, selectedPage, setSelectedPage }) => {
  return (
    <div className="music-app-page music-library">
      <section className="music-row">
        <h2>Playlists</h2>
        <div className="music-row-content">
          {musics && musics["playlists"].map((playlist, index) => (
            <MusicItemCard key={index} item={playlist} onClick={openPage} itemType={'playlist'} additionalClassNames={['music-playlist-item']} />
          ))}
        </div>
      </section>
      <section className="music-row">
        <h2>Albums</h2>
        <div className="music-row-content">
          {musics && musics["albums"].map((album, index) => (
            <MusicItemCard key={index} onClick={openPage} itemType={'album'} item={album} />
          ))}
        </div>
      </section>
      <section className="music-row">
        <h2>Artists</h2>
        <div className="music-row-content">
          {musics && musics["artists"].map((artist, index) => (
            <MusicItemCard key={index} item={artist} itemType={'artist'} additionalClassNames={['music-artist-item']} />
          ))}
        </div>
      </section>
    </div>
  );
};

const MusicPlayer = () => {
  return (
    <div className="music-player">
      <div className="music-player-now">
        <div className='music-playing-img'>
        </div>
        <div className="music-player-info">
          <p className='music-playing-title'>Song Title</p>
          <p className='music-playing-artist'>Song Artist</p>
        </div>
      </div>
      <div className="music-player-controls">
        <TbPlayerSkipBackFilled className="music-control-button music-control-skip" />
        <TbPlayerPlayFilled className="music-control-button" id="music-control-play" />
        <TbPlayerSkipForwardFilled className="music-control-button music-control-skip" />
        <div className="music-progress-bar">
          {/* <div className="music-progress"></div> */}
        </div>
      </div>
    </div>
  );
};

const MusicItemCard = ({ item, onClick, itemType, additionalClassNames = [] }) => {
  const isPlaylist = itemType === "playlist";
  const isAlbum = itemType === "album";

  return (
    <div 
      className={`music-item-wrap ${additionalClassNames.toString()}`} 
      onClick={() => {itemType !== 'artist' && onClick(item, itemType)}} 
    >
      <div
        className='music-item'
        style={{ backgroundColor: `${item?.color}` }}
      >
        {!isPlaylist && <img src={album_cover} alt={item.title} title={item.title} draggable="false" />}
        {/* {!isPlaylist &&  <img src={require(`../Images/${item?.cover}`)} alt={item.title} title={item.title} draggable="false" />} */}
      </div>
      {!isAlbum && <p>{item?.title || item?.name}</p>}
    </div>
  );
}

const MusicItemPage = ({ openPage, showPage, itemType, setShowPage, selectedPageIndex, setSelectedPageIndex, selectedPage, setSelectedPage }) => {
  const isPlaylist = itemType === "playlist";
  const isAlbum = itemType === "album";

  return (
    <div className='music-app-page music-item-container'>
      <GoHome id="music-back-icon" onClick={() => setShowPage(false)} />
      <div 
        className='music-item-header'
        style={{ backgroundColor: `${selectedPage?.color}` }}
      >
        <div className='music-item-header-text'>
          <h1 className='item-header-title'>{selectedPage.title}</h1>
          {isAlbum && <p className='item-header-artist'>{selectedPage.artist}</p>}
          <p className='item-header-type'>{capitlaizeWord(itemType)} - <span>{selectedPage.tracks.length} songs</span></p>
        </div>
        <div className='music-item-header-img-div'>
          {isAlbum && <img src={album_cover} alt={selectedPage.title} title={selectedPage.title} draggable="false" />}
          {/* <img src={require(`../Images/${selectedPage?.cover}`)} alt={selectedPage.title} title={selectedPage.title} draggable="false" /> */}
        </div>
      </div>
      <div 
        className='music-item-list-div'
        style={{ background: `linear-gradient(180deg, ${selectedPage?.color} 0%, #333333 50%)` }}
      >
        {isPlaylist ?
          <div className={`music-item-list music-item-list-head ${isPlaylist ? 'playlist-list' : 'album-list'} `}>
            <div>#</div>
            <div>Title</div>
            <div>Artist</div>
            <div>Duration</div>
          </div> :
          <div className={`music-item-list music-item-list-head ${isPlaylist ? 'playlist-list' : 'album-list'}`}>
            <div>#</div>
            <div>Title</div>
            <div>Duration</div>
          </div>
        }
        <div className='music-item-list-contents'>
          {selectedPage && selectedPage.tracks.map((song, index) => (
            <div key={index} className={`music-item-list music-item-list-row ${isPlaylist ? 'playlist-list' : 'album-list'}`}>
              <div>{index}</div>
              <div>{song.title}</div>
              {isPlaylist && <div>{song.artist}</div>}
              <div>{song.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}