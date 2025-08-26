"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Zap, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ParentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 {/* Header */}
         <div className="text-center mb-8">
           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
             For Parents
           </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about the educational benefits of Coding Maze and how it helps your child develop programming skills
          </p>
        </div>

        {/* Coming Soon Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Coming Soon
              </h2>
              <p className="text-gray-600">
                The parents section is currently under development. This will include detailed information about 
                the educational benefits, curriculum overview, and progress tracking features.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Educational Benefits Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Future Features */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Future Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Monitor your child's learning progress with detailed analytics and achievement tracking.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                  Curriculum Overview
                </h3>
                <p className="text-gray-600">
                  Access comprehensive curriculum guides and learning objectives for each programming concept.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                  Learning Insights
                </h3>
                <p className="text-gray-600">
                  Get personalized insights into your child's learning patterns and areas for improvement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Achievement System
                </h3>
                <p className="text-gray-600">
                  Celebrate milestones with badges and rewards that motivate continued learning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/game">
              Try the Game Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
