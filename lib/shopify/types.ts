// ─── Tipos base de la Storefront API de Shopify ─────────────────────────────

export interface ShopifyImage {
  url: string
  altText: string | null
  width?: number
  height?: number
}

export interface MoneyV2 {
  amount: string
  currencyCode: string
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: MoneyV2
  compareAtPrice: MoneyV2 | null
  selectedOptions: { name: string; value: string }[]
  image?: ShopifyImage
}

export interface Product {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  featuredImage: ShopifyImage
  priceRange: {
    minVariantPrice: MoneyV2
    maxVariantPrice: MoneyV2
  }
  variants: {
    edges: { node: ProductVariant }[]
  }
  images: {
    edges: { node: ShopifyImage }[]
  }
  tags: string[]
}

// ─── Carrito ─────────────────────────────────────────────────────────────────

export interface CartAttribute {
  key: string
  value: string
}

export interface CartLine {
  id: string
  quantity: number
  attributes: CartAttribute[]
  merchandise: {
    id: string
    title: string
    product: {
      title: string
      handle: string
      featuredImage: ShopifyImage
    }
    price: MoneyV2
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  lines: {
    edges: { node: CartLine }[]
  }
  cost: {
    totalAmount: MoneyV2
    subtotalAmount: MoneyV2
  }
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart
    userErrors: { field: string[]; message: string }[]
  }
}

export interface CartCreateResponse {
  cartCreate: {
    cart: { id: string; checkoutUrl: string }
    userErrors: { field: string[]; message: string }[]
  }
}
