import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
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
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  description,
  details,
  action,
  badge,
  className = ""
}) => {
  return (
    <Card className={`shadow-md border-border hover:shadow-lg transition-smooth ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {badge && (
            <Badge variant="outline" className="text-xs">
              {badge}
            </Badge>
          )}
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
            className="w-full"
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
      </CardContent>
    </Card>
  );
};

export default ContactCard;
