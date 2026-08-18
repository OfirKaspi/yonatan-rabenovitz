import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, eventType, eventDate, notes } = body;

    if (!name || !phone || !eventType) {
      return NextResponse.json(
        { error: 'שדות חובה חסרים (שם, טלפון, סוג אירוע)' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    // TODO: set BOOKING_EMAIL to Yonatan's real booking address before launch.
    const bookingEmail = process.env.BOOKING_EMAIL || 'hello@example.com';

    if (!resendApiKey) {
      console.log('--- [Simulated Email Log - No RESEND_API_KEY found] ---');
      console.log(`Lead Received: Name=${name}, Phone=${phone}, Type=${eventType}, Date=${eventDate || 'N/A'}, Notes=${notes || 'N/A'}`);
      console.log(`Recipient: ${bookingEmail}`);
      console.log('------------------------------------------------------');
      
      return NextResponse.json({
        success: true,
        message: 'הפנייה התקבלה בהצלחה (מצב סימולציה)',
        simulated: true,
      });
    }

    const resend = new Resend(resendApiKey);

    const data = await resend.emails.send({
      from: 'Yonatan Website <onboarding@resend.dev>',
      to: [bookingEmail],
      subject: `🪄 ליד חדש מהאתר: ${name} (${eventType})`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #090a0f; color: #f8fafc; border-radius: 8px;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #2a2e3d; padding-bottom: 10px;">
            🪄 פנייה חדשה מאתר יונתן רבינוביץ'
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d; font-weight: bold; color: #d4af37;">שם מלא:</td>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d; font-weight: bold; color: #d4af37;">טלפון:</td>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d;"><a href="tel:${phone}" style="color: #f3e5ab;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d; font-weight: bold; color: #d4af37;">סוג אירוע:</td>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d;">${eventType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d; font-weight: bold; color: #d4af37;">תאריך משוער:</td>
              <td style="padding: 10px; border-bottom: 1px solid #2a2e3d;">${eventDate || 'לא צוין'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #d4af37;">הערות:</td>
              <td style="padding: 10px;">${notes || 'אין הערות נוספות'}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Resend email error:', error);
    const message = error instanceof Error ? error.message : 'שגיאה בשליחת הטופס';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
