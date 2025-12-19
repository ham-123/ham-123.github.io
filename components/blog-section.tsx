"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Les bonnes pratiques du Clean Code en Laravel",
    excerpt: "Découvrez comment structurer vos applications Laravel pour une meilleure maintenabilité et scalabilité.",
    content:
      "Le Clean Code est essentiel pour créer des applications maintenables. Dans cet article, nous explorons les principes SOLID appliqués à Laravel...",
    date: "2024-03-15",
    readTime: "5 min",
    tags: ["Laravel", "Clean Code", "Architecture"],
    image: "/clean-code-programming.jpg",
  },
  {
    id: 2,
    title: "Docker et Microservices : Guide pratique",
    excerpt:
      "Comment orchestrer vos microservices avec Docker et Docker Compose pour un environnement de développement optimal.",
    content:
      "Les microservices et Docker sont devenus incontournables. Voici comment mettre en place une architecture robuste...",
    date: "2024-03-10",
    readTime: "8 min",
    tags: ["Docker", "Microservices", "DevOps"],
    image: "/docker-containers-technology.jpg",
  },
  {
    id: 3,
    title: "Vue.js 3 et Composition API : Les nouveautés",
    excerpt:
      "Explorez les nouvelles fonctionnalités de Vue.js 3 et comment la Composition API révolutionne le développement frontend.",
    content: "Vue.js 3 apporte des changements majeurs avec la Composition API. Découvrons ensemble ces nouveautés...",
    date: "2024-03-05",
    readTime: "6 min",
    tags: ["Vue.js", "Frontend", "JavaScript"],
    image: "/vue-js-frontend-development.jpg",
  },
]

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <section id="blog" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan via-purple to-neon bg-clip-text text-transparent">
            Blog & Publications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mes réflexions et découvertes sur le développement web, l'architecture logicielle et les technologies
            modernes
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPost(post)}
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-cyan transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-cyan/10 to-purple/10 backdrop-blur-sm border border-cyan/30">
            <p className="text-muted-foreground mb-4">Plus d'articles à venir bientôt...</p>
            <Button variant="outline" className="border-cyan/50 hover:bg-cyan/10 hover:border-cyan bg-transparent">
              <Tag className="mr-2 h-4 w-4" />
              S'abonner aux notifications
            </Button>
          </div>
        </div>

        {/* Modal for Full Post (if selected) */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <Card
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-card border-cyan/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => setSelectedPost(null)}
                >
                  ×
                </Button>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mb-4 text-foreground">{selectedPost.title}</h2>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedPost.date).toLocaleDateString("fr-FR")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {selectedPost.readTime}
                  </span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{selectedPost.content}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
