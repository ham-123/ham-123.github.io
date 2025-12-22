"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Github, Send, Calendar, Clock, CheckCircle, AlertCircle, Video } from "lucide-react"
import { format, addDays, isSameDay, getDay } from "date-fns"
import { fr } from "date-fns/locale"
import { useLanguage } from "@/hooks/use-language"

// Types pour les créneaux réservés
type BookedSlot = {
    id: string
    date: string
    time: string
    name: string
    email: string
    timestamp: string
    meetLink?: string
}

type StatusType = 'loading' | 'success' | 'error' | null

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [submitStatus, setSubmitStatus] = useState<StatusType>(null)
    const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState("")
    const [bookingName, setBookingName] = useState("")
    const [bookingEmail, setBookingEmail] = useState("")
    const [bookingStatus, setBookingStatus] = useState<StatusType>(null)
    const [meetLink, setMeetLink] = useState<string>("")
    const { t, language } = useLanguage()

    // Charger les rendez-vous réservés au démarrage
    useEffect(() => {
        loadBookedSlots()
    }, [])

    const loadBookedSlots = async () => {
        try {
            // Charger depuis localStorage
            const stored = localStorage.getItem('bookedSlots')
            if (stored) {
                setBookedSlots(JSON.parse(stored))
            }
        } catch (error) {
            console.log("Aucun rendez-vous trouvé")
            setBookedSlots([])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitStatus("loading")

        try {
            const messageData = {
                ...formData,
                timestamp: new Date().toISOString(),
            }

            // Envoyer l'email via l'API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'contact',
                    data: messageData
                }),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi')
            }

            setSubmitStatus("success")
            setFormData({ name: "", email: "", subject: "", message: "" })

            setTimeout(() => setSubmitStatus(null), 3000)
        } catch (error) {
            console.error("Erreur lors de l'envoi:", error)
            setSubmitStatus("error")
            setTimeout(() => setSubmitStatus(null), 3000)
        }
    }

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        setBookingStatus("loading")
        setMeetLink("")

        if (!selectedDate || !selectedTime) {
            setBookingStatus("error")
            setTimeout(() => setBookingStatus(null), 3000)
            return
        }

        try {
            const dateString = format(selectedDate, 'yyyy-MM-dd')
            const bookingId = `booking:${dateString}_${selectedTime}`
            const bookingData = {
                id: bookingId,
                date: dateString,
                time: selectedTime,
                name: bookingName,
                email: bookingEmail,
                timestamp: new Date().toISOString()
            }

            // Envoyer l'email via l'API et récupérer le lien Meet
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'booking',
                    data: bookingData
                }),
            })

            const result = await response.json()

            if (response.ok && result.meetLink) {
                // Sauvegarder avec le lien Meet
                const bookingWithMeet = { ...bookingData, meetLink: result.meetLink }
                const updatedSlots = [...bookedSlots, bookingWithMeet]
                setBookedSlots(updatedSlots)
                localStorage.setItem('bookedSlots', JSON.stringify(updatedSlots))

                // Stocker le lien Meet pour l'afficher
                setMeetLink(result.meetLink)
            }

            setBookingStatus("success")
            setSelectedDate(null)
            setSelectedTime("")
            setBookingName("")
            setBookingEmail("")

            setTimeout(() => {
                setBookingStatus(null)
                setMeetLink("")
            }, 10000) // Afficher pendant 10 secondes
        } catch (error) {
            console.error("Erreur lors de la réservation:", error)
            setBookingStatus("error")
            setTimeout(() => setBookingStatus(null), 3000)
        }
    }

    const isSlotBooked = (date: Date, time: string) => {
        const dateString = format(date, 'yyyy-MM-dd')
        return bookedSlots.some(slot => slot.date === dateString && slot.time === time)
    }

    // Générer les 21 prochains jours (3 semaines)
    const getAvailableDates = () => {
        const dates: Date[] = []
        const today = new Date()
        let addedDays = 0
        let dayCounter = 1

        while (addedDays < 21 && dayCounter < 30) {
            const date = addDays(today, dayCounter)
            const dayOfWeek = getDay(date)

            // Exclure dimanche (0)
            if (dayOfWeek !== 0) {
                dates.push(date)
                addedDays++
            }
            dayCounter++
        }
        return dates
    }

    // Créneaux horaires de 8h à 19h
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00"
    ]

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "hamidtchemoko9@gmail.com",
            href: "mailto:hamidtchemoko9@gmail.com",
        },
        {
            icon: Phone,
            label: language === "fr" ? "Téléphone" : "Phone",
            value: "+33 6 30 30 40 95",
            href: "tel:+33630304095",
        },
        {
            icon: MapPin,
            label: language === "fr" ? "Adresse" : "Address",
            value: "59 rue Arnault Peyre, 34080 Montpellier",
            href: "https://maps.google.com/?q=59+rue+Arnault+Peyre+34080+Montpellier",
        },
        {
            icon: Linkedin,
            label: "GitHub",
            value: "hamid-tchemoko-a",
            href: "https://linkedin.com/in/hamid-tchemoko-a-509075227",
        },
        {
            icon: Github,
            label: "LinkedIn",
            value: "ham-123",
            href: "https://github.com/ham-123",
        },
    ]

    return (
        <section id="contact" className="relative py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {t("contact.title")}
            </span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
                    <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
                        {t("contact.subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card className="p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm border-slate-700">
                        <h3 className="text-2xl font-bold mb-6 text-white">
                            {language === "fr" ? "Envoyez-moi un message" : "Send me a message"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium mb-2 block text-slate-300">
                                    {t("contact.name")}
                                </label>
                                <Input
                                    id="name"
                                    placeholder={t("contact.namePlaceholder")}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="bg-slate-900/50 border-slate-700 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium mb-2 block text-slate-300">
                                    {t("contact.email")}
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t("contact.emailPlaceholder")}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="bg-slate-900/50 border-slate-700 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="text-sm font-medium mb-2 block text-slate-300">
                                    {t("contact.subject")}
                                </label>
                                <Input
                                    id="subject"
                                    placeholder={t("contact.subjectPlaceholder")}
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    className="bg-slate-900/50 border-slate-700 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="text-sm font-medium mb-2 block text-slate-300">
                                    {t("contact.message")}
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder={t("contact.messagePlaceholder")}
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    className="bg-slate-900/50 border-slate-700 text-white resize-none"
                                />
                            </div>

                            {submitStatus === "success" && (
                                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                                    <CheckCircle className="h-5 w-5" />
                                    <span>{language === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!"}</span>
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>{language === "fr" ? "Erreur lors de l'envoi" : "Error sending message"}</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white"
                                size="lg"
                                disabled={submitStatus === "loading"}
                            >
                                <Send className="mr-2 h-4 w-4" />
                                {submitStatus === "loading" ? t("contact.sending") : t("contact.send")}
                            </Button>
                        </form>
                    </Card>

                    {/* Contact Info & Calendar */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <Card className="p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm border-slate-700">
                            <h3 className="text-2xl font-bold mb-6 text-white">
                                {language === "fr" ? "Informations de contact" : "Contact Information"}
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
                                    >
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex-shrink-0">
                                            <item.icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                                            <p className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors break-words">
                                                {item.value}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </Card>

                        {/* Calendar Booking */}
                        <Card className="p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm border-slate-700">
                            <div className="flex items-center gap-2 mb-6">
                                <Calendar className="h-6 w-6 text-cyan-400" />
                                <h3 className="text-2xl font-bold text-white">
                                    {language === "fr" ? "Réserver un rendez-vous" : "Book an appointment"}
                                </h3>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block text-slate-300">
                                        {language === "fr" ? "Votre nom" : "Your name"}
                                    </label>
                                    <Input
                                        placeholder={t("contact.namePlaceholder")}
                                        value={bookingName}
                                        onChange={(e) => setBookingName(e.target.value)}
                                        required
                                        className="bg-slate-900/50 border-slate-700 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block text-slate-300">
                                        {language === "fr" ? "Votre email" : "Your email"}
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder={t("contact.emailPlaceholder")}
                                        value={bookingEmail}
                                        onChange={(e) => setBookingEmail(e.target.value)}
                                        required
                                        className="bg-slate-900/50 border-slate-700 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-3 block text-slate-300">
                                        {language === "fr" ? "Choisir une date (Lundi - Samedi)" : "📅 Choose a date (Monday - Saturday)"}
                                    </label>

                                    {/* Calendrier visuel */}
                                    <div className="grid grid-cols-7 gap-2 mb-4">
                                        {/* Entêtes des jours */}


                                        {/* Dates disponibles */}
                                        {getAvailableDates().slice(0, 18).map((date) => {
                                            const isSelected = selectedDate && isSameDay(date, selectedDate)
                                            const dayOfMonth = format(date, 'd')
                                            const monthShort = format(date, 'MMM', { locale: fr })

                                            return (
                                                <button
                                                    key={date.toString()}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDate(date)
                                                        setSelectedTime("") // Réinitialiser l'heure
                                                    }}
                                                    className={`
                                                        aspect-square p-2 rounded-lg text-sm font-medium transition-all
                                                        flex flex-col items-center justify-center
                                                        ${isSelected
                                                            ? "bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg scale-105"
                                                            : "bg-slate-900/50 text-slate-300 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500"
                                                        }
                                                    `}
                                                >
                                                    <span className="text-lg font-bold">{dayOfMonth}</span>
                                                    <span className="text-[10px] opacity-70">{monthShort}</span>
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {selectedDate && (
                                        <div className="text-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                                            <p className="text-sm text-cyan-400 font-medium">
                                                ✓ {format(selectedDate, 'EEEE dd MMMM yyyy', { locale: fr })}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block text-slate-300">
                                        {language === "fr" ? "Choisir un horaire" : "Choose a time"}
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {timeSlots.map(time => {
                                            const booked = selectedDate ? isSlotBooked(selectedDate, time) : false
                                            return (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => !booked && setSelectedTime(time)}
                                                    disabled={booked || !selectedDate}
                                                    className={`p-2 rounded-lg text-sm font-medium transition-all ${
                                                        booked
                                                            ? "bg-slate-700/30 text-slate-500 cursor-not-allowed line-through"
                                                            : selectedTime === time
                                                                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                                                                : "bg-slate-900/50 text-slate-300 hover:bg-slate-700 border border-slate-700"
                                                    }`}
                                                >
                                                    <Clock className="h-3 w-3 inline mr-1" />
                                                    {time}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {bookingStatus === "success" && (
                                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>{language === "fr" ? "Rendez-vous réservé !" : "Appointment booked!"}</span>
                                    </div>
                                )}

                                {bookingStatus === "error" && (
                                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                                        <AlertCircle className="h-5 w-5" />
                                        <span>{language === "fr" ? "Erreur lors de la réservation" : "Booking error"}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white"
                                    disabled={!selectedDate || !selectedTime || bookingStatus === "loading"}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {bookingStatus === "loading"
                                        ? (language === "fr" ? "Réservation..." : "Booking...")
                                        : (language === "fr" ? "Confirmer le rendez-vous" : "Confirm appointment")}
                                </Button>

                                {meetLink && (
                                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                                                <Video className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-white mb-1">
                                                    {language === "fr" ? "🎉 Lien Google Meet généré !" : "🎉 Google Meet link generated!"}
                                                </p>
                                                <p className="text-xs text-slate-400 mb-2">
                                                    {language === "fr"
                                                        ? "Un email avec ce lien a été envoyé à votre adresse"
                                                        : "An email with this link has been sent to your address"}
                                                </p>
                                                <a
                                                    href={meetLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <Video className="h-4 w-4" />
                                                    {language === "fr" ? "Rejoindre la réunion" : "Join meeting"}
                                                </a>
                                                <p className="text-xs text-slate-500 mt-2 break-all">
                                                    {meetLink}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
