// src/components/ApiItem.jsx
import React from "react";

/**
 * ApiItem: shows a single post (title + body)
 */
export default function ApiItem({ item }) {
  return (
    <article className="border rounded p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-700">{item.body}</p>
      <div className="text-xs text-gray-400 mt-2">ID: {item.id}</div>
    </article>
  );
}
