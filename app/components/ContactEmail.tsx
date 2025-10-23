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

interface ContactEmailProps {
  fullName: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ fullName, email, message }: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Message</Heading>
          <Section>
            <Text style={label}>From:</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>This message was sent from your portfolio contact form.</Text>
        </Container>
      </Body>
    </Html>
  );
};

// ---- Styles ----
const main = {
  backgroundColor: "#f4f4f4",
  padding: "40px 0",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#111",
  marginBottom: "16px",
};

const label = {
  fontWeight: "bold",
  color: "#333",
  marginTop: "12px",
  marginBottom: "4px",
};

const value = {
  color: "#555",
  margin: 0,
};

const messageStyle = {
  whiteSpace: "pre-line" as const,
  lineHeight: "1.5",
  color: "#444",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  color: "#888",
};
