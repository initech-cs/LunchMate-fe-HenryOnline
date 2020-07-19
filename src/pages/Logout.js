import React from "react";
import authHeader from "../ultils/getData";

export default function Logout() {
  return (
    <div>
      <h1>Logout Successfully!</h1>
      {authHeader}
    </div>
  );
}
