"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Calendar, ChevronDown } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { useLanguage } from "@/hooks/use-language"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const { theme } = useTheme()
  const { t, language } = useLanguage()

  // Assurer que `titles` est toujours un tableau de chaînes
  const rawTitles = t("hero.roles")
  const titles = Array.isArray(rawTitles)
    ? (rawTitles as string[])
    : typeof rawTitles === "string"
    ? [rawTitles]
    : []

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  useEffect(() => {
    // Changer de titre toutes les 3 secondes
    if (titles.length === 0) return
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [titles.length])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Fonction pour déclencher le téléchargement du CV placé dans `public/Fichier`
  const downloadCV = async () => {
    const publicPath = '/Fichier/TCHEMOKO A Hamid CV.pdf'
    const encodedPath = encodeURI(publicPath)

    try {
      const res = await fetch(encodedPath)
      if (!res.ok) {
        // Fallback: ouvrir le fichier directement si fetch échoue
        window.open(encodedPath, '_blank', 'noopener')
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'TCHEMOKO A Hamid CV.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      // En cas d'erreur (ex: bloqueur), ouvrir le PDF dans un nouvel onglet
      window.open(encodedPath, '_blank', 'noopener')
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-end justify-center pb-0">
          <img
            src={theme === "dark" ? "/profile-hoodie-black-bg.png" : "/profile-white-tshirt.png"}
            alt="Background"
            className="w-full h-full object-cover object-[center_10%] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/10 to-background" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="bg-gradient-to-r from-cyan via-purple to-neon bg-clip-text text-transparent drop-shadow-2xl inline-block animate-zoom-name">
            {t("hero.title")}
          </span>
        </h1>

        {/* Animated Subtitle - Affiche le titre complet qui tourne */}
        <div
          className={`min-h-[3rem] md:min-h-[4rem] mb-8 transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <p
            key={currentTitleIndex}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-semibold px-4 animate-fade-in"
          >
            {titles.length > 0 ? titles[currentTitleIndex] : ""}
          </p>
        </div>

        <p
          className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {t("hero.description")}
        </p>

        {/* Call-to-Action Badge */}
        <div
          className={`mb-10 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30 transition-all duration-1000 delay-700 hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-base md:text-lg font-semibold text-foreground">
            {language === "fr"
              ? "🎯 En recherche de stage alternance - Disponible dès maintenant"
              : "🎯 Looking for apprenticeship - Available now"}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-900 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-cyan to-purple hover:opacity-90 transition-all text-white min-w-[200px]"
            onClick={() => scrollToSection("projects")}
          >
            <span className="relative z-10 flex items-center gap-2">
              {language === "fr" ? "Voir mes projets" : "View my projects"}
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group border-cyan/50 hover:bg-cyan/10 hover:border-cyan min-w-[200px] bg-transparent"
            onClick={() => scrollToSection("contact")}
          >
            <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            {t("hero.bookCall")}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group border-purple/50 hover:bg-purple/10 hover:border-purple min-w-[200px] bg-transparent"
            onClick={downloadCV}
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            {t("hero.downloadCV")}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className={`animate-bounce inline-block transition-all duration-1000 delay-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          aria-label="Scroll to about section"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      </div>
    </section>
  )
}
