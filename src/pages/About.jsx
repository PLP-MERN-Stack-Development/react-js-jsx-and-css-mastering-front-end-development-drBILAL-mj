import React from "react";

export default function About() {
    return (
        <main
            className="max-w-[900px] mx-auto my-10 p-7 font-sans text-[#222] bg-white rounded-[10px] shadow-[0_6px_18px_rgba(20,20,30,0.08)] leading-relaxed"
            aria-labelledby="about-heading"
        >
            <header className="mb-3 flex items-baseline gap-3">
                <h1 id="about-heading" className="text-[26px] font-bold m-0">
                    About this project
                </h1>
                <p className="text-sm text-[#666] m-0">
                    React · JSX · CSS · MERN learning exercise
                </p>
            </header>

            <section className="mt-4.5">
                <p>
                    This repository contains frontend examples and exercises used to learn
                    modern React with JSX and styling patterns. The goal is to practice
                    component design, props, state, routing and styling so you can build
                    maintainable user interfaces for MERN stack applications.
                </p>
            </section>

            <section className="mt-4.5">
                <h2 className="my-2">Key features</h2>
                <ul className="pl-5 my-2">
                    <li>Small, focused React components with clear structure</li>
                    <li>Modern JSX patterns and accessible markup</li>
                    <li>Simple, responsive styling and layout examples</li>
                    <li>API Integration, Fetching Data in Public APIs</li>
                </ul>
            </section>

            <section className="mt-4.5">
                <h2 className="my-2">Tech stack (examples)</h2>
                <div>
                    {[
                        "React",
                        "React Router",
                        "Node.js",                       
                        "TailwindCSS",
                    ].map((tech) => (
                        <span
                            key={tech}
                            className="inline-block px-[10px] py-[6px] mr-2 mb-1 bg-[#f2f6ff] text-[#0b4dff] rounded-[6px] text-[13px] font-semibold"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            <section className="mt-4.5">
                <h2 className="my-2">How to use</h2>
                <ol className="pl-5 my-2 list-decimal">
                    <li>Open the project in your editor.</li>
                    <li>Start the frontend: run the project's start script (npm run dev).</li>
                    <li>Explore pages and components in the src/ directory.</li>
                    <li>Modify or extend components to learn patterns and behavior.</li>
                </ol>
            </section>

            <footer className="mt-5 pt-3.5 border-t border-[#eef2ff] text-[#444] text-sm">
                <div>
                    Author: <strong>Dr Bilal</strong> (learning repository)
                </div>
                <div className="mt-2">
                    License: <em>Educational / demo use</em>
                </div>
            </footer>
        </main>
    );
}