import type { Certificate } from "@/types/certificate";
import { Award, Paperclip } from "lucide-react";
import Image from "next/image";
import { Section } from "./section";

function formatCertificateDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T00:00:00Z`))
    .replace("/", ".");
}

export function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  return (
    <Section id="certificates" label="Certificates" titlePosition="top">
      {certificates.length ? (
        <div>
          {certificates.map((certificate) => (
            <CertificateRow key={certificate._id} certificate={certificate} />
          ))}
        </div>
      ) : (
        <p className="text-[13px] leading-6 text-muted-foreground">
          Certificate entries will appear here when published.
        </p>
      )}
    </Section>
  );
}

function CertificateRow({ certificate }: { certificate: Certificate }) {
  const issued = formatCertificateDate(certificate.issueDate);
  const expires = formatCertificateDate(certificate.expirationDate);

  return (
    <article className="grid grid-cols-[128px_minmax(0,1fr)] sm:grid-cols-[168px_minmax(0,1fr)]">
      <div className="relative grid min-h-28 place-items-center overflow-hidden rounded-md border border-border/70">
        {certificate.issuerLogo?.url ? (
          <Image
            src={certificate.issuerLogo.url}
            alt={certificate.issuerLogo.alt || `${certificate.issuer} logo`}
            fill
            sizes="(min-width: 640px) 168px, 128px"
            className="object-cover"
          />
        ) : (
          <Award className="size-5 text-muted-foreground" aria-hidden="true" />
        )}
      </div>

      <div className="flex min-w-0 items-center justify-between gap-4 py-4 pl-4 sm:pl-5">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-5 text-foreground sm:text-[16px]">
            {certificate.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-y-1 text-[12px] leading-5 text-muted-foreground sm:text-[13px]">
            <span className="pr-2">@ {certificate.issuer}</span>
            {issued ? <span className="border-l px-2">{issued}</span> : null}
            {expires ? <span className="border-l px-2">Expires {expires}</span> : null}
            {certificate.credentialId ? (
              <span className="border-l px-2 font-mono text-[10px]">
                ID {certificate.credentialId}
              </span>
            ) : null}
            {certificate.description ? (
              <span className="border-l px-2">{certificate.description}</span>
            ) : null}
          </div>
        </div>

        {certificate.credentialUrl ? (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:text-foreground"
            aria-label={`Open ${certificate.title} certificate`}
          >
            <Paperclip className="size-4" aria-hidden="true" />
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full right-0 z-10 mb-2.5 whitespace-nowrap rounded-md bg-foreground px-3 py-2 text-[12px] font-medium text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              Open certificate
              <span
                aria-hidden="true"
                className="absolute -bottom-1 right-3 size-2 rotate-45 bg-foreground"
              />
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
