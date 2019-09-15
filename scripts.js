// LYRICS to BSB - I WANT IT THAT WAY
const songLyricsArray = "Yeah,You are my fire,The one desire,Believe when I say,I want it that way,But we are two worlds apart,Can't reach to your heart,When you say,That I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Am I your fire?,Your one desire,Yes I know it's too late,But I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Now I can see that we've fallen apart,From the way that it used to be, yeah,No matter the distance,I want you to know,That deep down inside of me,You are my fire,The one desire,You are (you are you are you are),Don't want to hear you say,Ain't nothin' but a heartache,Ain't nothin' but a mistake (Don't want to hear you say),I never want to hear you say,I want it that way,Tell me why,Ain't nothin' but a heartache,Tell me why,Ain't nothin' but a mistake,Tell me why,I never want to hear you say,I want it that way,Tell me why,Ain't nothin' but a heartache,Ain't nothin' but a mistake,Tell me why,I never want to hear you say (Never want to hear you say it),I want it that way,Cause I want it that way".split(',');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
};

// REDUCER WILL GO HERE
let newState;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      };
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
      return state;
  }
};

// JEST TESTS + SETUP WILL GO HERE
const { expect } = window;

expect(reducer(initialState, { type: null })).toEqual(initialState);

expect(reducer(initialState, { type: 'NEXT_LYRIC' })).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1,
});

expect(reducer({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1,
},
  { type: 'RESTART_SONG' })
).toEqual(initialState);

// REDUX STORE
const { createStore } = Redux;
const store = createStore(reducer);

// console.log(store.getState());

//RENDERING STATE IN DOM
const renderLyrics = () => {
  // defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
  const lyricsDisplay = document.getElementById('lyrics');

  // if there are already lyrics in this div, remove them one-by-one until it is empty:
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }

  // Locates the song lyric at the current arrayPosition:
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];

  // Creates DOM text node containing the song lyric identified in line above:
  const renderedLine = document.createTextNode(currentLine);

  // Adds text node created in line above to 'lyrics' div in DOM
  document.getElementById('lyrics').appendChild(renderedLine);
};

// runs renderLyrics() method from above when page is finished loading.

// window.onload is HTML5 version of jQuery's $(document).ready()
window.onload = function () {
  renderLyrics();
};

// CLICK LISTENER
const userClick = () => {
  const currentState = store.getState();
  if (currentState.arrayPosition ===      currentState.songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC' });
  };
};

// SUBSCRIBE TO REDUX store
store.subscribe(renderLyrics);
