"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bell, Menu, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SkillChainLogo } from "@/components/skillchain-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-sky-blue/10 bg-deep-space/90 backdrop-blur-md">
      <div className="flex h-full items-center px-4">
        <div className="lg:hidden mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-sky-blue hover:bg-space/30 hover:text-electric-blue"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <Link href="/dashboard" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SkillChainLogo className="h-8 w-8 mr-2" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-montserrat font-bold text-xl text-electric-blue"
          >
            SkillChain
          </motion.span>
        </Link>

        <div className="hidden md:flex ml-8 relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services, freelancers..."
            className="pl-10 bg-space/30 border-space/30 focus:border-sky-blue/50"
          />
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-sky-blue hover:bg-space/30 hover:text-electric-blue"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-sky-blue" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sky-blue hover:bg-space/30 hover:text-electric-blue">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-deep-space border-sky-blue/10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-sky-blue/10" />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Wallet</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-sky-blue/10" />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden absolute top-16 left-0 right-0 bg-deep-space/90 backdrop-blur-md border-b border-sky-blue/10 shadow-lg shadow-sky-blue/5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services, freelancers..."
                className="pl-10 bg-space/30 border-space/30 focus:border-sky-blue/50"
              />
            </div>
            <nav className="space-y-1">
              <Link
                href="/dashboard/marketplace"
                className="block py-2 px-3 rounded-md hover:bg-space/30 text-white hover:text-sky-blue"
              >
                Marketplace
              </Link>
              <Link
                href="/dashboard/create-contract"
                className="block py-2 px-3 rounded-md hover:bg-space/30 text-white hover:text-sky-blue"
              >
                Create Contract
              </Link>
              <Link
                href="/dashboard/chat"
                className="block py-2 px-3 rounded-md hover:bg-space/30 text-white hover:text-sky-blue"
              >
                Messages
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
