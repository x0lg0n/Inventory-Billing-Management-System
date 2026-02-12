'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FadeIn, SlideIn, FormFieldAnimation, LoadingSpinner } from '@/components/animations';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessId: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push('/dashboard');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      setLoading(false);
      return;
    }

    try {
      await register(formData);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <FadeIn delay={0.2}>
        <SlideIn direction="up" duration={0.5}>
          <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="space-y-1">
              <FadeIn delay={0.4}>
                <CardTitle className="text-2xl text-center">
                  Create an account
                </CardTitle>
              </FadeIn>
              <FadeIn delay={0.5}>
                <CardDescription className="text-center">
                  Enter your details to create your account
                </CardDescription>
              </FadeIn>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <SlideIn direction="down" duration={0.3}>
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </SlideIn>
                )}

                {/* Full Name */}
                <FormFieldAnimation delay={0.6}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </FormFieldAnimation>

                {/* Email */}
                <FormFieldAnimation delay={0.7}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </FormFieldAnimation>

                {/* Password */}
                <FormFieldAnimation delay={0.8}>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Strong password (Min 8 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pr-10 transition-all duration-300 focus:scale-105"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Must contain uppercase, lowercase, number, special character & 8+ characters
                    </p>
                  </div>
                </FormFieldAnimation>

                {/* Business ID */}
                <FormFieldAnimation delay={0.9}>
                  <div className="space-y-2">
                    <Label htmlFor="businessId">Business ID</Label>
                    <Input
                      id="businessId"
                      name="businessId"
                      type="text"
                      placeholder="my-business-001"
                      value={formData.businessId}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </FormFieldAnimation>

                {/* Submit Button */}
                <FormFieldAnimation delay={1.0}>
                  <Button
                    type="submit"
                    className="w-full transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <LoadingSpinner size={16} />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </FormFieldAnimation>
              </form>

              <FadeIn delay={1.1}>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-primary hover:underline transition-colors duration-300 hover:scale-105 inline-block"
                  >
                    Sign in
                  </Link>
                </div>
              </FadeIn>
            </CardContent>
          </Card>
        </SlideIn>
      </FadeIn>
    </div>
  );
}
