"use client"

import { useEffect, useRef, useState } from "react"
import { User, Target, Heart, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    { icon: User, label: "Âge", value: "25 ans" },
    { icon: Target, label: "Objectif", value: "Stage alternance" },
    { icon: Heart, label: "Passion", value: "Architecture logicielle" },
    { icon: Globe, label: "Langues", value: "Français, Anglais" },
  ]

  const interests = ["Sport", "Lecture", "Voyage", "Musique", "Développement personnel"]

  return (
    <section id="about" className="relative py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">À propos de moi</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan transition-colors">Qui suis-je ?</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Développeur Full-Stack avec une solide expertise en Laravel et Vue.js, je suis passionné par la création
              de solutions web innovantes et performantes. Mon expérience en architecture microservices me permet de
              concevoir des systèmes évolutifs et maintenables.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Actuellement en recherche d'un stage en alternance (1 semaine école / 2 semaines entreprise), je souhaite
              mettre mes compétences au service d'une entreprise innovante et contribuer à des projets ambitieux.
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
          <h3 className="text-xl font-bold mb-4">Centres d'intérêt</h3>
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
