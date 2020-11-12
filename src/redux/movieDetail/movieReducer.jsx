const ini = {
  id:"",
  data:[],
  actors:[]
};
export const movieReducer = (state = ini, action) => {
  switch (action.type) {
    case "setSearch":
      return {
        ...state,
       id:action.payload.id,
       data:action.payload.data
      };
    case "setActor":
      return{
        ...state,
        actors:action.actors
      }
    default:
      return state;
  }
};
