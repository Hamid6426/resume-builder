import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

if (!token) throw new Error("No token found.");

let decodedToken;
try {
  decodedToken = jwtDecode(token);
} catch (error) {
  throw new Error("Failed to decode token: " + error.message);
}

export const id = decodedToken.id;
export const user_id = decodedToken.id; // when used as foriegn key
export const username = decodedToken.username;

