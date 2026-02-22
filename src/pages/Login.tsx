import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Zap, title: 'Fast Pipeline', desc: 'Track leads from first contact to conversion' },
  { icon: Shield, title: 'Secure Access', desc: 'JWT-based admin authentication' },
  { icon: BarChart3, title: 'Analytics', desc: 'Real-time insights and conversion metrics' },
];

const Login = () => {
  const [email, setEmail] = useState('admin@crm.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email === 'admin@crm.com' && password === 'admin123') {
        login('mock-jwt-token-xyz', email);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Login failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="hidden w-1/2 relative overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center gradient-dark">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md px-8 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-[0_0_30px_hsl(173,58%,45%,0.3)]">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            LeadFlow
          </h1>
          <p className="mt-2 text-lg font-light text-white/60">
            Client Lead Management System
          </p>

          <div className="mt-12 space-y-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left"
              >
                <div className="rounded-lg bg-primary/20 p-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">LeadFlow</h1>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your admin account</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-secondary/50 border-border focus:bg-card transition-colors"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-secondary/50 border-border focus:bg-card transition-colors"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 gap-2 font-semibold text-sm" disabled={loading}>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-muted/50 border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Demo credentials: <span className="font-mono text-card-foreground">admin@crm.com</span> / <span className="font-mono text-card-foreground">admin123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
