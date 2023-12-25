"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const freeCelebs = [
  { name: "kyliejenner", examples: ["we couldn’t find kimberly", "mommy nights are the best nights 🖤", "🍷🍝🇮🇹🤍🤍🤍"] },
  { name: "kimkardashian", examples: ["MISSING LA NIGHTS WITH YOU 📸", "3 tequilas with pineapple", "All that glitters is gold"] },
  { name: "centralcee", examples: ["there’s truth in the lies", "Midnight…", "London, United Kingdom"] },
  { name: "bronny", examples: ["living life bro i’m happy, nun more nun less.", "bronald mcdonald 🍔", "stay sane kid🖤"] },
  { name: "kaicenat", examples: ["Favorite Day Of The Year🥳", "I’ve Been Good , How About You?", "邪魔されない"] }
]

const paidCelebs = [
  { name: "lilbaby", examples: ["Rule #4 Don’t Be Scared To Fail , You Fail If Youn Try !!", "Don’t Mind Me I’m Just Living Finishing Up The Album 😤", "I’m Getting Older Now My Young 🥷Run Shit , I Handle Business !!"] },
  { name: "druski", examples: ["This new generation of rappers are ALL Demonic 👹😂😂😂😂😂😂😂", "I like my women TWICE my age", "Druski not Drewski 🫡"] },
  { name: "nickiminaj", examples: ["B!Ches Jackin. I’m still Queenin", "YSL BARBIE", "It Girl"] },
  { name: "21savage", examples: ["Got tired of the sister loc comments", "Gooooooooooo", "remember who y’all talking to"] },
  { name: "polo.capalot", examples: ["Inevitable🥇🏃🏾‍♂️", "All dat Fake Love It Was Surroundin’ Me My Trust Ran Out & D!ed🚶🏾‍♂️❤️‍🩹✌🏾#HitsPending🔥 #FreeTrench🩸🫶🏾", "Stop lookin up to n!ggas w fame and shift yo focus to who you really wanna be 💫💫💯"] },
  { name: "beyonce", examples: ["My H-Town sister, thank you for gracing the RENAISSANCE TOUR. Until next time.", "Be careful what you ask for, ‘cause I just might comply. Tickets on sale now, in theaters 12.01.", "My beautiful first born 🙏🏾 I’m so proud and thankful to be your mama. You bring us so much joy, my sweet angel."] },
  { name: "travisscott", examples: ["MSG WAS A BIT EXPLOSIVE I MEANNNNNNN I THINK WE SHOOK THE MOON", "We told em Medium welll closer to the well Then went and hit the moada", "Dreams can come true."] },
  { name: "champagnepapi", examples: ["Mr. Big Dreams", "Head shot pls and thank you @leonedwardsmma", "All that time you spent trying to convince your followers you’re a leader could have went to something much realer…"] },
  { name: "kendalljenner", examples: ["turning into an (818) espresso martini", "what’s meant for me, will simply find me", "gnight"] },
  { name: "vancityreynolds", examples: ["Did @Dogpool save the day? Not a chance in gremlin hell. But she IS currently causing the Disney plushy merch department nightmares. Coming with the movie, Summer 2024 🐶💩L", "Happy Birthday to the inimitable and stunning Sandra Bullock! For your birthday this year, I got us both intimacy coordinators. And an HR department. And clothing?", "The rumors stop here. Will Ferrell and I did NOT lip sync our dancing in Spirited. Tomorrow’s trailer will settle it."] }
]

export type UserChoice = {
  name: string;
  examples: string[]
}

export default function UserOptions ({ isCapStar, setUserChoice, userChoice }: { isCapStar: boolean, setUserChoice: Dispatch<SetStateAction<UserChoice | null>>, userChoice: UserChoice | null }) {
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

  const handleOption = (celeb: UserChoice) => {
    setUserChoice(celeb)
  }

  return (
    <section className="">
      <h2>Choose between these Instagram users</h2>
      <section className=" space-x-3 space-y-3">
        {(isCapStar ? paidCelebs.concat(freeCelebs) : freeCelebs).map((celeb) => <Badge className={`cursor-pointer tracking-wide ${userChoice?.name?.includes(celeb.name) && " animate-pulse border-gray-100 border-2 border-dashed bg-violet-900"}`} onClick={() => handleOption(celeb)} key={celeb.name}>@{celeb.name}</Badge>)}
      </section>

      {/* upgrade prompt */}
      {!isCapStar && <section className="mt-5 space-y-1">
        <Button onClick={handleSub} disabled={loading} variant={"secondary"}>Upgrade to CapStar <span className={`ml-1 ${loading && "animate-spin"}`}>⭐</span></Button>
        <p className=" max-w-xl text-muted-foreground text-xs">Become a CapStar member and get access to 10 more users ({paidCelebs.map((celeb, i) => <span key={celeb.name}>{`${celeb.name}${i !== paidCelebs.length-1 ? ", " : ""}`}</span>)}).</p>
      </section>}
    </section>
  )
}