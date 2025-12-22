import { v4 as uuidv4 } from 'uuid'

/**
 * Génère un lien Google Meet unique
 * Format: https://meet.google.com/xxx-xxxx-xxx
 */
export function generateGoogleMeetLink(): string {
  // Générer un identifiant unique au format Google Meet
  const uuid = uuidv4().replace(/-/g, '')

  // Format Google Meet: 3 caractères - 4 caractères - 3 caractères
  const part1 = uuid.substring(0, 3)
  const part2 = uuid.substring(3, 7)
  const part3 = uuid.substring(7, 10)

  return `https://meet.google.com/${part1}-${part2}-${part3}`
}

/**
 * Formate la date et l'heure pour l'affichage
 */
export function formatMeetingDateTime(date: string, time: string): string {
  const dateObj = new Date(`${date}T${time}:00`)
  return dateObj.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Génère un lien pour ajouter l'événement au Google Calendar
 */
export function generateGoogleCalendarLink(
  title: string,
  date: string,
  time: string,
  duration: number = 60, // durée en minutes
  meetLink: string,
  description?: string
): string {
  const startDateTime = new Date(`${date}T${time}:00`)
  const endDateTime = new Date(startDateTime.getTime() + duration * 60000)

  // Format: YYYYMMDDTHHmmss
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(startDateTime)}/${formatDate(endDateTime)}`,
    details: description || `Rendez-vous en ligne\n\nRejoindre la réunion : ${meetLink}`,
    location: meetLink,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

