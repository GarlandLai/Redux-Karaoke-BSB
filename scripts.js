// LYRICS to BSB - I WANT IT THAT WAY
const songList = {
  1: "Yeah,You are my fire,The one desire,Believe when I say,I want it that way,But we are two worlds apart,Can't reach to your heart,When you say,That I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Am I your fire?,Your one desire,Yes I know it's too late,But I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Now I can see that we've fallen apart,From the way that it used to be, yeah,No matter the distance,I want you to know,That deep down inside of me,You are my fire,The one desire,You are (you are you are you are),Don't want to hear you say,Ain't nothin' but a heartache,Ain't nothin' but a mistake (Don't want to hear you say),I never want to hear you say,I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Tell me why,Ain't nothin' but a heartache,Ain't nothin' but a mistake,Tell me why,I never want to hear you say (Never want to hear you say it),I want it that way,Cause I want it that way".split(','),
  2: "Yeah yeah,Baby. please try to forgive me,Stay here don't put out the glow,Hold me now don't bother,If every minute it makes me weaker,You can save me from the man that I've become. oh yeah,Looking back on the things I've done,I was trying to be someone,I played my part. kept you in the dark,Now let me show you the shape of my heart,Sadness is beautiful. loneliness that's tragical,So help me I can't win this war. oh no,Touch me now. don't bother,If every second it makes me weaker,You can save me from the man I've become,Looking back on the things I've done,I was trying to be someone,I played my part. kept you in the dark,Now let me show you the shape of my heart,I'm here with my confession,Got nothing to hide no more,I don't know where to start,But to show you the shape of my heart,I'm lookin' back on things I've done,I never wanna play the same old part,I'll keep you in the dark,Now let me show you the shape of my heart,Looking back on the things I've done,I was trying to be someone,I played my part. kept you in the dark,Now let me show you the shape of my heart,Looking back on the things I've done,I was trying to be someone,I played my part. kept you in the dark,Now let me show you the shape of,Show you the shape of my heart".split(',')
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
    1: {
      title: 'Shape of My Heart',
      album: 'Black & Blue',
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    },
  },
};

// REDUCER WILL GO HERE

const lyricChangeReducer = (state = initialState.songsById, action) => {

  // Declares several variables used below, without yet defining.
  let newArrayPosition;
  let newSongByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':

      // Locates the arrayPosition of the song whose ID was provided
      // in the action's payload, and increments it by one:
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;

      // Creates a copy of that song's entry in the songsById state slice,
      // and adds the updated newArrayPosition value we just calculated as its arrayPosition:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition,
      });

      // Creates a copy of the entire songsById state slice, and adds the
      // updated newSongsById state entry we just created to this new copy:
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByEntry,
      });

      // Returns the entire newSongsByIdStateSlice we just constructed, which will
      // update state in our Redux store to match this returned value:
      return newSongsByIdStateSlice;

    case 'RESTART_SONG':

      // Creates a copy of the song entry in songsById state slice whose ID matches
      // the currentSongId included with the action, sets the copy's arrayPosition value
      // to 0:
      newSongsbyIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0,
      });

      // Creates a copy of the entire songsById state slice, and adds the
      // updated newSongsByIdEntry we just created to this copy:
      newSongsByIdStateSlice = Object.assign({}, state[action.currentSongId], {
        [action.currentSongId]: newSongsByIdEntry,
      });

      // Returns the entire newSongsByIdStateSlice we just constructed, which will
      // update the songsById state slice in our Redux store to match the new slice returned:
      return newSongsByIdStateSlice;
    default:

      // If action is neither 'NEXT_LYRIC' nor 'RESTART_STATE' type, return existing state:
      return state;
  }
};

// JEST TESTS + SETUP WILL GO HERE
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: "Bye Bye Bye",
    album: 'Millennium',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
      album: 'Black & Blue',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});
//
expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1: {
    title: "Bye Bye Bye",
    album: 'Millennium',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    album: 'Black & Blue',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});
// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

// console.log(store.getState());

//RENDERING STATE IN DOM
// const renderLyrics = () => {
//   // defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
//   const lyricsDisplay = document.getElementById('lyrics');
//
//   // if there are already lyrics in this div, remove them one-by-one until it is empty:
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//
//   // Locates the song lyric at the current arrayPosition:
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//
//   // Creates DOM text node containing the song lyric identified in line above:
//   const renderedLine = document.createTextNode(currentLine);
//
//   // Adds text node created in line above to 'lyrics' div in DOM
//   document.getElementById('lyrics').appendChild(renderedLine);
// };
//
// // runs renderLyrics() method from above when page is finished loading.
//
// // window.onload is HTML5 version of jQuery's $(document).ready()
// window.onload = function () {
//   renderLyrics();
// };
//
// CLICK LISTENER
// const userClick = () => {
//   const currentState = store.getState();
//   if (currentState.arrayPosition ===      currentState.songLyricsArray.length - 1) {
//     store.dispatch({ type: 'RESTART_SONG' });
//   } else {
//     store.dispatch({ type: 'NEXT_LYRIC' });
//   };
// };
//
// // SUBSCRIBE TO REDUX store
// store.subscribe(renderLyrics);
