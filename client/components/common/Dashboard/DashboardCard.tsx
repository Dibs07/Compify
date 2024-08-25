import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function DashboardCard({ data }: { data: any }) {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/result/${data.id}`)
    }
    console.log(data);
    let chapters = "";
    data.content[0].chapters.forEach((ch: string) => chapters += ch + ", ");
    console.log(chapters)
    return (
        <div className="flex items-center justify-center rounded-xl bg-gray-100">
            <Card className='w-full h-full'>
                <CardHeader>
                    <CardTitle>{data.content[0].subject}</CardTitle>
                    <CardDescription>{data.content[0].exam}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        {chapters}
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
