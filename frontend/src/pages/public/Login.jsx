import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

import AuthCallback from "../auth/AuthCallback";

function Login() {
  return (
    <>
      <SignedOut>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <AuthCallback />
      </SignedIn>
    </>
  );
}

export default Login;
