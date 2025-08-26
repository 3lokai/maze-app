"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowRight, Play, Target, PartyPopper, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Queue Moves",
    description: "Plan your path by adding direction commands to your queue. Choose arrows and numbers to tell your player where to go!",
    icon: <ArrowUp className="w-8 h-8" />,
    visual: (
      <div className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-1">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ArrowUp className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-blue-600">2</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-2xl font-bold text-green-600">1</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <ArrowUp className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-2xl font-bold text-purple-600">3</span>
        </div>
      </div>
    ),
    color: "blue"
  },
  {
    id: 2,
    title: "Run Commands",
    description: "Click the Run button to execute your commands! Watch your player move step by step through the maze.",
    icon: <Play className="w-8 h-8" />,
    visual: (
      <div className="flex items-center justify-center space-x-4 p-4 bg-green-50 rounded-lg">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
          <Play className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <div className="text-sm text-green-600 font-medium">Executing...</div>
          <div className="text-xs text-green-500">Step 1 of 3</div>
        </div>
      </div>
    ),
    color: "green"
  },
  {
    id: 3,
    title: "Reach Goal",
    description: "Guide your player to the golden star! Avoid walls and plan your path carefully to reach the goal.",
    icon: <Target className="w-8 h-8" />,
    visual: (
      <div className="flex items-center justify-center space-x-4 p-4 bg-yellow-50 rounded-lg">
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div className="text-center">
          <div className="text-sm text-yellow-600 font-medium">Goal Reached!</div>
          <div className="text-xs text-yellow-500">🎉 Success!</div>
        </div>
      </div>
    ),
    color: "yellow"
  },
  {
    id: 4,
    title: "Celebrate Victory",
    description: "Congratulations! You've completed the maze! Enjoy the confetti celebration and try the next level.",
    icon: <PartyPopper className="w-8 h-8" />,
    visual: (
      <div className="flex items-center justify-center space-x-4 p-4 bg-purple-50 rounded-lg">
        <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
          <PartyPopper className="w-5 h-5 text-white" />
        </div>
        <div className="text-center">
          <div className="text-sm text-purple-600 font-medium">Victory!</div>
          <div className="text-xs text-purple-500">🎊 🎉 🎊</div>
        </div>
      </div>
    ),
    color: "purple"
  }
];

const colorClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700", 
  yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
  purple: "border-purple-200 bg-purple-50 text-purple-700"
};

export default function HelpPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Play Coding Maze
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn the basics of programming logic through fun maze challenges! 
            Follow these simple steps to guide your player to victory.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200",
                  index === currentStep
                    ? "bg-blue-600 scale-125"
                    : index < currentStep
                    ? "bg-blue-400"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Badge 
                variant="secondary" 
                className={cn("text-lg px-4 py-2", colorClasses[currentStepData.color as keyof typeof colorClasses])}
              >
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-3">
              <div className={cn("p-3 rounded-full", {
                "bg-blue-100 text-blue-600": currentStepData.color === "blue",
                "bg-green-100 text-green-600": currentStepData.color === "green", 
                "bg-yellow-100 text-yellow-600": currentStepData.color === "yellow",
                "bg-purple-100 text-purple-600": currentStepData.color === "purple"
              })}>
                {currentStepData.icon}
              </div>
              <span>{currentStepData.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              {currentStepData.description}
            </p>
            
            {/* Visual Demo */}
            <div className="flex justify-center">
              {currentStepData.visual}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-200",
                      index === currentStep
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Try It?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Now that you know how to play, jump into the game and start coding your way through the maze!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <Link href="/game">
                  <Play className="w-5 h-5 mr-2" />
                  Start Playing
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-3 text-lg font-semibold"
              >
                <Link href="/parents">
                  Learn More for Parents
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
