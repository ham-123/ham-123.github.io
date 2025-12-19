import { Card } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

export default function EducationSection() {
  const education = [
    {
      degree: "MBA 1 Développeur Full-Stack",
      institution: "MyDigitalSchool",
      location: "Montpellier, France",
      period: "2025-2026",
      status: "En cours",
    },
    {
      degree: "Master Architecture des Logiciels",
      institution: "ESGIS",
      location: "Cotonou, Bénin",
      period: "2023-2025",
      status: "Obtenu",
    },
    {
      degree: "Licence professionnelle Système Informatique et Logiciels",
      institution: "HECM",
      location: "Parakou, Bénin",
      period: "2020-2023",
      status: "Obtenu",
    },
    {
      degree: "Baccalauréat Scientifique (Série D)",
      institution: "Collège Catholique BFA OZANAM",
      location: "Kandi, Bénin",
      period: "2020",
      status: "Obtenu",
    },
  ]

  return (
    <section id="education" className="relative py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">Formation</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan to-purple mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple/50 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple to-pink-500 flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-purple transition-colors leading-tight">
                      {edu.degree}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                        edu.status === "En cours"
                          ? "bg-neon/20 text-neon border border-neon/30"
                          : "bg-cyan/20 text-cyan border border-cyan/30"
                      }`}
                    >
                      {edu.status}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-purple mb-3">{edu.institution}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-cyan" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
