import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import {
  centered,
  container,
  content,
  footer,
  footerText,
  heading,
  img,
  link,
  main,
} from "./styles";

const ChangeEmail = (newEmail: string) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={centered}>
          <Img
            src="https://example.com/placeholder.svg"
            width="96"
            height="96"
            alt="Acme Inc"
            style={img}
          />
          <Heading style={heading}>Email change requested</Heading>
        </Section>

        <Section style={content}>
          <Text>Hello</Text>
          <Text>
            We received a request to change your account email to{" "}
            <strong>{newEmail}</strong>. If this was you, no further action is
            needed. If not, please contact our support team immediately to
            secure your account.
          </Text>
          <Text>
            Best regards,
            <br />
            Scrib Team
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Need help? Contact us at{" "}
            <Link href="" style={link}>
              support@example.com
            </Link>
          </Text>
          <Text style={footerText}>
            This is an automated message, please do not reply to this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ChangeEmail;
