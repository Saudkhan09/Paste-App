import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  FaEdit,
  FaEye,
  FaTrash,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";

const Paste = () => {
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted");
  }

  function handleShare(paste) {
    const url = `${window.location.origin}/pastes/${paste._id}`;

    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
<h1 className="text-2xl font-bold mb-4">
  All Pastes
</h1>
      {/* Search */}
      <input
        className="p-3 rounded-lg border w-72 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="flex flex-col gap-6">
        {filteredData.map((paste) => (
          <div
            key={paste._id}
            className="bg-white rounded-xl shadow-sm p-5 relative"
          >
            {/* Icons - Top Right */}
            <div className="absolute top-4 right-4 flex gap-4 text-lg">

              <Link
                to={`/?pasteId=${paste._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </Link>

              <Link
                to={`/pastes/${paste._id}`}
                className="text-gray-600 hover:text-black"
              >
                <FaEye />
              </Link>

              <button
                onClick={() => handleDelete(paste._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied");
                }}
                className="text-green-500 hover:text-green-700"
              >
                <FaCopy />
              </button>

              <button
                onClick={() => handleShare(paste)}
                className="text-purple-500 hover:text-purple-700"
              >
                <FaShareAlt />
              </button>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-semibold text-gray-800 pr-32">
              {paste.title}
            </h2>

            <p className="text-gray-600 mt-2 line-clamp-3">
              {paste.content}
            </p>

            {/* Date */}
            <p className="text-sm text-gray-500 mt-4">
              {new Date(paste.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;