import localFont from "next/font/local";

export const gitlabmono = localFont({
  src: [
    {
      path: "gitlab-mono.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "gitlab-mono.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "gitlab-mono.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "gitlab-mono.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--gitlabmono",
  display: "swap",
});
