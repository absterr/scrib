import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Button,
  Section,
} from "@react-email/components";
import {
  main,
  centered,
  container,
  img,
  heading,
  content,
  button,
  link,
  footer,
  footerText,
} from "./styles";
import * as React from "react";
import { Img, Link } from "@react-email/components";

const PasswordReset = (resetUrl: string) => (
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
          <Heading style={heading}>Reset your password</Heading>
        </Section>

        <Section style={content}>
          <Text>Hello</Text>
          <Text>
            We received a request to reset your password. If you didn&apos;t
            make this request, please ignore this email.
          </Text>
          <Text>Click the button below to reset your password: </Text>
          <Button href={resetUrl} style={button}>
            Reset Password
          </Button>
          <Text>This link will expire in 15 minutes for security reasons.</Text>
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

export default PasswordReset;
