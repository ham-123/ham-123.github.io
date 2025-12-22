"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Lock, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/hooks/use-language"

// Fonction de hachage SHA-256
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function ProjectsSection() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [isPersonalUnlocked, setIsPersonalUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  // Hash du mot de passe (le mot de passe réel n'est pas dans le code)
  const PASSWORD_HASH = "1d47b2de25a557aee9f52c9db17160a35590788a70c3984bf3d58ca6c201ddd6"

  const handleUnlock = async () => {
    const inputHash = await hashPassword(password)
    if (inputHash === PASSWORD_HASH) {
      setIsPersonalUnlocked(true)
      setError("")
      setPassword("")
    } else {
      setError(t("projects.protected.wrongPassword"))
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock()
    }
  }

  const projects = [
    {
      title: "Hôtel Les Orchidées",
      description:
        "Site web professionnel pour l'Hôtel Les Orchidées, avec présentation des chambres, système de réservation en ligne, galerie photos et informations touristiques. Design élégant et responsive.",
      image: "/hotel-luxury-website.png",
      tags: ["WordPress", "PHP", "JavaScript", "Booking System"],
      category: "professional",
      demo: "https://www.hotellesorchidees.com/",
      github: undefined,
    },
    {
      title: "Prunnel",
      description:
        "Architecture microservices complète avec Laravel, Node.js, Vue.js, intégrant Consul pour la découverte de services, Jaeger pour le tracing distribué et PostgreSQL.",
      image: "/microservices-architecture-dashboard.png",
      tags: ["Laravel", "Node.js", "Vue.js", "Microservices", "PostgreSQL", "Docker"],
      category: "professional",
      demo: "#",
      github: undefined,
    },
    {
      title: "FlashCar- Parc",
      description:
        "Application de gestion de parc automobile avec Laravel et Vue.js. Interface moderne avec Tailwind CSS et API REST pour la gestion complète des véhicules.",
      image: "/car-fleet-dashboard.png",
      tags: ["Laravel", "Vue.js", "Tailwind CSS", "PostgreSQL"],
      category: "professional",
      demo: "https://flashcar.app/",
      github: undefined,
    },
    {
      title: "Site Cabinet d'Avocat",
      description:
        "Site WordPress professionnel pour cabinet d'avocat avec design moderne, gestion de contenu optimisée et formulaires de contact sécurisés.",
      image: "/law-firm-website-professional.png",
      tags: ["WordPress", "PHP", "JavaScript", "CSS"],
      category: "professional",
      demo: "#",
      github: undefined,
    },
    {
      title: "Site Waouh Monde",
      description:
        "Site web institutionnel développé avec Laravel et Vue.js, intégrant une API REST pour la gestion dynamique du contenu.",
      video: "/waouh-monde.mp4", // Vidéo au lieu d'image
      image: "/modern-business-website.png", // Image de fallback
      tags: ["Laravel", "Vue.js", "API REST"],
      category: "professional",
      demo: "https://waouhmonde.com/",
      github: undefined,
    },
  ]

  const personalProjects = [
    {
      title: "Goyave API",
      description:
        "API TypeScript privée pour la gestion et le traitement de données. Architecture moderne avec tests automatisés et documentation complète.",
      tags: ["TypeScript", "API", "Node.js"],
      visibility: "Private",
      lastUpdate: "Il y a 5 jours",
      github: "https://github.com/ham-123/goyave-api",
    },
    {
      title: "Forex Trading Bot",
      description:
        "Bot de trading automatisé pour le marché Forex avec analyse technique multi-indicateurs (RSI, MACD, MA, Bollinger, ADX). Intègre des notifications Telegram en temps réel, gestion du risque et Expert Advisor MT5 pour le trading automatique avec historique de données de 3+ ans.",
      tags: ["Python", "Forex", "MT5", "MQL5", "Telegram API", "SQLite", "Trading"],
      visibility: "Public",
      lastUpdate: "Il y a 2 mois",
      github: "https://github.com/ham-123/forex_trading_bot",
    },
    {
      title: "Trading V10 HMD STG",
      description:
        "Bot de trading automatisé développé en Python utilisant des packages d'analyse technique avancés (pandas, numpy, TA-Lib). Intègre un modèle de Machine Learning entraîné sur des données historiques de trading et des comportements passés du marché pour optimiser les stratégies d'exécution d'ordres.",
      tags: ["Python", "Trading", "Machine Learning", "pandas", "TA-Lib", "AI"],
      visibility: "Public",
      lastUpdate: "Il y a 1 mois",
      github: "https://github.com/ham-123/trading_v10_hmd_stg",
    },
    {
      title: "Trading V75 Bot",
      description:
        "Bot de trading spécialisé pour l'indice de volatilité V75 utilisant des bibliothèques d'analyse (scikit-learn, pandas). Implémente un modèle prédictif entraîné avec des données historiques de patterns et comportements du marché pour la gestion automatique des risques et la détection d'opportunités.",
      tags: ["Python", "Trading Bot", "V75", "ML", "scikit-learn", "Algorithm"],
      visibility: "Public",
      lastUpdate: "Il y a 1 mois",
      github: "https://github.com/ham-123/Trading_v75_bot",
    },
  ]

  const filters = [
    { id: "all", label: t("projects.filters.all") },
    { id: "professional", label: t("projects.filters.professional") },
    { id: "personal", label: t("projects.filters.personal") },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              {t("projects.title")}
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? "default" : "outline"}
              onClick={() => setFilter(f.id)}
              className={
                filter === f.id
                  ? "bg-gradient-to-r from-cyan to-purple hover:opacity-90 text-white"
                  : "border-cyan/50 hover:bg-cyan/10"
              }
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Professional Projects */}
        {(filter === "all" || filter === "professional") && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">{t("projects.professionalTitle")}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    {project.video ? (
                      <video
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loop
                        muted
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause()
                          e.currentTarget.currentTime = 0
                        }}
                      >
                        <source src={project.video} type="video/mp4" />
                        Votre navigateur ne supporte pas les vidéos.
                      </video>
                    ) : (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <Github className="h-5 w-5" />
                          </Button>
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <ExternalLink className="h-5 w-5" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Personal Projects - Protected */}
        {(filter === "all" || filter === "personal") && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">{t("projects.personalTitle")}</h3>

            {!isPersonalUnlocked ? (
              <Card className="max-w-md mx-auto bg-card/50 backdrop-blur-sm border-border/50">
                <div className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-full bg-gradient-to-r from-purple/20 to-pink-500/20 border border-purple/30">
                      <Lock className="h-8 w-8 text-purple" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{t("projects.protected.title")}</h4>
                  <p className="text-muted-foreground mb-6">
                    {t("projects.protected.description")}
                  </p>

                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("projects.protected.placeholder")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10 border-purple/30 focus:border-purple"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 animate-pulse">{error}</p>
                    )}

                    <Button
                      onClick={handleUnlock}
                      className="w-full bg-gradient-to-r from-purple to-pink-500 hover:opacity-90"
                    >
                      {t("projects.protected.unlock")}
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {personalProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple/10"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Github className="h-8 w-8 text-cyan" />
                        {project.visibility === "Private" ? (
                          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted border border-border">
                            <Lock className="h-3 w-3" />
                            {t("projects.visibility.private")}
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-neon/20 border border-neon/50 text-neon">
                            {t("projects.visibility.public")}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-purple transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple/20 to-pink-500/20 border border-purple/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{t("projects.updatedAgo")} {project.lastUpdate}</span>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan hover:underline"
                        >
                          {t("projects.viewOnGithub")}
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
