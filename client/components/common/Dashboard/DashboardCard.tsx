import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description of the card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This is the content area where you can place any text, images, or other elements you'd like to display in the card.
          </p>
        </CardContent>
        <CardFooter>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Action</button>
        </CardFooter>
      </Card>
    </div>
  );
}
