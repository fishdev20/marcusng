import calenview1 from "@/assets/images/projects/calenview1.png";
import calenview2 from "@/assets/images/projects/calenview2.png";
import calenview3 from "@/assets/images/projects/calenview3.png";
import calenview4 from "@/assets/images/projects/calenview4.png";
import kassavirtanen from "@/assets/images/projects/kassavirtanen.png";
import logset1 from "@/assets/images/projects/logset1.png";
import logset2 from "@/assets/images/projects/logset2.png";
import omakala1 from "@/assets/images/projects/omakala1.png";
import omakala2 from "@/assets/images/projects/omakala2.png";
import talousvirta from "@/assets/images/projects/talousvirta.png";
import { LinkPreview } from "@/components/ui/link-preview";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export const data = [
  {
    title: "Nov, 2022 - Present",
    content: (
      <div>
        <p className="font-incognito mb-4 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          Software Engineer{" "}
          <span>
            <LinkPreview
              className="font-medium text-blue-400 dark:text-blue-400 relative no-underline before:content-[''] before:absolute before:w-full before:h-0.5 before:rounded before:bg-blue-400 before:bottom-[-3px] before:left-0 before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:origin-left hover:before:scale-x-100"
              url="https://www.kassavirtanen.fi/en/"
            >
              @Triona Oy
            </LinkPreview>
          </span>
        </p>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Card grid component
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Startup template Aceternity
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Random file upload lol
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Himesh Reshammiya Music CD
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Salman Bhai Fan Club registrations open
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src={omakala1}
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={omakala2}
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={logset1}
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={logset2}
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Mar, 2022 - Nov, 2022",
    content: (
      <div>
        <p className="font-incognito mb-4 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          Frontend Engineer{" "}
          <span>
            <LinkPreview
              className="font-medium text-blue-400 dark:text-blue-400 relative no-underline before:content-[''] before:absolute before:w-full before:h-0.5 before:rounded before:bg-blue-400 before:bottom-[-3px] before:left-0 before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:origin-left hover:before:scale-x-100"
              url="https://www.kassavirtanen.fi/en/"
            >
              @Kassavirtanen Oy
            </LinkPreview>
          </span>
        </p>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Developed highly intuitive and responsive billing and invoicing services dashboard,
            improved overall user experience and functionality.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Diagnosed and resolved complex issues and bugs, ensuring seamless operation of key
            dashboard features and enhancing overall stability.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Actively refactored and optimized internal projects, ensuring code quality and
            adherence to best practices.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Designed and implemented new features, maintaining and evolving multiple products
            within the company’s portfolio.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Collaborated closely with cross-functional teams, including C#/.NET developers, to
            deliver robust and efficient web applications that meet both user needs and business
            goals.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src={kassavirtanen}
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={talousvirta}
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Sep, 2021 - Apr, 2022",
    content: (
      <div>
        <p className="font-incognito mb-4 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          Web developer{" "}
          <span>
            <LinkPreview
              className="font-medium text-blue-400 dark:text-blue-400 relative no-underline before:content-[''] before:absolute before:w-full before:h-0.5 before:rounded before:bg-blue-400 before:bottom-[-3px] before:left-0 before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:origin-left hover:before:scale-x-100"
              url="https://classfunc.com/"
            >
              @Classfunc Softwares
            </LinkPreview>
          </span>
        </p>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Developed high-quality UI components for calendar, streaming platforms, and meeting
            applications, specifically tailored to meet the unique business needs of Japanese
            clients.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Collaborated closely with the design and backend teams to ensure seamless integration
            of UI with the underlying architecture, enhancing both user experience and system
            performance.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Addressed critical bugs and implemented new features, continuously improving
            application functionality and stability in fast-paced development cycles.
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Worked directly with international clients, translating business requirements into
            technical solutions that drive user engagement and meet project objectives.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src={calenview1}
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={calenview2}
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={calenview3}
            alt="bento template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src={calenview4}
            alt="cards template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
];

export default function ExperienceSection() {
  return (
    <div className="relative w-full overflow-clip max-w-7xl mx-auto md:px-16 px-6">
      <Timeline data={data} />
    </div>
  );
}
