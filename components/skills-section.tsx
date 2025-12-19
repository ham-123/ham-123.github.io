"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Code2, Palette, Server, Box } from "lucide-react"

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animateSkills, setAnimateSkills] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateSkills(true), 300)
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

  const skillCategories = [
    {
      title: "Backend",
      icon: Server,
      color: "from-cyan to-blue-500",
      skills: [
        { name: "PHP & Laravel", level: 90 },
        { name: "PostgreSQL & MySQL", level: 85 },
        { name: "Architecture MVC", level: 88 },
        { name: "API REST", level: 92 },
      ],
    },
    {
      title: "Frontend",
      icon: Code2,
      color: "from-purple to-pink-500",
      skills: [
        { name: "Vue.js", level: 88 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5 & CSS3", level: 90 },
        { name: "Tailwind CSS", level: 87 },
      ],
    },
    {
      title: "DevOps",
      icon: Box,
      color: "from-neon to-green-500",
      skills: [
        { name: "Docker", level: 82 },
        { name: "Git & GitLab", level: 88 },
        { name: "NATS & Consul", level: 75 },
        { name: "Microservices", level: 80 },
      ],
    },
    {
      title: "Design & Outils",
      icon: Palette,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Canva", level: 78 },
        { name: "Microsoft Office", level: 85 },
        { name: "Redmine", level: 80 },
        { name: "Swagger", level: 82 },
      ],
    },
  ]

  const softSkills = [
    "Coopération",
    "Rigueur",
    "Organisation",
    "Autonomie",
    "Communication",
    "Travail en équipe",
    "Gestion de projets",
  ]

  return (
    <section id="skills" className="relative py-20 px-4 bg-muted/30" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">Compétences</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
        </div>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-700 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-cyan transition-colors">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: animateSkills ? `${skill.level}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Soft Skills */}
        <Card
          className={`p-8 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, index) => (
              <span
                key={index}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30 font-medium hover:scale-105 hover:border-purple/50 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
