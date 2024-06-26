import BillingButton from '@/components/BillingButton'
import { Button } from '@/components/ui/button'
import { checkSubscription } from '@/lib/subscription'
import { auth, SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'
import { Banknote, MoveRight, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default async function Home() {
  const isCapStar = await checkSubscription()

  return (
    <main className='min-h-screen w-screen flex items-center justify-center p-5'>
      <section className='space-y-6 max-w-6xl mx-auto w-full border-l pl-5'>
        <section className='space-y-3'>
          <div className="flex space-x-3 items-center">
            <Image className=' rounded-md' width={100} height={100} alt='drake img' src={"/409834394_3650287001962383_3673418689182879727_n.webp"} />
            <h1 className='text-5xl md:text-7xl font-semibold'>Copy<span className=' text-muted-foreground'>Cap 🧢</span> </h1>
          </div>
          
          <p className=' text-sm md:text-lg font-medium text-muted-foreground'>"I’m trash at this sport but the drinks are hitting." - @champagnepapi. <br /> <span className=' text-secondary-foreground'>Have captions as "cool" as his or ... @beyoncé, @therock, @kyliejenner & more.</span> </p>
        </section>

        <section className='space-x-2 flex flex-col sm:flex-row space-y-2 items-center sm:space-y-0'>
          <SignedIn>
            <Button variant={"secondary"}>
              <UserButton afterSignOutUrl="/" />
            </Button>
            <Link prefetch={false} href={"/generate-cap"}>
              <Button>Generate caption <MoveRight/> </Button>
            </Link>
            <BillingButton isCapStar={isCapStar} />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>
                Log in to generate caption <Upload className='h-4 w-4 ml-1' />
              </Button>
            </SignInButton>
          </SignedOut>
        </section>

        
      </section>
    </main>
  )
}
