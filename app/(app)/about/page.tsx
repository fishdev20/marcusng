import SectionWrapper from "@/components/ui/section-wrapper";

export default function AboutPage() {
  return (
    <SectionWrapper className="h-full min-h-screen z-50">
      <div>
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-gray-700">
          Welcome to my portfolio! I am a passionate software engineer with a focus on building
          innovative and efficient applications. My journey in tech has been driven by a love for
          problem-solving and continuous learning.
        </p>
        <p className="mt-4 text-lg text-gray-700">
          Feel free to explore my projects and get in touch if you'd like to collaborate or learn
          more about my work!
        </p>
      </div>
    </SectionWrapper>
  );
}
