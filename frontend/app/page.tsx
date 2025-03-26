import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
     <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <ClipboardList className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Manage Your Tasks with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            TaskMaster helps you organize your work and life. Create, track, and complete tasks efficiently with our intuitive interface.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/tasks">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Login
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-4">
                <div className="inline-block p-3 bg-primary/10 rounded-xl">
                  {feature.icon}
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


const features = [
  {
    title: 'Simple Task Management',
    description: 'Create, edit, and organize your tasks with our intuitive interface.',
    icon: <ClipboardList className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Track Progress',
    description: 'Monitor your task completion and stay on top of your goals.',
    icon: <ClipboardList className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Secure & Reliable',
    description: 'Your data is protected with industry-standard security measures.',
    icon: <ClipboardList className="h-6 w-6 text-primary" />,
  },
];