import { Testimonial2 } from "@/components/testimonial-2";
import type { Testimonial } from "@/types/testimonial";
import { Section } from "./section";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <Section id="testimonials" label="Testimonials" titlePosition="top">
      <div>
        {testimonials.slice(0, 4).map((testimonial) => (
          <Testimonial2
            key={testimonial._id}
            quote={testimonial.quote}
            authorName={testimonial.name}
            authorTagline={[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
            authorImage={testimonial.avatar?.url}
            authorImageAlt={testimonial.avatar?.alt}
            url={testimonial.linkedinUrl}
            className="border-b last:border-b-0"
          />
        ))}
      </div>
    </Section>
  );
}
