export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user;
  } else {
    return {};
  }
}
