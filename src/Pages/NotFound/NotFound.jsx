import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    // <div>
    //    <h2>NotFound page</h2>
    // </div>
    <div className="bg-gray-100">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <p className="text-4xl font-medium text-gray-800">Page Not Found</p>
        <Link
          to="/"
          className="mt-4 text-xl text-blue-60 text-[#F6A940] hover:underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
