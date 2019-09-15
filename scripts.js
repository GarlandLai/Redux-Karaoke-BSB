// LYRICS to BSB Songs
const songList = {
  1: "Yeah,You are my fire,The one desire,Believe when I say,I want it that way,But we are two worlds apart,Can't reach to your heart,When you say,That I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Am I your fire?,Your one desire,Yes I know it's too late,But I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Now I can see that we've fallen apart,From the way that it used to be, yeah,No matter the distance,I want you to know,That deep down inside of me,You are my fire,The one desire,You are (you are you are you are),Don't want to hear you say,Ain't nothin' but a heartache,Ain't nothin' but a mistake (Don't want to hear you say),I never want to hear you say,I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Tell me why,Ain't nothin' but a heartache,Ain't nothin' but a mistake,Tell me why,I never want to hear you say (Never want to hear you say it),I want it that way,Cause I want it that way".split(','),
  2: "Yeah yeah,Baby please try to forgive me,Stay here don't put out the glow,Hold me now don't bother,If every minute it makes me weaker,You can save me from the man that I've become oh yeah,Looking back on the things I've done,I was trying to be someone,I played my part kept you in the dark,Now let me show you the shape of my heart,Sadness is beautiful loneliness that's tragical,So help me I can't win this war oh no,Touch me now don't bother,If every second it makes me weaker,You can save me from the man I've become,Looking back on the things I've done,I was trying to be someone,I played my part kept you in the dark,Now let me show you the shape of my heart,I'm here with my confession,Got nothing to hide no more,I don't know where to start,But to show you the shape of my heart,I'm lookin' back on things I've done,I never wanna play the same old part,I'll keep you in the dark,Now let me show you the shape of my heart,Looking back on the things I've done,I was trying to be someone,I played my part kept you in the dark,Now let me show you the shape of my heart,Looking back on the things I've done,I was trying to be someone,I played my part kept you in the dark,Now let me show you the shape of,Show you the shape of my heart".split(',')
};

// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: 'I Want it That Way',
      album: 'Millennium',
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: 'Shape of My Heart',
      album: 'Black & Blue',
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    },
  },
};

// REDUX REDUCER
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition,
      });
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry,
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0,
      });
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry,
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
};

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId;
    default:
      return state;
  }
};

const rootReducer = this.Redux.combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer,
});

// REDUX STORE
const { createStore } = Redux;
const store = createStore(rootReducer);

// JEST TESTS + SETUP WILL GO HERE
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: 'I Want it That Way',
    album: 'Millennium',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: 'Shape of My Heart',
    album: 'Black & Blue',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  },
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1: {
    title: 'I Want it That Way',
    album: 'Millennium',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: 'Shape of My Heart',
    album: 'Black & Blue',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  },
});

expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

expect(rootReducer(initialState, { type: null })).toEqual(initialState);

expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));

expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));


// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }

  if (store.getState().currentSongId) {
    const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
    document.getElementById('lyrics').appendChild(currentLine);
  } else {
    const selectSongMessage = document.createTextNode('Select your favorite Backstreet boys song to sing along with!');
    document.getElementById('lyrics').appendChild(selectSongMessage);
  }
};

// runs renderLyrics() method from above when page is finished loading.
// window.onload is HTML5 version of jQuery's $(document).ready()
window.onload = function () {
  renderSongs();
  renderLyrics();
};

const renderSongs = () => {
  console.log('renderSongs method successfully fired!');
  console.log(store.getState());
  const songsById = store.getState().songsById;
  for (const songKey in songsById) {
    const song = songsById[songKey];
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const em = document.createElement('em');
    const songTitle = document.createTextNode(song.title);
    const songAlbum = document.createTextNode(' on the ' + song.album);
    em.appendChild(songTitle);
    h3.appendChild(em);
    h3.appendChild(songAlbum);
    h3.addEventListener('click', function () {
      selectSong(song.songId);
    });

    li.appendChild(h3);
    document.getElementById('songs').appendChild(li);
  }
};

// CLICK LISTENER
const userClick = () => {
  if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG',
                      currentSongId: store.getState().currentSongId, });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC',
                    currentSongId: store.getState().currentSongId, });
  }
};

const selectSong = (newSongId) => {
  let action;
  if (store.getState().currentSongId) {
    action = {
      type: 'RESTART_SONG',
      currentSongId: store.getState().currentSongId,
    };
    store.dispatch(action);
  };

  action = {
    type: 'CHANGE_SONG',
    newSelectedSongId: newSongId,
  };
  store.dispatch(action);
};

// SUBSCRIBE TO REDUX store
store.subscribe(renderLyrics);
