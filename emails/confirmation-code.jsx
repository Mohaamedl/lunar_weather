import { Body, Container, Head, Html, Preview, Text } from '@react-email/components';

export const ConfirmationEmail = ({ code, name }) => (
  <Html>
    <Head />
    <Preview>Your Lunar Weather Report Confirmation Code</Preview>
    <Body style={{ backgroundColor: '#f6f9fc', padding: '20px' }}>
      <Container>
        <Text>Hello {name},</Text>
        <Text>Your confirmation code for Lunar Weather report is:</Text>
        <Text style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '20px',
          margin: '20px 0',
          backgroundColor: '#ffffff',
          borderRadius: '4px'
        }}>{code}</Text>
        <Text>This code will expire in 10 minutes.</Text>
      </Container>
    </Body>
  </Html>
);
