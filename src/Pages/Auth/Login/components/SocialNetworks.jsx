import React from "react";
import facebook from "../../../../assets/images/facebook.png";
import google from "../../../../assets/images/google.png";
export default function SocialNetworks() {
  return (
    <div>
      <div className="flex flex-col space-y-4 mb-8">
        <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50">
          <img src={google} alt="google" className="h-5" />
          Sign in with Google
        </button>
        <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50">
          <img src={facebook} alt="google" className="h-5" />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}
