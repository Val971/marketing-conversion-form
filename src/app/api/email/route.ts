import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import Notifications from '@/app/emails/Notifications';

const resend = new Resend(process.env.SEND_EMAIL_API);

export async function POST(request: Request) {
  const { formValues } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'Prospect From <onboarding@resend.dev>',
    to: 'vnovembre971@gmail.com',
    subject: 'New prospect form are completed',
    react: Notifications({ ...formValues }),
  });
  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ message: 'Email Successfully Sent!' });
}
