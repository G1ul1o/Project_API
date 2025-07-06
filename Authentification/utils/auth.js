export function isLoggedIn() {
  const token = localStorage.getItem('jwtToken');
  return !!token;
}

export function logout() {
  localStorage.removeItem('jwtToken');
}