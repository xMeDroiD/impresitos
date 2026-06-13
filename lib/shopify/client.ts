// ─── Cliente fetch genérico para la Storefront API de Shopify ────────────────

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const token  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

const API_URL = domain
  ? `https://${domain}/api/2024-01/graphql.json`
  : ''

interface ShopifyFetchOptions<V> {
  query: string
  variables?: V
  cache?: RequestCache
}

export async function shopifyFetch<T, V = Record<string, unknown>>(
  { query, variables, cache = 'no-store' }: ShopifyFetchOptions<V>
): Promise<T> {
  if (!domain || !token) {
    console.warn(
      '[Shopify] Variables de entorno no configuradas. ' +
      'Rellena NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN y NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.local'
    )
    // En modo demo, retorna un objeto vacío para evitar crashes
    return {} as T
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  })

  if (!res.ok) {
    throw new Error(`[Shopify] Error HTTP ${res.status}: ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors?.length) {
    throw new Error(`[Shopify] GraphQL Error: ${json.errors[0].message}`)
  }

  return json.data as T
}
