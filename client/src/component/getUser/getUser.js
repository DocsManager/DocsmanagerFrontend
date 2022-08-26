export function setSessionUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const user = sessionStorage.getItem("user");
  return JSON.parse(user);
}

export function deleteUser() {
  sessionStorage.removeItem("user");
}
