const ini = {
  user: null
};
export const userReducer = (state = ini, action) => {
  switch (action.type) {
    case "setUser":
      return {
        user: action.payload.name,
        token: action.payload.token
      };

    default:
      return state;
  }
};
