const ini = {
  search:"",
  data:[]
};
export const listReducer = (state = ini, action) => {
  switch (action.type) {
    case "setSearch":
      return {
       search:action.payload.search,
       data:action.payload.data
      };
    default:
      return state;
  }
};
