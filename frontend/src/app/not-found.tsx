'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Search, AlertTriangle, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, BounceIn, SlideIn, AnimatedButton } from '@/components/animations';

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 Text */}
        <BounceIn delay={0.2}>
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold text-muted-foreground/20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              
            </div>
          </div>
        </BounceIn>

        {/* Error Message */}
        <FadeIn delay={0.4}>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-2xl md:text-3xl font-semibold">
                Page Not Found
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              Let&apos;s get you back on track!
            </p>
          </div>
        </FadeIn>

        {/* Action Cards */}
        <SlideIn direction="up" delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Go to Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access your main dashboard and manage your business
                  </p>
                  <Link href="/dashboard">
                    <AnimatedButton>
                      <div className="w-full">
                        <Button variant="outline" className="w-full">
                          <Home className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </div>
                    </AnimatedButton>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Explore Features</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse products, contacts, and transactions
                  </p>
                  <Link href="/products">
                    <AnimatedButton>
                      <div className="w-full">
                        <Button variant="outline" className="w-full">
                          <Search className="w-4 h-4 mr-2" />
                          Explore
                        </Button>
                      </div>
                    </AnimatedButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideIn>

        {/* Navigation Actions */}
        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton onClick={handleGoBack}>
              <div>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </AnimatedButton>
            
            <div className="text-sm text-muted-foreground">
              or
            </div>
            
            <Link href="/">
              <AnimatedButton>
                <div>
                  <Button variant="default">
                    <Home className="w-4 h-4 mr-2" />
                    Home Page
                  </Button>
                </div>
              </AnimatedButton>
            </Link>
          </div>
        </FadeIn>

        {/* Help Text */}
        <FadeIn delay={1.0}>
          <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
            <h3 className="font-semibold mb-2 text-center">Need Help?</h3>
            <p className="text-sm text-muted-foreground text-center">
              If you believe this is an error, please check the URL or contact support. 
              You can also try refreshing the page or clearing your browser cache.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}