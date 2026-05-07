import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
}

interface ContactFormCardProps {
  onSubmit: (data: ContactFormData) => void;
  className?: string;
}

const ContactFormCard: React.FC<ContactFormCardProps> = ({ onSubmit, className = "" }) => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className={`shadow-md border-border ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Send us a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo">Request Demo</SelectItem>
                <SelectItem value="pricing">Pricing Information</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="integration">Integration Help</SelectItem>
                <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Enter subject"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Enter your message"
              rows={6}
              required
            />
          </div>

          <Button type="submit" variant="default" className="w-full gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactFormCard;
