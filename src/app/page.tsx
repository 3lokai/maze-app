"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Brain, Target, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            {/* Hero Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Teach coding through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                play
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A fun, interactive maze game that builds programming logic and problem-solving skills
            </p>

            {/* Split CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Start playing the coding maze game"
              >
                                 <Link href="/game">
                   <Play className="w-5 h-5 mr-2" />
                   Play Now
                   <ArrowRight className="w-4 h-4 ml-2" />
                 </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Learn more about the educational benefits for parents"
              >
                                 <Link href="/parents">
                   <Users className="w-5 h-5 mr-2" />
                   For Parents
                   <ArrowRight className="w-4 h-4 ml-2" />
                 </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Game Screenshot with Confetti */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative">
                {/* Placeholder for game screenshot */}
                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Interactive Maze Game</p>
                    <p className="text-sm text-gray-500">Program your way to the goal!</p>
                  </div>
                </div>

                {/* Confetti Animation */}
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
                    <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Coding Maze?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our game transforms complex programming concepts into engaging, visual experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit 1: Logical Thinking */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Logical Thinking
              </h3>
              <p className="text-gray-600">
                Develop step-by-step problem-solving skills through visual programming sequences
              </p>
            </CardContent>
          </Card>

          {/* Benefit 2: Patience & Resilience */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Patience & Resilience
              </h3>
              <p className="text-gray-600">
                Learn to persevere through challenges and celebrate small victories
              </p>
            </CardContent>
          </Card>

          {/* Benefit 3: Programming Fundamentals */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Programming Fundamentals
              </h3>
              <p className="text-gray-600">
                Master sequencing, loops, and conditional logic in a fun, visual environment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Perfect for Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🎯 Visual Programming
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🎮 Interactive Gameplay
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📊 Progress Tracking
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🏆 Achievement System
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              ♿ Accessibility First
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📱 Responsive Design
            </Badge>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start coding?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of kids learning programming through play
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Start your coding journey now"
          >
                         <Link href="/game">
               <Play className="w-5 h-5 mr-2" />
               Start Learning Now
               <ArrowRight className="w-4 h-4 ml-2" />
             </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
