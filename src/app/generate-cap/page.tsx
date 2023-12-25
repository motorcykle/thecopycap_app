"use client"

import Header from "@/components/Header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkSubscription } from "@/lib/subscription"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

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

export default function GenerateCaption() {
  const [loading, setLoading] = React.useState(false)
  const [isSubbed, setIsSubbed] = React.useState(false);
  const router = useRouter()

  async function checkSub() {
    // const res = await checkSubscription();
    // console.log(res)
  }

  React.useEffect(() => {
    // checkSub()
  }, [])

  const handleSub = async () => {
    try {
      setLoading(true)

      const res = await axios.get("/api/stripe")
      router.push(res.data.url)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  

  return <main className="min-h-screen w-screen ">
    <Header />

    <section className=" max-w-6xl w-full mx-auto p-5 space-y-8">
      
      <h1 className="underline text-2xl md:text-5xl font-semibold">Generate your caption</h1>
      {/* chooose celeb */}
      <section className="">
        <h2>Choose between these Instagram users</h2>
        <section className=" space-x-3 space-y-3">
          {(false ? paidCelebs.concat(freeCelebs) : freeCelebs).map((celeb) => <Badge>@{celeb}</Badge>)}
        </section>

        {/* upgrade prompt */}
        {true && <section className="mt-5 space-y-1">
          <Button onClick={handleSub} disabled={loading} variant={"secondary"}>Upgrade to CapStar <span className={`ml-1 ${loading && "animate-spin"}`}>⭐</span></Button>
          <p className=" max-w-xl text-muted-foreground text-xs">Become a CapStar member and get access to 10 more users ({paidCelebs.map((celeb, i) => `${celeb}${i !== paidCelebs.length-1 ? ", " : ""}`)}).</p>
        </section>}
      </section>

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