"use client"

import { Linkedin, Github, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const navLinks = [
    { id: "about", label: "À propos" },
    { id: "skills", label: "Compétences" },
    { id: "experience", label: "Expériences" },
    { id: "projects", label: "Projets" },
    { id: "contact", label: "Contact" },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/hamid-tchemoko-a-509075227",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/ham-123",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:hamidtchemoko9@gmail.com",
      label: "Email",
    },
  ]

  return (
    <footer className="relative py-12 px-4 border-t border-border/50 bg-muted/30">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent mb-4">
              HAMID TCHEMOKO
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Développeur Full-Stack passionné, spécialisé en Laravel, Vue.js et architecture microservices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4">Réseaux Sociaux</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/30 hover:scale-110 hover:border-purple/50 transition-all group"
                >
                  <social.icon className="h-5 w-5 text-foreground group-hover:text-cyan transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} TCHEMOKO A. HAMID. Tous droits réservés.</p>
            <p>
              Fait avec <span className="text-red-500">♥</span> en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
