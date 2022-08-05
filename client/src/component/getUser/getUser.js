export function setUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  // const user = window.localStorage.getItem("user");
  sessionStorage.getItem("user");
  return sessionStorage.getItem("user");
}

export function deleteUser() {
  // window.localStorage.removeItem("user");
  sessionStorage.removeItem("user");
}
