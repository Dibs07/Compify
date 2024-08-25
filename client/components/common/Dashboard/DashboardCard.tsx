import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardCard() {
  return (
    <div className="flex items-center justify-center inset-y-1/2 rounded-xl border-black border-2 bg-gray-100">
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
          <button className="px-4 py-2 text-white bg-black rounded-md">
            View Details
        </button>
        </CardFooter>
      </Card>
    </div>
  );
}
