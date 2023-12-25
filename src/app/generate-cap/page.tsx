import Header from "@/components/Header"
import UserOptions from "@/components/UserOptions"
import { Button } from "@/components/ui/button"
import GenerateCaptionForm from "@/components/GenerateCaptionForm"

import { checkSubscription } from "@/lib/subscription"

export default async function GenerateCaption() {
  const isCapStar = await checkSubscription()

  return <main className="min-h-screen w-screen ">
    <Header />

    <section className=" max-w-6xl w-full mx-auto p-5 space-y-8">
      
      <h1 className="underline text-2xl md:text-5xl font-semibold">Generate your caption</h1>

      <GenerateCaptionForm isCapStar={isCapStar} />

    </section>
  </main>
}

// use react-dropzone time [55:00] to upload img?