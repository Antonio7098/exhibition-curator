import '@/lib/polyfill'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: { headers: request.headers },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response = NextResponse.next({
              request: { headers: request.headers },
            })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string) {
            request.cookies.set(name, '')
            response = NextResponse.next({
              request: { headers: request.headers },
            })
            response.cookies.set(name, '')
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    const isLoginPage = request.nextUrl.pathname === '/login'
    const isRootPage = request.nextUrl.pathname === '/'
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/artworks') ||
                             request.nextUrl.pathname.startsWith('/exhibitions') ||
                             request.nextUrl.pathname.startsWith('/settings')

    if (isRootPage) {
      return response
    }

    // Redirect to login if not authenticated and trying to access protected routes
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect to artworks if authenticated and on login page
    if (session && isLoginPage) {
      return NextResponse.redirect(new URL('/artworks', request.url))
    }

    return response
  } catch (e) {
    console.error('Middleware error:', e)
    return NextResponse.next({
      request: { headers: request.headers },
    })
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
