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
  container,
  centered,
  footerText,
  link,
  img,
  heading,
  content,
  button,
  footer,
} from "./styles";
import { Img, Link } from "@react-email/components";
import * as React from "react";

const EmailVerification = (verificationUrl: string) => (
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
          <Heading style={heading}>Verify your email address</Heading>
        </Section>

        <Section style={content}>
          <Text>Hello</Text>
          <Text>
            We received a request to verify this email address. If you
            didn&apos;t make this request, please ignore this email.
          </Text>
          <Text>Click the button below to verify your email address: </Text>
          <Button href={verificationUrl} style={button}>
            Verify email
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

export default EmailVerification;
