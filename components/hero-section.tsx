"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Calendar, ChevronDown } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const { theme } = useTheme()
  const titles = ["Ingénieur Logiciel", "Développeur Full Stack", "Architecte Logiciel"]

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  useEffect(() => {
    const fullText = titles[currentTitleIndex]
    let index = 0
    setDisplayText("")

    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [currentTitleIndex])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-end justify-center pb-0">
          <img
            src={theme === "dark" ? "/profile-hoodie-black-bg.png" : "/profile-white-tshirt.jpg"}
            alt="Background"
            className="w-full h-full object-cover object-[center_10%] opacity-60 scale-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/10 to-background" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="bg-gradient-to-r from-cyan via-purple to-neon bg-clip-text text-transparent drop-shadow-2xl">
            TCHEMOKO A. HAMID
          </span>
        </h1>

        {/* Typing Effect Subtitle */}
        <div
          className={`h-12 md:h-16 mb-8 transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-mono">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <p
          className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Développeur Full-Stack passionné par l'architecture microservices et le clean code, je recherche un stage en
          alternance pour contribuer à des projets innovants. Avec une expertise en Laravel, Vue.js et Docker, je crée
          des solutions web modernes et performantes.
        </p>

        {/* Call-to-Action Badge */}
        <div
          className={`mb-10 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30 transition-all duration-1000 delay-700 hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-base md:text-lg font-semibold text-foreground">
            🎯 En recherche de stage alternance - Disponible dès maintenant
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
              Voir mes projets
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
            Prendre rendez-vous
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group border-purple/50 hover:bg-purple/10 hover:border-purple min-w-[200px] bg-transparent"
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            Télécharger CV
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
