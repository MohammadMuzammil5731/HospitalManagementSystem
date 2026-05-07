import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  badge?: string;
  available?: string;
  className?: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon: Icon,
  title,
  description,
  details,
  action,
  badge,
  available,
  className = ""
}) => {
  return (
    <Card className={`shadow-md border-border hover:shadow-lg transition-smooth text-center ${className}`}>
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {details.map((detail, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {detail}
            </p>
          ))}
        </div>
        {action && (
          <Button 
            variant="outline" 
            className="w-full mb-2"
            onClick={action.onClick}
            asChild={!!action.href}
          >
            {action.href ? (
              <a href={action.href}>{action.label}</a>
            ) : (
              action.label
            )}
          </Button>
        )}
        {available && (
          <p className="text-sm text-muted-foreground">
            {available}
          </p>
        )}
        {badge && (
          <Badge variant="outline" className="mt-2 text-xs">
            {badge}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;
