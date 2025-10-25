// src/components/ui/Card.jsx
import React from "react";

/**
 * Simple Card component
 * - title: optional heading
 * - children: content inside card
 * - className: extra classes
 */
export default function Card({ title, children, className = "" }) {
  return (
    <div className={`rounded-lg shadow-sm border border-gray-200 p-4 bg-white ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
