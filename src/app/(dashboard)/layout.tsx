'use client'

import * as React from 'react'
import { useSidebar } from '@/hooks/use-sidebar'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { CommandPalette } from '@/components/command-palette'
import { AuthGuard } from '@/components/auth-guard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { collapsed, toggle } = useSidebar()

  return (
    <AuthGuard>
      <div className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <Sidebar collapsed={collapsed} onToggle={toggle} />
        <Header sidebarCollapsed={collapsed} />
        <main
          id="main-content"
          className={`pt-16 transition-all duration-300 ${
            collapsed ? 'ml-[60px]' : 'ml-[260px]'
          }`}
          tabIndex={-1}
        >
          <div className="p-6">{children}</div>
        </main>
        <CommandPalette />
      </div>
    </AuthGuard>
  )
}
