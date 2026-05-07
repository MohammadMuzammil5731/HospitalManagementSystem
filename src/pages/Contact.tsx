import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactCard, ContactFormCard, ContactInfoCard } from "@/components/contact";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  CheckCircle,
  Globe,
  Headphones
} from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const handleFormSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted:", data);
    // You can add your form submission logic here
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@medicarehospital.com", "support@medicarehospital.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Medical Center Drive", "Healthcare City, NY 10001"],
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
      description: "Eastern Time Zone"
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message and we'll respond quickly",
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Get help with technical issues and integrations",
      action: "Get Support",
      available: "24/7 Emergency"
    }
  ];

  const faqs = [
    {
      question: "How quickly can we get started with MediCare HMS?",
      answer: "Most hospitals can be up and running within 2-4 weeks, depending on the size and complexity of your requirements. We provide comprehensive onboarding and training."
    },
    {
      question: "Is MediCare HMS HIPAA compliant?",
      answer: "Yes, we are fully HIPAA compliant and maintain the highest standards of data security and privacy protection for all healthcare information."
    },
    {
      question: "Do you offer training for our staff?",
      answer: "Absolutely! We provide comprehensive training programs for all user roles, including hands-on sessions, documentation, and ongoing support."
    },
    {
      question: "Can MediCare HMS integrate with our existing systems?",
      answer: "Yes, our platform is designed to integrate with most existing healthcare systems including EHRs, lab systems, and billing software."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 technical support, regular system updates, training resources, and dedicated account managers for enterprise clients."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we provide mobile apps for iOS and Android that allow healthcare professionals to access key features on the go."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="h-4 w-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about MediCare HMS? Need support? Want to schedule a demo? 
              Our team is ready to assist you with all your healthcare technology needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the communication method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <ContactInfoCard
                key={index}
                icon={option.icon}
                title={option.title}
                description={option.description}
                details={[]}
                action={{
                  label: option.action,
                  onClick: () => console.log(`${option.action} clicked`)
                }}
                available={option.available}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactFormCard onSubmit={handleFormSubmit} />

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <ContactCard
                      key={index}
                      icon={info.icon}
                      title={info.title}
                      description={info.description}
                      details={info.details}
                    />
                  ))}
                </div>
              </div>

              <Card className="shadow-md border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Presence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">North America</span>
                      <span className="font-medium">50+ Hospitals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Europe</span>
                      <span className="font-medium">30+ Hospitals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asia Pacific</span>
                      <span className="font-medium">20+ Hospitals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Other Regions</span>
                      <span className="font-medium">10+ Hospitals</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about MediCare HMS
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="shadow-md border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of hospitals already using MediCare HMS to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <CheckCircle className="h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
