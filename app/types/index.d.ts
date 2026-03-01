import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar: Avatar
  } & Link)[]
}

export interface PageSection {
  title: string
  description: string
  id?: string
  orientation?: 'horizontal' | 'vertical'
  reverse?: boolean
  image?: string
  features: {
    name: string
    description: string
    icon: string
  }[]
}

export interface IndexPage extends ParsedContent {
  title: string
  description: string
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    segments: Array<{
      label: string
      icon: string
      title: string
      description: string
    }>
    links: Array<any>
  }
  sections: PageSection[]
  features: {
    title: string
    description: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  testimonials: {
    headline: string
    title: string
    description: string
    items: Array<{
      quote: string
      user: {
        name: string
        description: string
        avatar: { src: string }
      }
    }>
  }
  cta: {
    title: string
    description: string
    links: Array<any>
  }
}

// make the shared Supabase client available via nuxtApp.$supabase
import type { SupabaseClient } from '@supabase/supabase-js'

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient
  }
}
