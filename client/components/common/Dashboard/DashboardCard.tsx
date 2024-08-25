import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function DashboardCard({data}:{data: any}) {
    const router = useRouter()
    const handleClick = ()=>{
        router.push(`/result/${data.id}`)
    }
    console.log(data);
  return (
    <div className="flex items-center justify-center rounded-xl bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>Card</CardTitle>
          <CardDescription>This is a description of the card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This is the content area where you can place any text, images, or other elements you'd like to display in the card.
          </p>
        </CardContent>
        <CardFooter>
          <button className="px-3 py-2 text-primary-700 font-bold border-2 border-primary-700 bg-white rounded-md"
           onClick={handleClick}>
            View Details
        </button>
        </CardFooter>
      </Card>
    </div>
  );
}
