import Header from "@/components/Header"
import UserOptions from "@/components/UserOptions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkSubscription } from "@/lib/subscription"

const freeCelebs = [
  "kyliejenner",
  "kimkardashian",
  "centralcee",
  "bronny",
  "kaicenat"
]

const paidCelebs = [
  "lilbaby",
  "druski",
  "nickiminaj",
  "21savage",
  "polo.capalot",
  "beyonce",
  "travisscott",
  "champagnepapi",
  "kendalljenner",
  "vancityreynolds"
]

export default async function GenerateCaption() {
  const isCapStar = await checkSubscription()

  return <main className="min-h-screen w-screen ">
    <Header />

    <section className=" max-w-6xl w-full mx-auto p-5 space-y-8">
      
      <h1 className="underline text-2xl md:text-5xl font-semibold">Generate your caption</h1>
      {/* chooose celeb */}
      <UserOptions isCapStar={isCapStar} />

      {/* upload image */}
      <section className="space-y-3">
        <h2>Upload your image here</h2>
        <Input className="" type="file" placeholder="image here" />
      </section>

      {/* submit and get caption */}
      <Button >Generate caption</Button>

    </section>
  </main>
}

// use react-dropzone time [55:00] to upload img?