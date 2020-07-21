import jwt from "jwt-decode";

export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    const decoded = jwt(token);
    console.log(decoded);
    const now = Date.now().valueOf() / 1000;
    if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
      localStorage.removeItem("token");
      return "";
    }
    if (typeof decoded.nbf !== "undefined" && decoded.nbf > now) {
      localStorage.removeItem("token");
      return "";
    }
    return token;
  } else {
    return "";
  }
}
