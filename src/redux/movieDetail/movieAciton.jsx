export const setMovie = (res) => {
  return {
    type: "setSearch",
    payload: res
  };
};
export const setActors=(res)=>{
  return {type:"setActors",
  payload:res
}
}