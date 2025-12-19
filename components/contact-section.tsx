"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react"
import { CalendarBooking } from "@/components/calendar-booking"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hamidtchemoko9@gmail.com",
      href: "mailto:hamidtchemoko9@gmail.com",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+33 6 30 30 40 95",
      href: "tel:+33630304095",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "59 rue Arnault Peyre, 34080 Montpellier",
      href: "https://maps.google.com/?q=59+rue+Arnault+Peyre+34080+Montpellier",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "hamid-tchemoko-a",
      href: "https://linkedin.com/in/hamid-tchemoko-a-509075227",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "ham-123",
      href: "https://github.com/ham-123",
    },
  ]

  return (
    <section id="contact" className="relative py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              Contact & Rendez-vous
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Envie de collaborer ou discuter d'un projet ? N'hésitez pas à me contacter ou à prendre rendez-vous !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Nom complet
                </label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                  Sujet
                </label>
                <Input
                  id="subject"
                  placeholder="Sujet du message"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Votre message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-background/50 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan to-purple hover:opacity-90 text-white"
                size="lg"
              >
                <Send className="mr-2 h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          </Card>

          {/* Contact Info & Calendar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan to-purple flex-shrink-0">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-medium text-foreground group-hover:text-cyan transition-colors break-words">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Calendar Booking */}
            <CalendarBooking />
          </div>
        </div>
      </div>
    </section>
  )
}
