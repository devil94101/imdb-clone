const ini = {
  id:"",
  detail:[],
  actors:[],
  directors:[]
};
export const movieReducer = (state = ini, action) => {
  switch (action.type) {
    case "setDetail":
      return {
        ...state,
       id:action.payload.id,
       detail:action.payload.data
      };
    case "setActors":
      return{
        ...state,
        actors:[...state.actors,...action.payload.actors]
      }
    case "setDirectors":
      return({
        ...state,
        directors:[...state.directors,...action.payload.directors]
      })
    default:
      return state;
  }
};
