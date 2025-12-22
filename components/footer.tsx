"use client"

import { Linkedin, Github, Mail } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, language } = useLanguage()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const navLinks = [
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
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
              {language === "fr"
                ? "Développeur Full-Stack passionné, spécialisé en Laravel, Vue.js et architecture microservices."
                : "Passionate Full-Stack Developer, specialized in Laravel, Vue.js and microservices architecture."}
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
            <h4 className="font-bold mb-4">
              {language === "fr" ? "Réseaux Sociaux" : "Social Networks"}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30 hover:scale-110 hover:border-cyan/50 transition-all"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} TCHEMOKO A. HAMID. {t("footer.rights")}
          </p>
          <p className="mt-2">
            {t("footer.madeWith")} ❤️ {t("footer.by")} HAMID
          </p>
        </div>
      </div>
    </footer>
  )
}
