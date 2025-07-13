import { Award, Briefcase, MessageSquare, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    title: 'Post Opportunities',
    description: 'Share your project ideas or job openings with a vibrant community of skilled students.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'Find Collaborators',
    description: 'Discover talented students from various fields to join your team and create something amazing.',
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    title: 'Earn Badges',
    description: 'Showcase your skills and contributions by earning badges for your achievements on projects.',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-accent" />,
    title: 'Real-time Messaging',
    description: 'Communicate seamlessly with your team members through our integrated messaging system.',
  },
];

const FeatureHighlights = () => {
  return (
    <section id="features" className="py-12 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A powerful suite of tools designed for student innovation and teamwork.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
