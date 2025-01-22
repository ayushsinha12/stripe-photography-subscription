"use client";

import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

/**
 * DownloadButton component
 * Handles downloading an image and tracks usage with Supabase and API integration.
 * 
 * @param {string} image - The image identifier to be downloaded.
 */
export default async function DownloadButton({ image }: { image: string }) {
  const handleDownload = async () => {

    // Retrieve the current session to get the access token
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    // Make a POST request to the usage-meter API to track the download
    const res = await fetch("/api/usage-meter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ image }),
    });

    // Check if the response is successful
    if (res.ok) {
      const { total_downloads } = await res.json();
      toast.success(`Success! You have downloaded ${total_downloads} images`);
    } else {
      const err = await res.json();
      toast.error(`Error! ${err.message}`);
    }
  };

  return (
    // Button for triggering the handleDownload function
    <>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download
      </button>
    </>
  );
}