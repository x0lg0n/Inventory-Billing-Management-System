'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  ScaleOnHover, 
  SlideIn, 
  BounceIn,
  PageTransition 
} from '@/components/animations';
import { 
  ArrowRight, 
  BarChart3, 
  Package, 
  Users, 
  Receipt, 
  Shield, 
  Zap, 
  Cloud,
  CheckCircle,
  TrendingUp,
  Smartphone,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track your products, stock levels, and get low stock alerts automatically.',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: Users,
    title: 'Customer & Vendor Management',
    description: 'Manage all your business relationships in one centralized location.',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: Receipt,
    title: 'Transaction Processing',
    description: 'Record sales and purchases with automatic stock updates.',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: BarChart3,
    title: 'Advanced Reporting',
    description: 'Get insights with comprehensive reports and analytics.',
    color: 'text-orange-600 dark:text-orange-400'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-level security measures.',
    color: 'text-red-600 dark:text-red-400'
  },
  {
    icon: Cloud,
    title: 'Cloud-Based',
    description: 'Access your business data anywhere, anytime from any device.',
    color: 'text-indigo-600 dark:text-indigo-400'
  }
];

const benefits = [
  'Real-time inventory tracking',
  'Automated stock management',
  'Comprehensive reporting',
  'Multi-device accessibility',
  'Secure data storage',
  'User-friendly interface'
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <FadeIn delay={0.2}>
                <Badge variant="secondary" className="mb-4">
                  <Zap className="mr-2 h-3 w-3" />
                  Modern Business Management
                </Badge>
              </FadeIn>
              
              <SlideIn direction="up" delay={0.4}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Streamline Your{' '}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Inventory & Billing
                  </span>{' '}
                  Operations
                </h1>
              </SlideIn>
              
              <FadeIn delay={0.6}>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  A comprehensive solution for small businesses to manage products, customers, 
                  vendors, transactions, and generate insightful reports - all in one place.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <ScaleOnHover>
                      <Button size="lg" asChild className="group">
                        <Link href="/dashboard">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </ScaleOnHover>
                  ) : (
                    <>
                      <ScaleOnHover>
                        <Button size="lg" asChild className="group">
                          <Link href="/register">
                            Get Started Free
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </ScaleOnHover>
                      <ScaleOnHover>
                        <Button variant="outline" size="lg" asChild>
                          <Link href="/login">
                            Sign In
                          </Link>
                        </Button>
                      </ScaleOnHover>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Animated Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <FadeIn delay={1} duration={2}>
              <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)] animate-pulse">
                <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary/20 to-secondary/20 opacity-20" />
              </div>
            </FadeIn>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need to Manage Your Business
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help small businesses streamline operations 
                and make data-driven decisions.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.15}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={index}>
                    <ScaleOnHover scale={1.05}>
                      <Card className="relative overflow-hidden h-full group transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-background to-muted/50">
                        <CardHeader>
                          <BounceIn delay={0.5 + index * 0.1}>
                            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} bg-current/10 mb-4 transition-all duration-300 group-hover:scale-110`}>
                              <Icon className={`h-6 w-6 ${feature.color}`} />
                            </div>
                          </BounceIn>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                        
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </Card>
                    </ScaleOnHover>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <SlideIn direction="left" delay={0.2}>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Why Choose Our Platform?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Built specifically for small businesses, our platform combines 
                  simplicity with powerful functionality to help you grow.
                </p>
                
                <StaggerContainer staggerDelay={0.1}>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-center space-x-3 group">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 transition-transform group-hover:scale-110" />
                          <span className="text-lg">{benefit}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.4}>
              <StaggerContainer staggerDelay={0.1}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <StaggerItem>
                    <ScaleOnHover>
                      <Card className="p-6 group hover:shadow-lg transition-all duration-300">
                        <TrendingUp className="h-8 w-8 text-green-500 mb-3 transition-transform group-hover:scale-110" />
                        <h3 className="font-semibold text-lg mb-2">Increase Efficiency</h3>
                        <p className="text-sm text-muted-foreground">
                          Automate routine tasks and focus on growing your business.
                        </p>
                      </Card>
                    </ScaleOnHover>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <ScaleOnHover>
                      <Card className="p-6 group hover:shadow-lg transition-all duration-300">
                        <Smartphone className="h-8 w-8 text-blue-500 mb-3 transition-transform group-hover:scale-110" />
                        <h3 className="font-semibold text-lg mb-2">Mobile Ready</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your business on the go with our responsive design.
                        </p>
                      </Card>
                    </ScaleOnHover>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <ScaleOnHover>
                      <Card className="p-6 group hover:shadow-lg transition-all duration-300">
                        <Shield className="h-8 w-8 text-purple-500 mb-3 transition-transform group-hover:scale-110" />
                        <h3 className="font-semibold text-lg mb-2">Data Security</h3>
                        <p className="text-sm text-muted-foreground">
                          Your business data is encrypted and securely stored.
                        </p>
                      </Card>
                    </ScaleOnHover>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <ScaleOnHover>
                      <Card className="p-6 group hover:shadow-lg transition-all duration-300">
                        <Globe className="h-8 w-8 text-orange-500 mb-3 transition-transform group-hover:scale-110" />
                        <h3 className="font-semibold text-lg mb-2">Always Available</h3>
                        <p className="text-sm text-muted-foreground">
                          Access your data 24/7 from anywhere in the world.
                        </p>
                      </Card>
                    </ScaleOnHover>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
          </FadeIn>
          
          <SlideIn direction="up" delay={0.4}>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using our platform to streamline 
              their operations and boost productivity.
            </p>
          </SlideIn>
          
          {!user && (
            <BounceIn delay={0.6}>
              <ScaleOnHover>
                <Button size="lg" variant="secondary" className="group">
                  <Link href="/register" className="flex items-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </ScaleOnHover>
            </BounceIn>
          )}
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FadeIn delay={0.8} duration={3}>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          </FadeIn>
          <FadeIn delay={1.2} duration={3}>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <StaggerContainer staggerDelay={0.15}>
              <div className="grid gap-8 md:grid-cols-4">
                <StaggerItem>
                  <div>
                    <div className="flex items-center space-x-2 mb-4 group">
                      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                        <Package className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span className="font-bold">Inventory & Billing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete business management solution for modern enterprises.
                    </p>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div>
                    <h3 className="font-semibold mb-3">Features</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="hover:text-foreground transition-colors cursor-pointer">Inventory Management</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Customer Management</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Transaction Processing</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Reporting & Analytics</li>
                    </ul>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div>
                    <h3 className="font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="hover:text-foreground transition-colors cursor-pointer">Documentation</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Help Center</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Contact Support</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">System Status</li>
                    </ul>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="hover:text-foreground transition-colors cursor-pointer">About Us</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</li>
                      <li className="hover:text-foreground transition-colors cursor-pointer">Blog</li>
                    </ul>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </FadeIn>
          
          <SlideIn direction="up" delay={0.6}>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Inventory & Billing Management System. All rights reserved.</p>
            </div>
          </SlideIn>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
