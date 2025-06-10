"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Bookmark Manager",
    short: "A simple and efficient bookmark management tool.",
    description:
      "A web application to save, organize, and share bookmarks with a clean UI. Built with Next.js, Tailwind CSS, and Supabase.",
    url: "https://bookmark-manager-s62g.vercel.app/",
  },
  {
    title: "Aryanbhx Portfolio",
    short: "My personal portfolio showcasing my projects and skills.",
    description:
      "This portfolio website built with Next.js and Tailwind CSS highlights my projects, skills, and experiences. It features a clean design and responsive layout.",
    url: "https://aryanbhx.vercel.app/",
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section
      id="projects"
      className="scroll-mt-20 min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background"
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">My Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="border hover:border-primary transition-all"
          >
            <CardHeader
              className="cursor-pointer"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <p className="text-muted-foreground">{project.short}</p>
            </CardHeader>

            {expanded === index && (
              <CardContent className="text-left space-y-4 text-sm sm:text-base">
                <p>{project.description}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(project.url, "_blank")}
                >
                  View Project
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
