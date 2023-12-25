"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ref, useRef, useState } from 'react'
import axios from 'axios'
import UserOptions, { UserChoice } from "./UserOptions"
import { Loader } from "lucide-react"

export default function GenerateCaptionForm({ isCapStar }: {isCapStar: boolean}) {
  const [aiResponse, setAIResponse] = useState("");
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const [userChoice, setUserChoice] = useState<UserChoice | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      console.log(userChoice, "***")
      const res = await axios.post("/api/openai", {
        image: base64,
        prompt: `Make me an Instagram caption for the image get inspired by ${userChoice?.name}, here are some example captions you could take inspiration from and find patterns if you need it and it makes sense: ${userChoice?.examples.join(" & ")} (you don't have to use these examples and don't use hashtags!)`
      })
      console.log(res.data.response.message.content)
      setAIResponse(res?.data?.response?.message?.content);
    } catch (error) {
      // alert(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>

      <UserOptions userChoice={userChoice} setUserChoice={setUserChoice} isCapStar={isCapStar} />

      <section className="space-y-3">
        <h2>Upload your image here</h2>

        <Input placeholder="image here" className='p-2 border-2' type="file" id="input" onChange={(e) => {
          if (e.target.files) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
              setBase64(reader.result);
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          } 
        }} />
      </section>

      {/* if you get ai response replace the button to it? */}
      <Button disabled={!(base64 && userChoice) || loading } onClick={handleSubmit}>{loading ? <Loader className="animate-spin" /> : "Generate caption"}</Button>

      {aiResponse && (
        <section className="space-y-3">
          <h2 className=" animate-pulse">Here's your generated caption 🎉</h2>
          <div className=" bg-violet-600 rounded-lg p-5 cursor-pointer" onClick={() => navigator.clipboard.writeText(aiResponse)}>
            <p className=" leading-10 text-3xl">{aiResponse}</p>
          </div>
          
        </section>
      )}
    </>
  )
}
