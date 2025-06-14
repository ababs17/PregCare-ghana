
import { Heart, Users, MessageCircle, Shield, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Communities = () => {
  const peerCommunities = [
    {
      id: 1,
      name: "Expecting Mothers Ghana",
      description: "Connect with other pregnant mothers across Ghana sharing experiences and tips",
      members: 1240,
      category: "Peer Support",
      isActive: true
    },
    {
      id: 2,
      name: "New Moms Circle",
      description: "Support group for first-time mothers navigating pregnancy and early motherhood",
      members: 856,
      category: "Peer Support",
      isActive: true
    },
    {
      id: 3,
      name: "Pregnancy Journey Together",
      description: "Share your pregnancy milestones and celebrate with fellow mothers",
      members: 2104,
      category: "Peer Support",
      isActive: true
    }
  ];

  const healthCommunities = [
    {
      id: 4,
      name: "Prenatal Care Experts",
      description: "Q&A sessions with certified midwives and maternal health specialists",
      members: 3420,
      category: "Health Professional",
      isActive: true
    },
    {
      id: 5,
      name: "Nutrition During Pregnancy",
      description: "Expert advice on healthy eating and nutrition during pregnancy",
      members: 1890,
      category: "Health Professional",
      isActive: true
    },
    {
      id: 6,
      name: "Mental Health Support",
      description: "Professional counseling and mental health support for expectant mothers",
      members: 967,
      category: "Health Professional",
      isActive: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-yellow-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Pregnancy Communities</h1>
                <p className="text-sm text-gray-600">Connect, Share, and Get Support</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Join Our Supportive Communities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow mothers and healthcare professionals for guidance, 
            support, and shared experiences throughout your pregnancy journey.
          </p>
        </div>

        {/* Peer Support Communities */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <MessageCircle className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Peer Support Communities</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {peerCommunities.map((community) => (
              <Card key={community.id} className="border-2 border-purple-200 hover:border-purple-400 transition-colors duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {community.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {community.members.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-purple-800">{community.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health Professional Communities */}
        <section>
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Health Professional Communities</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthCommunities.map((community) => (
              <Card key={community.id} className="border-2 border-green-200 hover:border-green-400 transition-colors duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {community.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {community.members.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-green-800">{community.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              <span>Moderated Communities</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              <span>Safe & Supportive</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🇬🇭</span>
              <span>Ghana-focused</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Communities;
