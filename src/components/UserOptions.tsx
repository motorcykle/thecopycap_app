"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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

export default function UserOptions ({ isCapStar }: { isCapStar: boolean }) {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

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

  return (
    <section className="">
      <h2>Choose between these Instagram users</h2>
      <section className=" space-x-3 space-y-3">
        {(isCapStar ? paidCelebs.concat(freeCelebs) : freeCelebs).map((celeb) => <Badge key={celeb}>@{celeb}</Badge>)}
      </section>

      {/* upgrade prompt */}
      {!isCapStar && <section className="mt-5 space-y-1">
        <Button onClick={handleSub} disabled={loading} variant={"secondary"}>Upgrade to CapStar <span className={`ml-1 ${loading && "animate-spin"}`}>⭐</span></Button>
        <p className=" max-w-xl text-muted-foreground text-xs">Become a CapStar member and get access to 10 more users ({paidCelebs.map((celeb, i) => <span key={celeb}>{`${celeb}${i !== paidCelebs.length-1 ? ", " : ""}`}</span>)}).</p>
      </section>}
    </section>
  )
}