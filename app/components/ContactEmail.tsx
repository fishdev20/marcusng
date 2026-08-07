import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  fullName: string;
  email: string;
  message: string;
};

export function ContactEmail({ fullName, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio message from {fullName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>New contact message</Heading>
          <Section>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{fullName}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>
          <Hr style={styles.rule} />
          <Text style={styles.footer}>Sent from the portfolio contact form.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: "Arial, sans-serif",
    padding: "40px 16px",
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e4e4e7",
    borderRadius: "6px",
    margin: "0 auto",
    maxWidth: "600px",
    padding: "28px",
  },
  heading: { color: "#18181b", fontSize: "24px", margin: "0 0 24px" },
  label: { color: "#71717a", fontSize: "12px", fontWeight: "bold", margin: "18px 0 4px" },
  value: { color: "#18181b", fontSize: "15px", margin: 0 },
  message: {
    color: "#27272a",
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-line" as const,
  },
  rule: { borderColor: "#e4e4e7", margin: "28px 0 20px" },
  footer: { color: "#71717a", fontSize: "12px", margin: 0 },
};
