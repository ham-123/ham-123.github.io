import { Card } from "@/components/ui/card"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function ExperienceSection() {
  const { t } = useLanguage()

  // Récupérer les expériences depuis le système de traduction
  const rawItems = t("experience.items")
  const experiences = Array.isArray(rawItems) ? rawItems : []

  return (
    <section id="experience" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              {t("experience.title")}
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan via-purple to-neon" />

          <div className="space-y-12">
            {experiences.map((exp: any, index: number) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan to-purple border-4 border-background" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-300 group hover:scale-[1.02]">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-cyan to-purple">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-cyan transition-colors">{exp.title}</h3>
                        <p className="text-lg font-semibold text-purple mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {Array.isArray(exp.projects) && exp.projects.map((project: any, projIndex: number) => (
                        <div key={projIndex} className="pl-4 border-l-2 border-cyan/30">
                          <h4 className="font-semibold text-foreground mb-1">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(exp.tags) && exp.tags.map((tag: any, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
