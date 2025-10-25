// src/pages/Home.jsx
import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to MyApp</h1>

      <Card title="Example Card">
        <p className="mb-4">This is a simple card component used to display content.</p>
        <div className="flex gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>
    </div>
  );
}
