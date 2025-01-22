"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

/**
 * LoginForm component to create a new user with random email and password.
 * Utilizes Supabase authentication for signup.
 */
export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  /**
   * Handles the signup process by generating random credentials
   * and signing up the user through Supabase.
   */
  const handleSignUp = async () => {
    setLoading(true);

    // Generate a random email and password
    const randomEmail = `${Math.random().toString(36).substring(7)}@gmail.com`;
    const password = "Password69420";

    // Call Supabase's signup function
    const { data, error } = await supabase.auth.signUp({
      email: randomEmail,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("User created and logged in:", data);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleSignUp}
      disabled={loading}
      className='btn btn-primary'
    >
      {loading ? "Signing up..." : "Sign up with random email and password"}
    </button>
  );
}