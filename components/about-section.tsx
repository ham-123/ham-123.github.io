"use client"

import { useEffect, useRef, useState } from "react"
import { User, Target, Heart, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const highlights = [
    { icon: User, label: language === "fr" ? "Âge" : "Age", value: language === "fr" ? "25 ans" : "25 years" },
    { icon: Target, label: language === "fr" ? "Objectif" : "Goal", value: language === "fr" ? "Stage alternance" : "Apprenticeship" },
    { icon: Heart, label: language === "fr" ? "Passion" : "Passion", value: language === "fr" ? "Architecture logicielle" : "Software Architecture" },
    { icon: Globe, label: language === "fr" ? "Langues" : "Languages", value: language === "fr" ? "Français, Anglais" : "French, English" },
  ]

  const interests = language === "fr"
    ? ["Sport", "Lecture", "Voyage", "Musique", "Développement personnel"]
    : ["Sports", "Reading", "Travel", "Music", "Personal Development"]

  return (
    <section id="about" className="relative py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">{t("about.title")}</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan transition-colors">
              {language === "fr" ? "Qui suis-je ?" : "Who am I?"}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {language === "fr"
                ? "Développeur Full-Stack avec une solide expertise en Laravel et Vue.js, je suis passionné par la création de solutions web innovantes et performantes. Mon expérience en architecture microservices me permet de concevoir des systèmes évolutifs et maintenables."
                : "Full-Stack Developer with solid expertise in Laravel and Vue.js, I am passionate about creating innovative and high-performance web solutions. My experience in microservices architecture allows me to design scalable and maintainable systems."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "fr"
                ? "Actuellement en recherche d'un stage en alternance (1 semaine école / 2 semaines entreprise), je souhaite mettre mes compétences au service d'une entreprise innovante et contribuer à des projets ambitieux."
                : "Currently looking for an apprenticeship (1 week school / 2 weeks company), I want to put my skills at the service of an innovative company and contribute to ambitious projects."}
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple/50 transition-all duration-300 hover:scale-105 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon className="h-8 w-8 text-purple mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-foreground">{item.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Interests */}
        <Card
          className={`p-8 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-xl font-bold mb-4">
            {language === "fr" ? "Centres d'intérêt" : "Interests"}
          </h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30 text-sm font-medium hover:scale-105 transition-transform cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
