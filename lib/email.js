import { ConfirmationEmail } from '@/emails/confirmation-code';

// Mock email sending for development
export async function sendConfirmationEmail({ to, name, code }) {
  // In development, just simulate email sending
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: Email would be sent to', to);
    return { success: true };
  }

  try {
    // Only initialize Resend in production with API key
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Lunar Weather <noreply@lunarweather.com>',
      to,
      subject: 'Your Lunar Weather Report Confirmation Code',
      react: ConfirmationEmail({ code, name }),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: process.env.NODE_ENV === 'development' 
        ? 'Email sending simulated in development'
        : error.message 
    };
  }
}
