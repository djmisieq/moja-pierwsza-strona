import { Timestamp } from 'firebase/firestore'

// Base types
export interface FirestoreDocument {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// User roles
export type UserRole = 'admin' | 'editor' | 'author' | 'moderator' | 'reader'

// Post status
export type PostStatus = 'draft' | 'review' | 'published' | 'archived'

// Classified status
export type ClassifiedStatus = 'pending' | 'published' | 'expired' | 'sold'

// Event status
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed'

// User interface
export interface User extends FirestoreDocument {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  bio?: string
  isEmailVerified: boolean
  fcmTokens?: string[]
  lastLoginAt?: Timestamp
  isActive: boolean
  preferences: {
    newsletter: boolean
    pushNotifications: boolean
    emailNotifications: boolean
    darkMode: boolean
  }
}

// Category interface
export interface Category extends FirestoreDocument {
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  postCount: number
  isActive: boolean
}

// Tag interface
export interface Tag extends FirestoreDocument {
  name: string
  slug: string
  postCount: number
  color?: string
}

// Author interface (simplified user for public display)
export interface Author {
  id: string
  displayName: string
  photoURL?: string
  bio?: string
  role: UserRole
}

// Post interface
export interface Post extends FirestoreDocument {
  title: string
  slug: string
  excerpt: string
  content: string // MDX content
  coverImageURL?: string
  coverImageAlt?: string
  authorId: string
  author?: Author // Populated field
  categoryId: string
  category?: Category // Populated field
  tags: string[] // Tag IDs
  tagData?: Tag[] // Populated tags
  status: PostStatus
  featured: boolean
  viewCount: number
  likeCount: number
  commentCount: number
  shareCount: number
  publishedAt?: Timestamp
  scheduledAt?: Timestamp
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  facebookPostId?: string // For tracking FB posts
  searchKeywords: string[] // For search functionality
  readingTime: number // Estimated reading time in minutes
  isSponsored: boolean
  sponsorInfo?: {
    name: string
    logo?: string
    website?: string
  }
}

// Classified interface
export interface Classified extends FirestoreDocument {
  title: string
  description: string
  price?: number
  currency: string
  categoryId: string
  category?: Category
  subcategory?: string
  authorId: string
  author?: Pick<User, 'id' | 'displayName' | 'photoURL'>
  contact: {
    phone?: string
    email?: string
    preferredContact: 'phone' | 'email' | 'both'
  }
  location: {
    city: string
    region: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  images: string[] // Storage URLs
  status: ClassifiedStatus
  featured: boolean
  expiresAt: Timestamp
  viewCount: number
  favoriteCount: number
  isPaid: boolean
  paymentId?: string // Stripe payment ID
  promotionLevel: 'basic' | 'premium' | 'featured'
  searchKeywords: string[]
  condition?: 'new' | 'used' | 'refurbished'
  isNegotiable: boolean
}

// Event interface
export interface Event extends FirestoreDocument {
  title: string
  slug: string
  description: string
  content?: string // Detailed description in MDX
  coverImageURL?: string
  coverImageAlt?: string
  authorId: string
  author?: Author
  categoryId?: string
  category?: Category
  startDate: Timestamp
  endDate: Timestamp
  location: {
    name: string
    address: string
    city: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  status: EventStatus
  featured: boolean
  isOnline: boolean
  onlineLink?: string
  price?: number
  currency: string
  isFree: boolean
  maxAttendees?: number
  currentAttendees: number
  tags: string[]
  tagData?: Tag[]
  viewCount: number
  attendeeCount: number
  organizerInfo: {
    name: string
    contact?: string
    website?: string
  }
  ticketURL?: string
  searchKeywords: string[]
}

// Comment interface
export interface Comment extends FirestoreDocument {
  content: string
  authorId: string
  author?: Pick<User, 'id' | 'displayName' | 'photoURL'>
  parentId?: string // For nested comments
  likeCount: number
  isApproved: boolean
  isEdited: boolean
  editedAt?: Timestamp
  ipAddress?: string // For moderation
  userAgent?: string // For moderation
}

// Newsletter subscription interface
export interface NewsletterSubscription extends FirestoreDocument {
  email: string
  isActive: boolean
  preferences: {
    frequency: 'daily' | 'weekly' | 'monthly'
    categories: string[] // Category IDs
    events: boolean
    classifieds: boolean
  }
  subscribedAt: Timestamp
  unsubscribedAt?: Timestamp
  unsubscribeToken: string
  source: 'website' | 'social' | 'manual' | 'import'
}

// Analytics interface
export interface Analytics extends FirestoreDocument {
  type: 'page_view' | 'post_view' | 'classified_view' | 'event_view' | 'search' | 'click'
  entityId?: string // Post/Classified/Event ID
  userId?: string
  sessionId: string
  path: string
  referrer?: string
  userAgent: string
  ipAddress?: string
  country?: string
  city?: string
  duration?: number // Time spent (for page views)
  searchQuery?: string // For search analytics
  clickTarget?: string // For click tracking
  metadata?: Record<string, any>
}

// Site settings interface
export interface SiteSettings extends FirestoreDocument {
  siteName: string
  siteDescription: string
  siteURL: string
  logoURL?: string
  faviconURL?: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  contact: {
    email: string
    phone?: string
    address?: string
  }
  features: {
    comments: boolean
    newsletter: boolean
    darkMode: boolean
    socialLogin: boolean
    classifieds: boolean
    events: boolean
  }
  seo: {
    googleAnalyticsId?: string
    facebookPixelId?: string
    googleSearchConsoleId?: string
    defaultOGImage?: string
  }
  content: {
    postsPerPage: number
    classifiedsPerPage: number
    eventsPerPage: number
    autoApproveComments: boolean
    moderationRequired: boolean
  }
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  totalCount: number
  page: number
  limit: number
  hasMore: boolean
  nextCursor?: string
}

export interface SearchResponse<T> extends PaginatedResponse<T> {
  query: string
  facets?: Record<string, Array<{ value: string; count: number }>>
  searchTime: number
}

// Firebase Functions types
export interface CreatePostRequest {
  title: string
  content: string
  categoryId: string
  tags?: string[]
  featured?: boolean
  publishNow?: boolean
  scheduledAt?: string
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string
}

export interface CreateClassifiedRequest {
  title: string
  description: string
  categoryId: string
  price?: number
  contact: Classified['contact']
  location: Classified['location']
  images?: string[]
  expiresIn?: number // Days
}

export interface SendNotificationRequest {
  title: string
  body: string
  data?: Record<string, string>
  topic?: string
  userIds?: string[]
  imageURL?: string
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DocumentData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type CreateData<T extends FirestoreDocument> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateData<T extends FirestoreDocument> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>

// Search filters
export interface SearchFilters {
  categories?: string[]
  tags?: string[]
  authors?: string[]
  status?: PostStatus[]
  featured?: boolean
  dateFrom?: Date
  dateTo?: Date
  priceMin?: number
  priceMax?: number
  location?: string
}

// Export all types as a namespace for easier imports
export namespace PortalTypes {
  export type {
    User,
    Category,
    Tag,
    Author,
    Post,
    Classified,
    Event,
    Comment,
    NewsletterSubscription,
    Analytics,
    SiteSettings,
    PaginatedResponse,
    SearchResponse,
    SearchFilters,
    CreatePostRequest,
    UpdatePostRequest,
    CreateClassifiedRequest,
    SendNotificationRequest
  }
}