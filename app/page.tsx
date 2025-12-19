"use client"

import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import ProjectsSection from "@/components/projects-section"
import BlogSection from "@/components/blog-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import ParticlesBackground from "@/components/particles-background"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticlesBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
