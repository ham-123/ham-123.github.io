import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateGoogleMeetLink, formatMeetingDateTime, generateGoogleCalendarLink } from '@/lib/google-meet'

export async function POST(request: NextRequest) {
  try {
    // Instancier Resend uniquement lors de l'exécution de la requête
    // Utiliser la variable d'environnement ou la clé en dur comme fallback
    const apiKey = process.env.RESEND_API_KEY || 're_BQsshoab_27bEkkZGMuQSJj69zsYX58Db'

    if (!apiKey) {
      console.error('❌ RESEND_API_KEY manquante')
      return NextResponse.json(
        { success: false, error: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const body = await request.json()
    const { type, data } = body

    console.log('📧 Demande d\'envoi d\'email:', { type, email: data.email, name: data.name })

    if (type === 'contact') {
      // Envoi d'email pour le formulaire de contact - UNIQUEMENT À VOUS
      const result = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'hamidtchemoko9@gmail.com',
        replyTo: data.email,
        subject: `Nouveau message de ${data.name} - ${data.subject}`,
        html: `
          <h2>Nouveau message depuis votre portfolio</h2>
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Sujet:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Reçu le: ${new Date(data.timestamp).toLocaleString('fr-FR')}</small></p>
        `,
      })

      console.log('✅ Email de contact envoyé:', result)

    } else if (type === 'booking') {
      // Générer un lien Google Meet unique
      const meetLink = generateGoogleMeetLink()
      const meetingDateTime = formatMeetingDateTime(data.date, data.time)
      const calendarLink = generateGoogleCalendarLink(
        `Rendez-vous avec ${data.name}`,
        data.date,
        data.time,
        60,
        meetLink,
        `Rendez-vous avec ${data.name} (${data.email})`
      )

      console.log('🎥 Lien Google Meet généré:', meetLink)
      console.log('📧 Envoi notification de rendez-vous à vous-même')

      // Envoyer UNIQUEMENT À VOUS avec toutes les infos + lien Meet
      const adminEmail = await resend.emails.send({
        from: 'Notification Portfolio <onboarding@resend.dev>',
        to: 'hamidtchemoko9@gmail.com',
        replyTo: data.email,
        subject: `Nouveau rendez-vous - ${data.name} - ${meetingDateTime}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">🔔 Nouveau rendez-vous réservé</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">👤 Informations du client</h3>
              <p><strong>Nom:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">📅 Détails du rendez-vous</h3>
              <p><strong>Date et heure:</strong> ${meetingDateTime}</p>
              <p><strong>Durée:</strong> 1 heure</p>
            </div>
            
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">🎥 Lien Google Meet pour la réunion</h3>
              <p>Vous pouvez rejoindre la réunion avec ce lien :</p>
              <a href="${meetLink}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0;">
                Rejoindre la réunion Google Meet
              </a>
              <p style="font-size: 14px; color: #6b7280;">
                Lien à partager avec le client :<br>
                <code style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px;">${meetLink}</code>
              </p>
            </div>
            
            <div style="margin: 20px 0;">
              <a href="${calendarLink}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                📅 Ajouter à votre Google Calendar
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Actions recommandées :</strong><br>
              • Envoyez le lien Google Meet au client : <a href="mailto:${data.email}?subject=Confirmation%20rendez-vous&body=Bonjour%20${encodeURIComponent(data.name)},%0A%0AVoici%20le%20lien%20pour%20notre%20rendez-vous%20du%20${encodeURIComponent(meetingDateTime)}%20:%0A${encodeURIComponent(meetLink)}">${data.email}</a><br>
              • Ajoutez ce rendez-vous à votre calendrier<br>
              • Préparez les documents nécessaires
            </p>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              Demande reçue le: ${new Date(data.timestamp).toLocaleString('fr-FR')}
            </p>
          </div>
        `,
      })

      console.log('✅ Email de notification envoyé avec succès:', adminEmail)
      console.log('🎉 Processus terminé - Lien Meet:', meetLink)

      // Retourner le lien Meet dans la réponse pour l'afficher sur le site
      return NextResponse.json({
        success: true,
        message: 'Rendez-vous enregistré et notification envoyée',
        meetLink: meetLink
      })
    }

    return NextResponse.json({ success: true, message: 'Email envoyé avec succès' })
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi de l\'email', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
