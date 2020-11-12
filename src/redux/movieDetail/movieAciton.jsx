export const setMovie = (res) => {
  return {
    type: "setDetail",
    payload: res
  };
};
export const setActors=(res)=>{
  return {type:"setActors",
  payload:res
}
}