const {
  GET_VIDEOGAMES,
  VIDEOGAME_NAME,
  CREATE_VIDEOGAME,
  FILTER_VIDEOGAME,
  ORDER_VIDEOGAME,
  NEXT_PAGE,
  PREV_PAGE,
} = require("./actionTypes");

const initialState = {
  users: [],
  filteredVideogames: [],
  createVideogames: [],
  numPage: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOGAMES:
      return { ...state, users: payload };

    case VIDEOGAME_NAME:
      return { ...state, users: payload };

    case CREATE_VIDEOGAME:
      return {
        ...state,
        createVideogames: [...state.createVideogames, payload],
      };

    case FILTER_VIDEOGAME:
      let filteredVideogames = state.users;

      if (payload === "true") {
        filteredVideogames = state.users.filter(
          (user) => user.created === true
        );
      } else if (payload === "false") {
        filteredVideogames = state.users.filter(
          (user) => user.created === false
        );
      } else {
        filteredVideogames = state.users.filter(
          (user) => user.genres && user.genres.includes(payload)
        );
      }

      return { ...state, filteredVideogames };

    case ORDER_VIDEOGAME:
      // const copyUser =[...state.users];
      // return{
      //   ...state,
      //   users: payload === 'A'
      //   ? copyUser.sort((a, b)=> a.name - b.name)
      //   : copyUser.sort((a, b)=> b.name - a.name)
      // }
      const copyUsers =
        state.filteredVideogames.length === 0
          ? [...state.users]
          : [...state.filteredVideogames];
      if (payload === "Ascendent") {
        copyUsers.sort((a, b) => a.name.localeCompare(b.name));
      } else if (payload === "Descendent") {
        copyUsers.sort((a, b) => b.name.localeCompare(a.name));
      } else if (payload === "Me") {
        copyUsers.sort((a, b) => a.rating - b.rating);
      } else if (payload === "Ma") {
        copyUsers.sort((a, b) => b.rating - a.rating);
      }

      return { ...state, users: copyUsers };
    
    case NEXT_PAGE:
      return{ ...state, numPage: state.numPage + 1}

    case PREV_PAGE:
      return { ...state, numPage: state.numPage - 1}

    default:
      return { ...state };
  }
};

export default reducer;
