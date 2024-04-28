export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("userTK", token);
};
export const getTokenFromLocalStorage = () => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("userTK");
  }
  return token;
};
export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem("userTK");
};
