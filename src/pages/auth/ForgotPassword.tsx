import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset email - Replace with actual implementation
    setTimeout(() => {
      setEmailSent(true);
      toast.success("Password reset instructions sent!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-hero rounded-xl shadow-md">
                {emailSent ? (
                  <Mail className="h-8 w-8 text-primary-foreground" />
                ) : (
                  <Activity className="h-8 w-8 text-primary-foreground" />
                )}
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl">
                {emailSent ? "Check Your Email" : "Forgot Password?"}
              </CardTitle>
              <CardDescription>
                {emailSent
                  ? "We've sent password reset instructions to your email"
                  : "Enter your email address and we'll send you reset instructions"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-input"
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-success-light rounded-lg text-center">
                  <p className="text-sm text-success-foreground">
                    If an account exists with {email}, you will receive password reset instructions
                    shortly.
                  </p>
                </div>
                <Link to="/auth/login">
                  <Button variant="outline" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
