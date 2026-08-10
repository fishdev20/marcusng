import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  fullName: string;
  email: string;
  message: string;
};

export function ContactEmail({ fullName, email, message }: ContactEmailProps) {
  const firstName = fullName.split(" ")[0] || fullName;
  const replySubject = encodeURIComponent(`Re: Portfolio message from ${fullName}`);
  const replyUrl = `mailto:${email}?subject=${replySubject}`;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        {fullName} sent you a message: {message.slice(0, 80)}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.shell}>
          <Section style={styles.header}>
            <Row>
              <Column style={styles.brandColumn}>
                <Text style={styles.mark}>M(</Text>
              </Column>
              <Column>
                <Text style={styles.brand}>MARCUS NG / PORTFOLIO</Text>
              </Column>
              <Column align="right">
                <Text style={styles.status}>
                  <span style={styles.statusDot}>●</span> NEW INQUIRY
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.eyebrow}>CONTACT / INBOUND</Text>
            <Heading as="h1" style={styles.heading}>
              New message from
              <br />
              {fullName}
            </Heading>

            <Section style={styles.senderSection}>
              <Row>
                <Column style={styles.senderColumn}>
                  <Text style={styles.label}>FROM</Text>
                  <Text style={styles.senderName}>{fullName}</Text>
                </Column>
                <Column style={styles.emailColumn}>
                  <Text style={styles.label}>REPLY TO</Text>
                  <Link href={`mailto:${email}`} style={styles.emailLink}>
                    {email}
                  </Link>
                </Column>
              </Row>
            </Section>

            <Section style={styles.messageSection}>
              <Text style={styles.label}>MESSAGE</Text>
              <Text style={styles.message}>{message}</Text>
            </Section>

            <Button href={replyUrl} style={styles.button}>
              Reply to {firstName}
            </Button>
          </Section>

          <Hr style={styles.rule} />

          <Section style={styles.footer}>
            <Row>
              <Column>
                <Text style={styles.footerText}>Sent from your portfolio contact form.</Text>
              </Column>
              <Column align="right">
                <Text style={styles.footerMeta}>MARCUSNG.DEV</Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const sans = "Arial, Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const mono = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    color: "#fafafa",
    fontFamily: sans,
    margin: "0",
    padding: "48px 16px",
  },
  shell: {
    backgroundColor: "#09090b",
    border: "1px solid #27272a",
    borderRadius: "6px",
    margin: "0 auto",
    maxWidth: "640px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#111113",
    borderBottom: "1px solid #27272a",
    padding: "14px 20px",
  },
  brandColumn: {
    width: "38px",
  },
  mark: {
    backgroundColor: "#fafafa",
    borderRadius: "5px",
    color: "#09090b",
    fontFamily: mono,
    fontSize: "12px",
    fontWeight: "700",
    height: "28px",
    lineHeight: "28px",
    margin: "0",
    textAlign: "center" as const,
    width: "28px",
  },
  brand: {
    color: "#e4e4e7",
    fontFamily: mono,
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    margin: "0",
  },
  status: {
    color: "#a1a1aa",
    fontFamily: mono,
    fontSize: "9px",
    letterSpacing: "0.08em",
    margin: "0",
  },
  statusDot: {
    color: "#22c55e",
    fontSize: "9px",
  },
  content: {
    padding: "48px 44px 44px",
  },
  eyebrow: {
    color: "#71717a",
    fontFamily: mono,
    fontSize: "10px",
    fontWeight: "500",
    letterSpacing: "0.12em",
    margin: "0 0 18px",
  },
  heading: {
    color: "#fafafa",
    fontFamily: sans,
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    lineHeight: "1.2",
    margin: "0 0 36px",
  },
  senderSection: {
    borderBottom: "1px solid #27272a",
    borderTop: "1px solid #27272a",
    padding: "20px 0",
  },
  senderColumn: {
    paddingRight: "20px",
    verticalAlign: "top" as const,
    width: "42%",
  },
  emailColumn: {
    borderLeft: "1px solid #27272a",
    paddingLeft: "24px",
    verticalAlign: "top" as const,
  },
  label: {
    color: "#71717a",
    fontFamily: mono,
    fontSize: "10px",
    fontWeight: "500",
    letterSpacing: "0.1em",
    margin: "0 0 8px",
  },
  senderName: {
    color: "#fafafa",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "1.5",
    margin: "0",
  },
  emailLink: {
    color: "#d4d4d8",
    fontSize: "14px",
    lineHeight: "1.5",
    textDecoration: "underline",
    textDecorationColor: "#52525b",
    textUnderlineOffset: "3px",
  },
  messageSection: {
    padding: "30px 0 32px",
  },
  message: {
    color: "#e4e4e7",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.75",
    margin: "0",
    whiteSpace: "pre-line" as const,
  },
  button: {
    backgroundColor: "#fafafa",
    borderRadius: "5px",
    color: "#09090b",
    display: "block",
    fontSize: "14px",
    fontWeight: "700",
    padding: "14px 22px",
    textAlign: "center" as const,
    textDecoration: "none",
  },
  rule: {
    borderColor: "#27272a",
    margin: "0",
  },
  footer: {
    padding: "18px 20px",
  },
  footerText: {
    color: "#71717a",
    fontSize: "11px",
    lineHeight: "1.5",
    margin: "0",
  },
  footerMeta: {
    color: "#52525b",
    fontFamily: mono,
    fontSize: "9px",
    letterSpacing: "0.1em",
    margin: "0",
  },
};
