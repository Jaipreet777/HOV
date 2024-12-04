import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth"; // Adjust path as needed

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <h2 className="text-3xl font-bold mb-6">
          Welcome, {user.displayName || "User"}!
        </h2>
        <p className="text-lg mb-4">Email: {user.email}</p>
        <button
          onClick={() => auth.signOut()}
          className="px-4 py-2 bg-black text-white hover:bg-gray-900 rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center  min-h-screen px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {resetEmailSent && (
        <p className="text-green-500 mb-4">
          Password reset email sent successfully!
        </p>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        {isLogin && (
          <p
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 hover:underline cursor-pointer text-right"
          >
            Forgot Password?
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-[51%] py-2 mt-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
      >
        <img
          src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
          alt="Google"
          className="w-9 h-5 mr-2"
        />
        Sign in with Google
      </button>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-gray-500 hover:underline cursor-pointer text-center"
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Login;
