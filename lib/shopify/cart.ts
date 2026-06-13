// ─── Funciones de alto nivel para gestión del carrito ────────────────────────

import { shopifyFetch } from './client'
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './mutations'
import type {
  CartAttribute,
  CartCreateResponse,
  CartLinesAddResponse,
} from './types'

// Crea un carrito vacío y devuelve su ID
export async function createCart(): Promise<string> {
  const data = await shopifyFetch<CartCreateResponse>({
    query: CART_CREATE_MUTATION,
  })
  return data?.cartCreate?.cart?.id ?? ''
}

// Obtiene el cartId de localStorage o crea uno nuevo
export async function getOrCreateCartId(): Promise<string> {
  if (typeof window === 'undefined') return ''

  let cartId = localStorage.getItem('impresitos_cart_id')
  if (!cartId) {
    cartId = await createCart()
    if (cartId) localStorage.setItem('impresitos_cart_id', cartId)
  }
  return cartId
}

// ─── Añadir al carrito con custom attributes ─────────────────────────────────
// Los custom attributes transportan la personalización del usuario:
//   { key: 'Texto personalizado', value: 'Mamá te quiero' }
//   { key: 'Color elegido',       value: 'Rosa Pastel'   }
//   { key: 'Imagen (simulada)',   value: 'mock://archivo.jpg' }
// En Shopify aparecerán en el pedido como "Line item properties"
export async function addToCart(
  merchandiseId: string,
  quantity: number,
  customAttributes: CartAttribute[]
) {
  const cartId = await getOrCreateCartId()

  if (!cartId) {
    // Modo demo sin Shopify configurado: simular éxito
    console.info('[Demo] addToCart simulado:', { merchandiseId, quantity, customAttributes })
    return { success: true, demo: true }
  }

  const data = await shopifyFetch<CartLinesAddResponse>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      lines: [
        {
          merchandiseId,
          quantity,
          attributes: customAttributes,
        },
      ],
    },
  })

  const userErrors = data?.cartLinesAdd?.userErrors ?? []
  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message)
  }

  return data?.cartLinesAdd?.cart
}

// Elimina líneas del carrito
export async function removeCartLines(lineIds: string[]) {
  const cartId = localStorage.getItem('impresitos_cart_id')
  if (!cartId) return null

  return shopifyFetch({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
  })
}
