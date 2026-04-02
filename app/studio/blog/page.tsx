import { getBlogStudioUrl } from "@/lib/studio-links";
import { redirect } from "next/navigation";

export default function BlogStudioRedirectPage() {
  redirect(getBlogStudioUrl());
}
