import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div>
            <div className="flex justify-center p-10 items-center h-screen bg-[#FF6701]" >
                <div className="text-center">
                    <h1 className="text-6xl inria-sans-bold font-bold text-white">Welcome to Compify</h1>
                    <p className="text-3xl inria-sans-bold text-white">The best place to prepare for exams</p>
                    <div className="flex inria-sans-bold justify-center" style={{ marginTop: "1rem" }}>
                        <Link href={"/signup"}> <Button
                            size="lg"
                            color="white"
                            className="flex mr-1.5 items-center gap-3 justify-center inria-sans-bold"
                        >
                        Get Started
                        </Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero