
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Baby, Phone, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Log Health Data",
      color: "from-red-400 to-pink-500",
      link: "/health-monitoring"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Track Cycle",
      color: "from-purple-400 to-indigo-500",
      link: "/cycle-tracking"
    },
    {
      icon: <Baby className="w-5 h-5" />,
      label: "Pregnancy Care",
      color: "from-pink-400 to-rose-500",
      link: "/pregnancy-care"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Emergency",
      color: "from-red-500 to-orange-500",
      link: "/emergency-contacts"
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Community",
      color: "from-green-400 to-teal-500",
      link: "/communities"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-orange-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {actions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Button
                variant="outline"
                className={`w-full h-16 flex flex-col items-center justify-center bg-gradient-to-br ${action.color} text-white border-none hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg`}
              >
                {action.icon}
                <span className="text-xs mt-1 font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
