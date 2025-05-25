import React from "react";

export default function LoginPage() {
  const handleLogin = () => {
    // Redirect to backend to start Google OAuth
    window.location.href = "https://medisync.inbayti.store/api/v1/auth/google";
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
