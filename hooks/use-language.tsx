"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  // t peut maintenant retourner des string ou des objets (tableaux) selon la clé
  t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    // Charger la langue depuis localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = lang
  }

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k]
      } else {
        // Si la structure n'existe pas, retourner la clé pour faciliter le debug
        return key
      }
    }

    // Retourner la valeur récupérée (string, array ou objet). Si indéfini, retourner la clé.
    return typeof value === "undefined" ? key : value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Traductions
const translations = {
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      experience: "Expériences",
      education: "Formation",
      projects: "Projets",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      title: "TCHEMOKO A. HAMID",
      roles: ["Ingénieur Logiciel", "Développeur Full Stack", "Architecte Logiciel"],
      description: "Passionné par le développement d'applications web modernes et scalables. Spécialisé en Laravel, Vue.js et architecture microservices.",
      downloadCV: "Télécharger CV",
      bookCall: "Réserver un appel",
      scrollDown: "Défiler vers le bas",
    },
    about: {
      title: "À propos de moi",
      subtitle: "Découvrez mon parcours et mes motivations",
      intro: "Bonjour ! Je suis",
      description: "développeur Full-Stack passionné par la création d'applications web performantes et élégantes. Actuellement en Master Ingénierie Logicielle à EFREI Paris, je recherche une alternance pour mettre en pratique mes compétences en développement Laravel/Vue.js et architecture microservices.",
      whatIDo: "Ce que je fais",
      development: "Développement Full-Stack",
      developmentDesc: "Création d'applications web complètes avec Laravel, Vue.js et les dernières technologies.",
      architecture: "Architecture Logicielle",
      architectureDesc: "Conception de systèmes scalables et maintenables avec une approche microservices.",
      devops: "DevOps & CI/CD",
      devopsDesc: "Automatisation des déploiements avec Docker, Kubernetes et pipelines CI/CD.",
      stats: {
        experience: "Ans d'expérience",
        projects: "Projets réalisés",
        technologies: "Technologies maîtrisées",
      },
    },
    skills: {
      title: "Compétences Techniques",
      subtitle: "Les technologies que je maîtrise",
      backend: "Backend",
      frontend: "Frontend",
      devops: "DevOps & Outils",
      databases: "Bases de données",
    },
    experience: {
      title: "Expériences Professionnelles",
      subtitle: "Mon parcours professionnel",
      present: "Présent",
      items: [
        {
          title: "Développeur Web Full-Stack",
          company: "WAOUH MONDE",
          location: "Télétravail",
          period: "Sept 2024 - Sept 2025",
          projects: [
            {
              name: "Site WordPress cabinet d'avocat",
              description: "Conception et développement complet en autonomie\nWordPress + personnalisation thème",
            },
            {
              name: "Site Waouh Monde (Lead Développeur)",
              description: "Direction technique du projet\nDéveloppement : Laravel + Vue.js + API REST",
            },
            {
              name: "FlashCar - Application de gestion de parc automobile (Chef de projet & Développeur)",
              description: "Pilotage du projet et coordination de l'équipe\nStack technique : Laravel + Vue.js + Tailwind CSS + API REST + PostgreSQL",
            },
            {
              name: "Prunnel - Architecture Microservices (Lead Développeur)",
              description: "Direction technique de l'architecture microservices\nTechnologies : Laravel + Node.js + Vue.js + API REST + Consul + Jaeger + Swagger + PostgreSQL",
            },
          ],
          tags: ["Laravel", "Vue.js", "Node.js", "PostgreSQL", "Docker", "Microservices"],
        },
        {
          title: "Programmeur Analyste (Stage)",
          company: "CABRO GROUP",
          location: "Cotonou, Bénin",
          period: "Mar - Mai 2023",
          projects: [
            { name: "Analyse des besoins clients", description: "Recueil et analyse des besoins en profondeur" },
            { name: "Développement de solutions sur mesure", description: "Applications web adaptées à des besoins spécifiques" },
            { name: "Rédaction de spécifications", description: "Documentation technique complète" },
          ],
          tags: ["Analyse", "PHP", "MySQL", "Spécifications"],
        },
      ],
    },
    education: {
      title: "Formation",
      subtitle: "Mon parcours académique",
      present: "Présent",
    },
    projects: {
      title: "Projets Réalisés",
      subtitle: "Découvrez mes réalisations",
      viewProject: "Voir le projet",
      viewCode: "Voir le code",
      filters: {
        all: "Tous",
        professional: "Professionnels",
        personal: "Personnels",
      },
      professionalTitle: "Projets Professionnels",
      personalTitle: "Projets Personnels",
      protected: {
        title: "Projets Personnels Protégés",
        description: "Ces projets contiennent du code propriétaire. Entrez le mot de passe pour y accéder.",
        placeholder: "Mot de passe",
        unlock: "Déverrouiller",
        wrongPassword: "Mot de passe incorrect",
      },
      visibility: {
        private: "Privé",
        public: "Public",
      },
      updatedAgo: "Mis à jour",
      viewOnGithub: "Voir sur GitHub",
    },
    blog: {
      title: "Blog & Articles",
      subtitle: "Mes dernières publications",
      readMore: "Lire plus",
      comingSoon: "Prochainement",
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Discutons de votre projet",
      name: "Nom complet",
      namePlaceholder: "Jean Dupont",
      email: "Email",
      emailPlaceholder: "jean@exemple.com",
      subject: "Sujet",
      subjectPlaceholder: "Sujet de votre message",
      message: "Message",
      messagePlaceholder: "Votre message...",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      orBookCall: "Ou réservez un appel",
      bookCall: "Réserver un appel Google Meet",
    },
    footer: {
      rights: "Tous droits réservés.",
      madeWith: "Fait avec",
      by: "par",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      title: "TCHEMOKO A. HAMID",
      // Ajout des roles en anglais pour éviter les valeurs manquantes
      roles: ["Software Engineer", "Full Stack Developer", "Software Architect"],
      description: "Passionate about building modern and scalable web applications. Specialized in Laravel, Vue.js and microservices architecture.",
      downloadCV: "Download CV",
      bookCall: "Book a Call",
      scrollDown: "Scroll Down",
    },
    about: {
      title: "About Me",
      subtitle: "Discover my journey and motivations",
      intro: "Hello! I'm",
      description: "a Full-Stack developer passionate about creating high-performance and elegant web applications. Currently pursuing a Master's in Software Engineering at EFREI Paris, I'm looking for an apprenticeship to apply my skills in Laravel/Vue.js development and microservices architecture.",
      whatIDo: "What I Do",
      development: "Full-Stack Development",
      developmentDesc: "Building complete web applications with Laravel, Vue.js and the latest technologies.",
      architecture: "Software Architecture",
      architectureDesc: "Designing scalable and maintainable systems with a microservices approach.",
      devops: "DevOps & CI/CD",
      devopsDesc: "Automating deployments with Docker, Kubernetes and CI/CD pipelines.",
      stats: {
        experience: "Years of experience",
        projects: "Projects completed",
        technologies: "Technologies mastered",
      },
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Technologies I master",
      backend: "Backend",
      frontend: "Frontend",
      devops: "DevOps & Tools",
      databases: "Databases",
    },
    experience: {
      title: "Professional Experience",
      items: [
        {
          title: "Full-Stack Web Developer",
          company: "WAOUH MONDE",
          location: "Remote",
          period: "Sept 2024 - Sept 2025",
          projects: [
            {
              name: "Law firm WordPress site",
              description: "Full design and development independently. WordPress + theme customization",
            },
            {
              name: "Waouh Monde Site (Lead Developer)",
              description: "Technical direction of the project. Development: Laravel + Vue.js + REST API",
            },
            {
              name: "FlashCar - Fleet management app (Project manager & Developer)",
              description: "Project management and team coordination. Stack: Laravel + Vue.js + Tailwind CSS + REST API + PostgreSQL",
            },
            {
              name: "Prunnel - Microservices Architecture (Lead Developer)",
              description: "Technical direction of the microservices architecture. Technologies: Laravel + Node.js + Vue.js + REST API + Consul + Jaeger + Swagger + PostgreSQL",
            },
          ],
          tags: ["Laravel", "Vue.js", "Node.js", "PostgreSQL", "Docker", "Microservices"],
        },
        {
          title: "Analyst Programmer (Intern)",
          company: "CABRO GROUP",
          location: "Cotonou, Benin",
          period: "Mar - May 2023",
          projects: [
            { name: "Client needs analysis", description: "In-depth requirements gathering and analysis" },
            { name: "Custom solution development", description: "Web applications tailored to specific needs" },
            { name: "Writing specifications", description: "Complete technical documentation" },
          ],
          tags: ["Analysis", "PHP", "MySQL", "Specifications"],
        },
      ],
    },
    education: {
      title: "Education",
      subtitle: "My academic background",
      present: "Present",
    },
    projects: {
      title: "Projects",
      subtitle: "Discover my work",
      viewProject: "View Project",
      viewCode: "View Code",
      filters: {
        all: "All",
        professional: "Professional",
        personal: "Personal",
      },
      professionalTitle: "Professional Projects",
      personalTitle: "Personal Projects",
      protected: {
        title: "Protected Section",
        description: "This section contains my personal projects. Please enter the password to access.",
        placeholder: "Enter password",
        unlock: "Unlock",
        wrongPassword: "Incorrect password",
      },
      visibility: {
        private: "Private",
        public: "Public",
      },
      updatedAgo: "Updated",
      viewOnGithub: "View on GitHub",
    },
    blog: {
      title: "Blog & Articles",
      subtitle: "My latest publications",
      readMore: "Read More",
      comingSoon: "Coming Soon",
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's discuss your project",
      name: "Full Name",
      namePlaceholder: "John Doe",
      email: "Email",
      emailPlaceholder: "john@example.com",
      subject: "Subject",
      subjectPlaceholder: "Subject of your message",
      message: "Message",
      messagePlaceholder: "Your message...",
      send: "Send Message",
      sending: "Sending...",
      orBookCall: "Or book a call",
      bookCall: "Book a Google Meet Call",
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made with",
      by: "by",
    },
  },
}
