"use client"

import { Banknote } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import React from "react"

export default function BillingButton({
  isCapStar
}: {
  isCapStar: boolean
}) {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleBilling = async () => {
    try {
      setLoading(true)

      const res = await axios.get("/api/stripe")
      router.push(res.data.url)

      console.log(res)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleBilling} disabled={!isCapStar || loading} variant={"outline"}>Billing <Banknote className='ml-2' /></Button>
  )
}