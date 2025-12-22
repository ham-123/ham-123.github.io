"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Tag, ChevronLeft, ChevronRight } from "lucide-react"

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
    content: `Le Clean Code est bien plus qu'une simple tendance dans le développement logiciel - c'est une philosophie qui transforme la manière dont nous écrivons et maintenons nos applications Laravel.

## Introduction aux principes SOLID

Les principes SOLID constituent le fondement du Clean Code. En Laravel, leur application permet de créer des applications robustes et faciles à maintenir. Le principe de responsabilité unique (Single Responsibility Principle) stipule qu'une classe ne devrait avoir qu'une seule raison de changer. Par exemple, un contrôleur Laravel ne devrait pas gérer à la fois la validation, la logique métier et l'accès aux données.

## Architecture en couches

L'architecture en couches sépare clairement les responsabilités : les contrôleurs gèrent les requêtes HTTP, les services contiennent la logique métier, les repositories gèrent l'accès aux données, et les models représentent les entités. Cette séparation facilite les tests unitaires et l'évolution du code.

## Les Service Providers et l'Injection de Dépendances

Laravel excelle dans l'injection de dépendances grâce à son conteneur IoC (Inversion of Control). Plutôt que d'instancier directement les classes, nous les déclarons comme dépendances dans le constructeur. Cela rend le code testable et découplé. Les Service Providers permettent d'enregistrer ces liaisons de manière centralisée.

## Form Requests et Validation

Les Form Requests encapsulent la logique de validation, gardant les contrôleurs propres. Chaque requête a sa propre classe de validation avec des règles clairement définies. Cela respecte le principe de responsabilité unique et rend le code plus lisible.

## Eloquent : Bonnes pratiques

Utilisez les scopes pour encapsuler les requêtes complexes, les accessors et mutators pour transformer les données, et les relationships pour gérer les associations. Évitez le N+1 problem en utilisant eager loading avec with(). Les query builders offrent une API fluide et expressive.

## Tests automatisés

Le Clean Code n'est complet que s'il est testé. Laravel facilite les tests avec PHPUnit. Écrivez des tests unitaires pour les services, des tests de features pour les endpoints API, et utilisez les factories pour générer des données de test. Un code bien testé est un code maintenable.

## Conclusion

Adopter le Clean Code en Laravel demande de la discipline mais les bénéfices sont immenses : code plus lisible, maintenance simplifiée, onboarding facilité pour les nouveaux développeurs, et moins de bugs en production. Commencez petit, appliquez ces principes progressivement, et vous verrez rapidement la différence dans la qualité de votre code.`,
    date: "2025-04-10",
    readTime: "12 min",
    tags: ["Laravel", "Clean Code", "Architecture"],
    image: "/clean-code-programming.jpg",
  },
  {
    id: 2,
    title: "Docker et Microservices : Guide pratique",
    excerpt: "Comment orchestrer vos microservices avec Docker et Docker Compose pour un environnement de développement optimal.",
    content: `L'architecture microservices combinée à Docker représente l'avenir du développement d'applications scalables et résilientes. Ce guide vous accompagne dans la mise en place d'une infrastructure robuste.

## Comprendre l'architecture microservices

Les microservices décomposent une application monolithique en services indépendants, chacun responsable d'une fonctionnalité métier spécifique. Contrairement à un monolithe où tout est interconnecté, les microservices communiquent via des APIs REST ou des message brokers. Cette approche offre une scalabilité indépendante : si un service subit une charge importante, seul celui-ci est mis à l'échelle.

## Docker : Les fondamentaux

Docker encapsule une application et ses dépendances dans un conteneur léger et portable. Un Dockerfile définit l'environnement : image de base, dépendances, configuration. Les images sont immuables et versionnées, garantissant la reproductibilité. Les conteneurs s'exécutent isolés mais partagent le noyau du système hôte, les rendant beaucoup plus légers que les machines virtuelles.

## Docker Compose pour le développement local

Docker Compose orchestre plusieurs conteneurs via un fichier YAML. Définissez vos services (API, base de données, cache, queue), leurs networks pour la communication inter-services, et les volumes pour la persistance des données. En une seule commande 'docker-compose up', tout votre environnement démarre. C'est idéal pour reproduire l'environnement de production localement.

## Communication entre microservices

Les microservices doivent communiquer efficacement. Les APIs REST synchrones conviennent aux opérations simples. Pour les workflows complexes, utilisez un message broker comme RabbitMQ ou Kafka : un service publie un événement, d'autres s'y abonnent. Cette communication asynchrone découple les services et améliore la résilience.

## Gestion des données

Chaque microservice possède sa propre base de données (database per service pattern). Cela évite le couplage au niveau des données mais complexifie les transactions distribuées. Utilisez le pattern Saga pour gérer les transactions multi-services : une séquence d'opérations locales avec compensation en cas d'échec.

## Service Discovery et Load Balancing

Dans un environnement dynamique où les conteneurs démarrent et s'arrêtent, le service discovery automatise la détection des services disponibles. Consul ou Eureka maintiennent un registre des services. Un load balancer comme Nginx ou Traefik distribue le trafic entre les instances.

## Monitoring et Logging

Avec des dizaines de services, le monitoring devient crucial. Prometheus collecte les métriques, Grafana les visualise. Pour les logs, agrégez-les avec ELK Stack (Elasticsearch, Logstash, Kibana) ou Loki. Le distributed tracing avec Jaeger permet de suivre une requête à travers tous les services.

## Sécurité des conteneurs

Sécurisez vos conteneurs : utilisez des images officielles, scannez les vulnérabilités avec Trivy, ne lancez pas les processus en root, limitez les ressources CPU/mémoire. Pour l'authentification entre services, implémentez mTLS ou utilisez un service mesh comme Istio.

## CI/CD et déploiement

Automatisez le build, test et déploiement. Jenkins, GitLab CI ou GitHub Actions buildent les images Docker à chaque commit, exécutent les tests, puis poussent les images dans un registry. Kubernetes orchestre le déploiement en production avec rolling updates et health checks.

## Conclusion

Docker et les microservices transforment radicalement le développement logiciel. L'investissement initial en complexité est compensé par une scalabilité exceptionnelle, une résilience accrue et une vélocité de développement supérieure. Commencez par conteneuriser une application monolithique, puis décomposez-la progressivement en microservices.`,
    date: "2025-06-15",
    readTime: "15 min",
    tags: ["Docker", "Microservices", "DevOps"],
    image: "/docker-containers-technology.jpg",
  },
  {
    id: 3,
    title: "Vue.js 3 et Composition API : Les nouveautés",
    excerpt: "Explorez les nouvelles fonctionnalités de Vue.js 3 et comment la Composition API révolutionne le développement frontend.",
    content: `Vue.js 3 marque un tournant majeur dans l'écosystème JavaScript avec des performances améliorées et une nouvelle approche de composition des composants qui change la donne.

## La révolution de la Composition API

La Composition API introduit une nouvelle façon d'organiser la logique des composants. Contrairement à l'Options API où le code est organisé par type (data, methods, computed), la Composition API permet de regrouper le code par fonctionnalité logique. Cela améliore drastiquement la lisibilité et la réutilisabilité du code.

## Setup : Le point d'entrée

La fonction setup() est le cœur de la Composition API. Elle s'exécute avant la création du composant et retourne les données et fonctions exposées au template. Avec le sucre syntaxique <script setup>, le code devient encore plus concis : les imports et variables de top-level sont automatiquement disponibles dans le template.

## Réactivité avec ref et reactive

Vue 3 introduit ref() pour créer des valeurs réactives primitives et reactive() pour les objets. ref() encapsule la valeur dans un objet avec une propriété .value. Dans le template, le déballage est automatique. reactive() crée un proxy réactif profond de l'objet. Comprendre quand utiliser l'un ou l'autre est crucial pour une réactivité optimale.

## Computed et Watch : La réactivité avancée

computed() crée des propriétés dérivées qui se recalculent automatiquement quand leurs dépendances changent. Elles sont mises en cache pour optimiser les performances. watch() et watchEffect() surveillent les changements : watch() pour des dépendances explicites, watchEffect() pour un tracking automatique. Utilisez-les pour les effets de bord comme les appels API.

## Lifecycle Hooks dans la Composition API

Les hooks de cycle de vie sont préfixés par 'on' : onMounted(), onUpdated(), onUnmounted(). Ils s'utilisent directement dans setup(), permettant de grouper logiquement le code d'initialisation et de nettoyage. Plusieurs hooks du même type peuvent être appelés, facilitant l'organisation du code complexe.

## Composables : Réutilisation de logique

Les composables sont des fonctions qui encapsulent de la logique réactive réutilisable. C'est le remplacement des mixins, mais en beaucoup mieux : pas de conflit de noms, origine claire des propriétés, composition flexible. Par exemple, un useAuth() composable gère l'authentification, un useFetch() les requêtes API. La composition devient un jeu de construction.

## Teleport et Suspense : Nouveaux composants built-in

Teleport permet de rendre du contenu dans un autre endroit du DOM, parfait pour les modales ou tooltips. Suspense gère l'état de chargement des composants asynchrones de manière déclarative, affichant un fallback pendant le chargement. Ces primitives simplifient des patterns autrefois complexes.

## Performance et Tree-shaking

Vue 3 est jusqu'à 2x plus rapide que Vue 2 grâce à un virtual DOM réécrit et optimisé. Le compilateur génère du code hautement optimisé avec des optimisations statiques. Le tree-shaking élimine le code non utilisé, réduisant la taille du bundle. Les features comme Teleport ou Suspense ne sont incluses que si utilisées.

## TypeScript de première classe

Vue 3 est écrit en TypeScript et offre un support TypeScript exceptionnel. La Composition API avec <script setup lang="ts"> fournit une inférence de types automatique. defineProps<Props>() et defineEmits<Events>() offrent un typage fort sans runtime overhead. Les IDE comme VSCode avec Volar offrent une autocomplétion et détection d'erreurs parfaites.

## Migration depuis Vue 2

Vue 3 maintient une grande compatibilité avec Vue 2. La migration Build permet d'exécuter du code Vue 2 dans Vue 3 progressivement. L'Options API reste supportée, vous pouvez migrer à votre rythme. Les breaking changes sont documentés et des outils automatisent une partie de la migration.

## Écosystème et outils

Vite est le nouveau build tool recommandé, offrant un démarrage instantané et un HMR ultra-rapide. Pinia remplace Vuex comme store officiel, avec une API plus simple et un meilleur support TypeScript. Vue Router 4 s'intègre parfaitement avec la Composition API. L'écosystème a mûri avec des bibliothèques de composants comme Vuetify, Quasar ou Element Plus.

## Conclusion

Vue.js 3 avec la Composition API représente l'évolution naturelle du framework. Il conserve la simplicité et l'accessibilité qui ont fait le succès de Vue, tout en offrant les outils nécessaires pour construire des applications complexes et performantes. La courbe d'apprentissage est douce et les bénéfices immédiats. C'est le moment idéal pour adopter Vue 3 dans vos projets.`,
    date: "2025-07-01",
    readTime: "14 min",
    tags: ["Vue.js", "Frontend", "JavaScript"],
    image: "/vue-js-frontend-development.jpg",
  },
  {
    id: 4,
    title: "Next.js 14 et Server Components : L'avenir du React",
    excerpt: "Découvrez les Server Components de React et comment Next.js 14 révolutionne le développement d'applications web performantes.",
    content: `Next.js 14 introduit les React Server Components de manière stable, transformant fondamentalement la façon dont nous construisons des applications React modernes et performantes.

## Qu'est-ce que les Server Components ?

Les Server Components (RSC) sont des composants React qui s'exécutent uniquement sur le serveur. Contrairement aux composants traditionnels qui sont hydratés côté client, les RSC génèrent du HTML sur le serveur sans envoyer de JavaScript au navigateur. Cela réduit drastiquement la taille du bundle JavaScript et améliore les performances, particulièrement sur mobile et connexions lentes.

## L'architecture App Router

Next.js 14 adopte le nouveau App Router basé sur les Server Components. La structure app/ remplace pages/, avec une convention de routing basée sur les dossiers. Chaque dossier représente un segment de route, et les fichiers spéciaux (page.tsx, layout.tsx, loading.tsx, error.tsx) définissent l'interface. Cette architecture améliore la colocalisation du code et la composition des layouts.

## Server Components vs Client Components

Par défaut, tous les composants dans app/ sont des Server Components. Ils peuvent faire des requêtes de base de données directement, accéder au filesystem, utiliser des secrets sans les exposer au client. Pour l'interactivité (hooks, event handlers, browser APIs), ajoutez 'use client' en haut du fichier. La règle : Server Components peuvent importer des Client Components, mais l'inverse est impossible.

## Data Fetching : Async/Await dans les composants

Les Server Components peuvent être async. Vous pouvez utiliser await directement dans le composant pour fetcher des données. Plus besoin de useEffect() ou de useState() pour le data fetching. Next.js met en cache les requêtes automatiquement avec fetch(), et vous contrôlez la revalidation avec { next: { revalidate: 60 } }.

## Streaming et Suspense

Le streaming HTML permet d'envoyer progressivement le contenu au client. Avec Suspense, vous définissez des boundaries de chargement : le contenu rapide s'affiche immédiatement, le contenu lent (requêtes API, bases de données) est streamé dès qu'il est prêt. loading.tsx crée automatiquement un Suspense boundary, affichant un skeleton pendant le chargement.

## Server Actions : Mutations côté serveur

Les Server Actions permettent d'exécuter du code serveur depuis un formulaire ou un composant client, sans créer d'API route. Définissez une fonction async avec 'use server', appelez-la depuis un formulaire. Next.js gère automatiquement la sérialisation, la validation, et la revalidation. C'est parfait pour les formulaires, mutations de base de données, et actions authentifiées.

## Optimisation des images et fonts

Le composant Image de Next.js optimise automatiquement les images : lazy loading, responsive images, formats modernes (WebP, AVIF). next/font optimise les fonts : téléchargement local, élimination du flash de texte, preload automatique. Ces optimisations améliorent drastiquement les Core Web Vitals sans effort.

## Metadata et SEO

L'API Metadata génère des balises meta, Open Graph et Twitter Cards de manière type-safe. Exportez un objet metadata ou une fonction generateMetadata() async pour le contenu dynamique. Le sitemap.xml et robots.txt peuvent être générés dynamiquement. Next.js 14 facilite un SEO parfait.

## Partial Prerendering (Experimental)

Cette feature expérimentale combine le meilleur du statique et du dynamique. Les parties statiques d'une page sont prerendues au build, les parties dynamiques sont streamées à la requête. Le CDN peut cacher la partie statique tout en servant du contenu personnalisé. C'est l'avenir de l'optimisation web.

## Performance et Core Web Vitals

Next.js 14 optimise automatiquement pour les Core Web Vitals. Le code-splitting automatique charge uniquement le JavaScript nécessaire. Le prefetching des routes améliore la navigation. Les Server Components réduisent le bundle size. Le résultat : des applications ultra-rapides avec un excellent score Lighthouse.

## Déploiement sur Vercel

Vercel, créateur de Next.js, offre un déploiement en un clic avec Edge Functions, Incremental Static Regeneration, Image Optimization, et Analytics intégrés. Le déploiement automatique depuis Git, les preview deployments pour chaque PR, et le rollback instantané simplifient le workflow de déploiement.

## Migration progressive

Next.js 14 supporte Pages Router et App Router simultanément. Vous pouvez migrer page par page sans tout réécrire. Commencez par les nouvelles features dans app/, migrez progressivement les pages existantes. Les deux routers coexistent harmonieusement.

## Conclusion

Next.js 14 avec les Server Components représente un bond en avant majeur pour React. Les applications sont plus rapides, le code plus simple, l'expérience développeur améliorée. C'est le framework de choix pour construire des applications web modernes, du blog personnel à l'application d'entreprise complexe.`,
    date: "2025-09-12",
    readTime: "16 min",
    tags: ["Next.js", "React", "Server Components", "Performance"],
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "TypeScript avancé : Types utilitaires et patterns",
    excerpt: "Maîtrisez les types avancés de TypeScript pour écrire du code type-safe, maintenable et élégant.",
    content: `TypeScript va bien au-delà des types basiques. Les types avancés et utilitaires permettent d'exprimer des contraintes complexes et de construire des APIs robustes et élégantes.

## Types utilitaires built-in

TypeScript fournit des types utilitaires puissants. Partial<T> rend toutes les propriétés optionnelles, parfait pour les updates partiels. Required<T> fait l'inverse. Readonly<T> empêche les modifications. Pick<T, K> sélectionne des propriétés, Omit<T, K> les exclut. Record<K, V> crée un objet avec des clés et valeurs typées. Ces utilitaires composent la boîte à outils TypeScript.

## Conditional Types

Les types conditionnels utilisent la syntaxe T extends U ? X : Y. Ils permettent des types qui se transforment selon des conditions. Par exemple, type NonNullable<T> = T extends null | undefined ? never : T. Combinés avec infer, ils extraient des types imbriqués : type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any.

## Mapped Types

Les mapped types transforment les propriétés d'un type. { [K in keyof T]: U } itère sur les clés de T. Vous pouvez ajouter des modifiers : +readonly, -?, etc. Exemple : type Getters<T> = { [K in keyof T as \`get\${Capitalize<K>}\`]: () => T[K] }. Cela génère des getters pour chaque propriété automatiquement.

## Template Literal Types

Les template literal types combinent littéraux et types : type Color = 'red' | 'blue'; type Size = 'small' | 'large'; type Variant = \`\${Color}-\${Size}\`. Le résultat est 'red-small' | 'red-large' | 'blue-small' | 'blue-large'. Puissant pour générer des combinaisons valides automatiquement.

## Discriminated Unions

Les unions discriminées utilisent une propriété commune pour différencier les types. type Result<T> = { status: 'success'; data: T } | { status: 'error'; error: string }. TypeScript narrow automatiquement le type selon status. C'est le pattern recommandé pour gérer les états mutuellement exclusifs.

## Type Guards et Narrowing

Les type guards affinent les types. typeof vérifie les primitives, instanceof les classes, 'property' in object vérifie l'existence d'une propriété. Vous pouvez créer des custom type guards avec des prédicats : function isString(value: unknown): value is string { return typeof value === 'string' }. Le narrowing rend le code type-safe sans assertions.

## Generics avancés

Les génériques avec contraintes permettent des abstractions puissantes. function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] garantit que key existe dans obj. Les génériques par défaut : type Result<T = unknown> fournissent une valeur par défaut. Les génériques variadic avec ...T capturent des tuples de longueur variable.

## Branded Types

Les branded types (ou nominal types) créent des types distincts même si leur structure est identique. type UserId = string & { readonly __brand: 'UserId' }. Cela empêche de mélanger UserId et string accidentellement, ajoutant de la sécurité type-level. Utile pour les IDs, URLs, tokens, etc.

## Builder Pattern avec le typage

Le builder pattern en TypeScript peut être typé pour forcer l'ordre des appels. Chaque méthode retourne un nouveau type d'état, le compile empêchant les appels invalides. Vous garantissez ainsi qu'un objet ne peut être construit que s'il est complet et valide.

## Inférence de types et const assertions

TypeScript infère les types automatiquement, mais parfois trop largement. const config = { url: 'api' } infère { url: string }. Avec as const, vous obtenez { readonly url: 'api' }, un type littéral. Cela améliore la précision et permet des optimisations basées sur les constantes.

## Recursive Types

Les types récursifs se référencent eux-mêmes. type Json = string | number | boolean | null | Json[] | { [key: string]: Json }. Ils modélisent des structures arborescentes comme le JSON, les AST, ou les composants React imbriqués. TypeScript 4.1+ supporte les types récursifs tail-call optimisés.

## Declaration Merging

Le merging permet d'étendre les types existants. Vous pouvez augmenter des interfaces de bibliothèques externes en redéclarant l'interface dans votre code. Utile pour ajouter des propriétés custom aux objets globaux ou étendre les types de librairies tierces.

## Utility Types personnalisés

Créez vos propres utilitaires réutilisables. type DeepPartial<T> rend récursivement toutes les propriétés optionnelles. type Promisify<T> wrap les fonctions pour retourner des Promises. type Paths<T> génère tous les chemins possibles dans un objet. Ces utilitaires deviennent des blocs de construction dans votre codebase.

## Performance et compilation

Les types complexes peuvent ralentir la compilation. Évitez les types trop profondément imbriqués, utilisez des type aliases pour réutiliser, préférez les interfaces aux types pour les objets (elles sont plus performantes). Le compilateur affiche les warnings pour les types trop complexes.

## Conclusion

TypeScript avancé transforme le typage d'un simple outil de documentation en un langage expressif pour encoder des invariants au niveau type. Les erreurs sont détectées à la compilation plutôt qu'à l'exécution. Le code devient self-documenting et les refactorings sont sûrs. Investir dans les types avancés améliore drastiquement la qualité et la maintenabilité du code.`,
    date: "2025-10-10",
    readTime: "18 min",
    tags: ["TypeScript", "Types avancés", "Patterns"],
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "GraphQL vs REST : Choisir la bonne architecture API",
    excerpt: "Analyse approfondie des avantages et inconvénients de GraphQL et REST pour concevoir des APIs modernes et performantes.",
    content: `Le débat GraphQL vs REST anime la communauté des développeurs depuis des années. Chaque approche a ses forces et faiblesses. Ce guide vous aide à choisir en connaissance de cause.

## REST : Les fondamentaux

REST (Representational State Transfer) structure les APIs autour de ressources identifiées par des URLs. Les méthodes HTTP (GET, POST, PUT, DELETE) définissent les opérations. REST est stateless, chaque requête contient toutes les informations nécessaires. C'est simple, éprouvé, et universellement compris.

## REST : Avantages et limitations

REST brille par sa simplicité et sa mise en cache native via HTTP. Les outils comme Swagger documentent automatiquement les APIs. Mais REST souffre d'over-fetching (trop de données) et under-fetching (requêtes multiples nécessaires). Chaque endpoint est rigide, conçu pour un use case spécifique.

## GraphQL : Une approche centrée sur les données

GraphQL inverse le paradigme : le client spécifie exactement les données nécessaires dans une seule requête. Un seul endpoint expose tout le schema. Les queries sont auto-documentées grâce au typage fort. Les mutations modifient les données, les subscriptions permettent du real-time via WebSockets.

## Le schéma GraphQL : Type system puissant

Le schéma GraphQL définit les types, queries et mutations disponibles. Il sert de contrat entre frontend et backend. Les types sont fortement typés : scalaires (String, Int, Boolean), objets personnalisés, enums, unions, interfaces. L'introspection permet aux outils de découvrir le schéma automatiquement.

## Résolution de requêtes et N+1 problem

Chaque champ GraphQL a un resolver qui fetch les données. Naïvement, cela cause le N+1 problem : fetcher une liste puis itérer pour les détails. DataLoader résout cela via batching et caching. Il groupe les requêtes en une seule, dramatiquement améliorant les performances.

## Over-fetching vs Under-fetching

REST over-fetche souvent : GET /users retourne tout le profil quand vous ne voulez que le nom. Ou under-fetche : besoin de GET /users puis GET /posts pour chaque user. GraphQL élimine ces problèmes : le client demande { users { name posts { title } } }, une requête pour tout.

## Versionning : Philosophies opposées

REST versionne via URLs (/v1/users) ou headers. Chaque version est maintenue séparément. GraphQL évite les versions : ajoutez des champs, dépréciez les anciens (@deprecated), supprimez-les après migration. Le schéma évolue continuellement sans breaking changes.

## Caching : Force de REST, défi de GraphQL

REST profite du caching HTTP natif via ETags et Cache-Control. Les CDNs et proxies cachent automatiquement. GraphQL POST sur un endpoint unique complique le caching. Solutions : Apollo Client met en cache normalisé côté client, Persisted Queries permettent GET et caching HTTP.

## Tooling et écosystème

REST dispose d'outils matures : Postman, Swagger/OpenAPI, standards établis. GraphQL a un écosystème riche et croissant : Apollo Server/Client, Relay, GraphQL Playground, GraphQL Codegen pour générer types TypeScript du schéma. L'introspection rend les outils puissants.

## Real-time avec Subscriptions

Les subscriptions GraphQL fournissent du real-time natif via WebSockets. Définissez un champ subscription, le serveur push les updates aux clients abonnés. Parfait pour chat, notifications, dashboards live. REST nécessite Server-Sent Events ou WebSockets custom, moins standardisés.

## Sécurité et considérations

GraphQL expose un point d'entrée puissant potentiellement abusable. Des requêtes complexes imbriquées peuvent surcharger le serveur (DoS). Mitigations : query depth limiting, query cost analysis, rate limiting. Authentification/autorisation s'appliquent au niveau des resolvers. REST bénéficie de security through obscurity des endpoints multiples.

## Quand choisir REST ?

REST convient pour des APIs publiques simples, des ressources CRUD standard, quand le caching HTTP est crucial, ou si l'équipe est plus familière avec REST. Il reste le standard pour beaucoup d'intégrations externes et respecte les conventions web établies.

## Quand choisir GraphQL ?

GraphQL excelle pour des applications complexes avec des besoins variés (mobile/web/desktop nécessitant différentes données), des équipes frontend/backend découplées, du real-time, ou quand minimiser les requêtes réseau est critique. Il améliore la vélocité de développement frontend.

## Approche hybride

Rien n'empêche de combiner les deux. Exposez une API REST pour les use cases simples et un endpoint GraphQL pour les requêtes complexes. BFF (Backend for Frontend) peut transformer REST en GraphQL. L'approche pragmatique choisit l'outil adapté au problème.

## Conclusion

GraphQL et REST ne sont pas des technologies concurrentes mais complémentaires. REST reste pertinent pour des APIs simples et publiques. GraphQL brille pour les applications complexes nécessitant flexibilité et performance. Comprendre les deux et choisir selon le contexte garantit des APIs optimales.`,
    date: "2025-12-12",
    readTime: "17 min",
    tags: ["GraphQL", "REST", "API", "Architecture"],
    image: "/placeholder.svg",
  },
  {
    id: 7,
    title: "Sécurité Web : OWASP Top 10 et bonnes pratiques",
    excerpt: "Guide complet pour sécuriser vos applications web contre les vulnérabilités les plus courantes et critiques.",
    content: `La sécurité web n'est pas optionnelle. Les attaques sont sophistiquées et constantes. Comprendre l'OWASP Top 10 et implémenter les bonnes pratiques est essentiel pour protéger vos applications et utilisateurs.

## OWASP Top 10 : Vue d'ensemble

L'OWASP (Open Web Application Security Project) publie régulièrement le Top 10 des vulnérabilités web les plus critiques. Cette liste guide les développeurs, testeurs et organisations pour prioriser les efforts de sécurité. Connaître ces vulnérabilités est la première étape vers des applications sécurisées.

## A01: Broken Access Control

Le contrôle d'accès cassé permet aux utilisateurs d'agir hors de leurs permissions. Exemples : modifier l'ID dans l'URL pour accéder aux données d'un autre utilisateur, élever ses privilèges, accéder à des APIs non autorisées. Protection : vérifier les permissions côté serveur à chaque requête, jamais se fier au client, principe du moindre privilège.

## A02: Cryptographic Failures

L'échec cryptographique expose des données sensibles : mots de passe, cartes bancaires, données médicales. Causes : transmission sans TLS, algorithmes obsolètes (MD5, SHA1), clés faibles, stockage en clair. Solutions : TLS partout, HTTPS strict, bcrypt/Argon2 pour les mots de passe, AES-256 pour le chiffrement, rotation régulière des clés.

## A03: Injection

Les injections (SQL, NoSQL, LDAP, OS) se produisent quand des données non fiables sont envoyées à l'interpréteur. L'attaquant injecte des commandes malveillantes. Protection : parameterized queries/prepared statements, ORMs qui échappent automatiquement, validation et sanitization strictes des inputs, principe de moindre privilège pour les comptes DB.

## A04: Insecure Design

Le design non sécurisé reflète des failles architecturales. Une implémentation parfaite d'un design défaillant reste vulnérable. Solutions : threat modeling dès la conception, security requirements, design patterns sécurisés, defense in depth avec plusieurs couches de sécurité, principe de "fail secure" (échouer de manière sécurisée).

## A05: Security Misconfiguration

Les mauvaises configurations sont omniprésentes : permissions par défaut, features inutiles activées, erreurs détaillées en production, logiciels non mis à jour. Prévention : hardening des serveurs, désactiver les fonctionnalités non utilisées, gérer les erreurs sans révéler de détails, automatiser la configuration sécurisée, scanner régulièrement les vulnérabilités.

## A06: Vulnerable and Outdated Components

L'utilisation de composants avec des vulnérabilités connues expose l'application. Les dépendances npm, les frameworks, les librairies peuvent contenir des failles. Protection : inventaire des dépendances, Dependabot/Snyk pour alertes, mises à jour régulières, SCA (Software Composition Analysis), sources fiables uniquement.

## A07: Identification and Authentication Failures

Les failles d'authentification permettent aux attaquants de compromettre des comptes. Exemples : brute force sans rate limiting, mots de passe faibles acceptés, session IDs dans l'URL, tokens non révoqués. Solutions : MFA obligatoire, politiques de mots de passe forts, rate limiting, session management sécurisé, CAPTCHA pour prévenir l'automatisation.

## A08: Software and Data Integrity Failures

L'intégrité compromise permet d'injecter du code malveillant. CI/CD non sécurisé, désérialisation non vérifiée, plugins non vérifiés. Protection : vérifier les signatures des dépendances, Subresource Integrity (SRI) pour CDNs, sécuriser le pipeline CI/CD, éviter la désérialisation de données non fiables, code signing.

## A09: Security Logging and Monitoring Failures

Sans logging et monitoring appropriés, les breaches passent inaperçues pendant des mois. Loggez les événements critiques : authentifications, échecs d'autorisation, validations échouées. SIEM (Security Information and Event Management) agrège et alerte. Attention : ne loggez jamais de données sensibles (mots de passe, tokens).

## A10: Server-Side Request Forgery (SSRF)

SSRF trompe le serveur pour fetcher des URLs malveillantes, accédant au réseau interne, métadonnées cloud (AWS credentials), ou exfiltrant des données. Protection : whitelist stricte des domaines autorisés, désactiver les redirections HTTP, segmentation réseau, pas d'input utilisateur direct dans les URLs.

## Content Security Policy (CSP)

CSP est un header HTTP qui contrôle les sources de contenu autorisées, bloquant XSS et injections de données. Définissez des policies strictes : script-src 'self', object-src 'none', etc. Utilisez nonces ou hashes pour les inline scripts. CSP en mode report-only permet de tester avant d'enforcer.

## Cross-Site Request Forgery (CSRF)

CSRF force l'utilisateur authentifié à exécuter des actions non intentionnelles. Protection : tokens CSRF synchronisés, SameSite cookies (Strict ou Lax), vérifier l'origine/referer, requêtes sensibles nécessitent reconfirmation (mot de passe).

## Validation et Sanitization

Validez tous les inputs côté serveur : whitelist > blacklist, types stricts, longueurs, formats. Sanitizez avant affichage : encodage HTML pour prévenir XSS, encodage contexte-aware (HTML, JavaScript, URL). Never trust user input, même de sources internes.

## Principe de défense en profondeur

Une seule mesure de sécurité est insuffisante. Multipliez les couches : authentification, autorisation, validation, chiffrement, monitoring. Si une couche échoue, les autres protègent. C'est la différence entre une application vulnérable et une application résiliente.

## Tests de sécurité

Intégrez la sécurité dans le cycle de développement : static analysis (SAST) scanne le code, dynamic analysis (DAST) teste l'application en cours d'exécution, penetration testing simule des attaques réelles. Automatisez les scans dans CI/CD. Bug bounty programs récompensent les chercheurs en sécurité trouvant des vulnérabilités.

## Conclusion

La sécurité web est un processus continu, pas une checklist. Les menaces évoluent constamment. Formez-vous régulièrement, suivez les advisories de sécurité, mettez à jour vos dépendances, loggez et surveillez, testez proactivement. Une culture de sécurité dans l'équipe transforme la sécurité d'un afterthought en une priorité intégrée dès la conception.`,
    date: "2025-04-10",
    readTime: "20 min",
    tags: ["Sécurité", "OWASP", "Web Security", "Best Practices"],
    image: "/placeholder.svg",
  },
  {
    id: 8,
    title: "CI/CD moderne : GitHub Actions, Docker et Kubernetes",
    excerpt: "Construisez un pipeline CI/CD complet et automatisé pour déployer vos applications en production avec confiance et rapidité.",
    content: `Le CI/CD (Continuous Integration/Continuous Deployment) automatise le cycle build-test-deploy, accélérant la livraison tout en maintenant la qualité. Ce guide construit un pipeline moderne avec les outils actuels.

## Les fondamentaux du CI/CD

CI (Continuous Integration) intègre le code fréquemment, exécutant tests et builds automatiquement à chaque commit. Cela détecte les bugs tôt. CD (Continuous Deployment) automatise le déploiement en production après validation. L'objectif : réduire le time-to-market tout en garantissant la qualité et la stabilité.

## GitHub Actions : Workflow as Code

GitHub Actions définit les workflows CI/CD en YAML directement dans le repository (.github/workflows/). Triggers : push, pull request, schedule cron, webhook. Jobs s'exécutent sur des runners (Ubuntu, Windows, macOS). Steps exécutent des commandes ou actions réutilisables. Matrix builds testent plusieurs versions simultanément.

## Structure d'un workflow GitHub Actions

Un workflow typique : checkout du code, setup de l'environnement (Node, Python, Go), installation des dépendances, linting, tests unitaires, tests d'intégration, build de l'image Docker, scan de sécurité, push vers un registry, déploiement. Les secrets (credentials, tokens) sont stockés sécurisés dans GitHub Secrets, injectés comme variables d'environnement.

## Tests automatisés : La fondation du CI/CD

Les tests sont la clé d'un CI/CD fiable. Tests unitaires vérifient la logique en isolation, tests d'intégration valident les interactions entre composants, tests end-to-end simulent les parcours utilisateurs. Code coverage mesure le pourcentage de code testé. Visez 80%+ coverage. Les tests doivent être rapides, déterministes et isolés.

## Docker : Containerisation pour la portabilité

Docker encapsule l'application et dépendances, garantissant la cohérence dev-prod. Multi-stage builds optimisent la taille : stage de build avec outils de compilation, stage final minimal avec uniquement le runtime et binaires. Utilisez des images de base légères (alpine), scannez les vulnérabilités avec Trivy ou Snyk.

## Docker Registry : Stocker et versionner les images

Docker Hub, GitHub Container Registry (GHCR), AWS ECR, Google GCR stockent les images. Taggez sémantiquement : latest pour la dernière version, versions spécifiques (v1.2.3), SHA du commit pour traçabilité. GitHub Actions peut build et push automatiquement : docker build, docker tag, docker push dans le workflow.

## Kubernetes : Orchestration à grande échelle

Kubernetes (K8s) orchestre les conteneurs : déploiements déclaratifs, scaling automatique, self-healing, rolling updates, load balancing. Concepts clés : Pods (un ou plusieurs conteneurs), Deployments (réplicasets managés), Services (networking stable), ConfigMaps/Secrets (configuration), Ingress (routing HTTP).

## Déploiement sur Kubernetes via GitOps

GitOps utilise Git comme source de vérité pour l'infrastructure. Flux ou ArgoCD surveillent le repository, synchronisant automatiquement l'état de K8s. Workflow : commit le YAML K8s, GitOps tool le détecte, applique les changements. Rollback simple : revert le commit. Tout est versionné, auditable et reproductible.

## Helm : Package manager pour Kubernetes

Helm template les manifests K8s, permettant la réutilisation et la parameterisation. Un chart Helm package l'application : templates, values.yaml pour configuration, Chart.yaml pour métadonnées. Déployez différents environnements (dev, staging, prod) avec différentes values. Helm facilite upgrades et rollbacks.

## Stratégies de déploiement

Rolling update remplace progressivement les pods, zero downtime mais rollout lent. Blue/Green déploie la nouvelle version à côté, switch le trafic instantanément, rollback immédiat mais coûte double ressources. Canary déploie vers un petit % d'utilisateurs, augmente progressivement si stable. Chaque stratégie balance risque, coût et rapidité.

## Monitoring et Observabilité

Le CI/CD ne s'arrête pas au déploiement. Monitoring en production : Prometheus collecte métriques, Grafana visualise, Alertmanager notifie. Logs centralisés avec ELK ou Loki. Distributed tracing avec Jaeger. Health checks dans K8s (liveness, readiness) redémarrent automatiquement les pods défaillants.

## Sécurité dans le pipeline

Sécurisez chaque étape : SAST scanne le code source, dependency scanning vérifie les vulnérabilités dans les librairies, container scanning analyse les images Docker, DAST teste l'application déployée. Intégrez ces scans dans le pipeline, échouant si des vulnérabilités critiques sont détectées. Shift-left security : tester tôt dans le cycle.

## Environnements multiples

Maintenez dev, staging et production. Dev pour développement actif, staging miroir de prod pour tests finaux, prod pour utilisateurs. Chaque environnement a sa configuration (variables d'environnement, secrets). Le code traverse les environnements : merge sur develop déclenche deploy en dev, sur main en staging, un tag en prod.

## Feature Flags et Progressive Delivery

Les feature flags découplent déploiement et release. Déployez le code en production avec la feature désactivée, activez-la progressivement pour certains utilisateurs. Cela permet canary releases contrôlés, A/B testing, kill switch si problème. LaunchDarkly, Unleash ou solutions custom gèrent les flags.

## Rollback et Disaster Recovery

Les erreurs arrivent. Planifiez les rollbacks : K8s rollback à la revision précédente, revert du commit Git, restore de base de données depuis backup. Testez régulièrement les procédures de recovery. RTO (Recovery Time Objective) et RPO (Recovery Point Objective) définissent vos SLAs de recovery.

## Métriques et amélioration continue

Mesurez les performances du pipeline : deployment frequency, lead time for changes, MTTR (Mean Time To Recovery), change failure rate (DORA metrics). Ces métriques indiquent la maturité DevOps. Automatisez davantage, optimisez les tests lents, parallélisez les jobs. L'amélioration continue transforme le pipeline en avantage compétitif.

## Conclusion

Un pipeline CI/CD moderne transforme le développement logiciel. Les déploiements passent de mensuels stressants à quotidiens sereins. Les bugs sont détectés rapidement, les features livrées plus vite, les équipes plus confiantes. L'investissement initial est rentabilisé par la vélocité, qualité et fiabilité accrues. CI/CD n'est pas seulement des outils, c'est une culture d'automatisation et d'amélioration continue.`,
    date: "2025-06-15",
    readTime: "22 min",
    tags: ["CI/CD", "GitHub Actions", "Docker", "Kubernetes", "DevOps"],
    image: "/placeholder.svg",
  },
]

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('blog-scroll-container')
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

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

        {/* Blog Posts Horizontal Scroll with Navigation */}
        <div className="relative mb-12">
          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background border border-cyan/30"
            onClick={() => scrollContainer('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Scrollable Container */}
          <div
            id="blog-scroll-container"
            className="flex gap-6 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group flex-shrink-0 w-[350px] overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan/50 transition-all duration-300 hover:scale-105 cursor-pointer"
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

          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background border border-cyan/30"
            onClick={() => scrollContainer('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
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
