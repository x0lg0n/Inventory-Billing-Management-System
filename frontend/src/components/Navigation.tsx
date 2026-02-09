"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn, SlideIn, ScaleOnHover, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Receipt, 
  BarChart3, 
  LogOut, 
  User,
  Menu,
  X,
  Home,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <FadeIn>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          {/* Logo */}
          <div className="mr-6">
            <Link href="/" className="flex items-center space-x-2">
              <ScaleOnHover>
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
              </ScaleOnHover>
              <span className="hidden font-bold sm:inline-block hover:text-primary transition-colors">
                Inventory & Billing
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.href} delay={index * 0.1}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 transition-all duration-300 hover:text-foreground/80 hover:scale-105 px-3 py-2 rounded-md',
                      pathname === item.href
                        ? 'text-foreground bg-accent/50'
                        : 'text-foreground/60'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </FadeIn>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center space-x-4">
            <ScaleOnHover>
              <ThemeToggle />
            </ScaleOnHover>
            
            {user ? (
              <ScaleOnHover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative h-8 w-8 rounded-full hover:bg-accent">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/email-notifications" className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="hover:bg-destructive/10 hover:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ScaleOnHover>
            ) : (
              <div className="flex items-center space-x-2">
                <ScaleOnHover>
                  <Button variant="ghost" asChild className="hover:bg-accent">
                    <Link href="/login">Sign In</Link>
                  </Button>
                </ScaleOnHover>
                <ScaleOnHover>
                  <Button asChild className="hover:bg-primary/90">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </ScaleOnHover>
              </div>
            )}

            {/* Mobile menu button */}
            <ScaleOnHover>
              <Button
                variant="ghost"
                className="md:hidden hover:bg-accent"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </ScaleOnHover>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <SlideIn direction="down" duration={0.3}>
            <div className="md:hidden">
              <StaggerContainer staggerDelay={0.05}>
                <div className="space-y-1 px-2 pb-3 pt-2 shadow-lg bg-background border-t">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:translate-x-2',
                            pathname === item.href
                              ? 'bg-accent text-accent-foreground'
                              : 'text-foreground/60'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </div>
              </StaggerContainer>
            </div>
          </SlideIn>
        )}
      </header>
    </FadeIn>
  );
}