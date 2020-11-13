const ini = {
  id:"",
  detail:[],
  actors:[]
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
        actors:action.actors
      }
    default:
      return state;
  }
};
