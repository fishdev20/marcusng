"use client";
import { useState } from "react";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  homepage?: string;
  owner: {
    avatar_url: string;
  };
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  // useEffect(() => {
  //   fetch("https://api.github.com/users/fishdev20/starred")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched GitHub repos:", data);
  //       // Optional: filter only pinned or featured repos
  //       const filtered = data.filter((repo: GitHubRepo) => !repo.fork); // exclude forks
  //       setRepos(filtered);
  //     });
  // }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto py-20">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="dark:bg-neutral-600/20 border rounded-lg shadow-lg p-6 backdrop-blur-lg  dark:border-white/20 border-black/20 supports-[backdrop-filter]:bg-background/30"
        >
          <img
            src={`https://opengraph.githubassets.com/1/${repo.owner.avatar_url.split("/")[3]}/${repo.name}`}
            alt={repo.name}
            className="rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400">{repo.name}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{repo.description}</p>
        </a>
      ))}
    </div>
  );
}
