"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ref, useRef, useState } from 'react'
import axios from 'axios'
import UserOptions from "./UserOptions"

export default function GenerateCaptionForm({ isCapStar }: {isCapStar: boolean}) {
  const [aiResponse, setAIResponse] = useState("");
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const [userChoice, setUserChoice] = useState("")

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/vision", {
        image: base64,
        prompt: ``
      })
      console.log(res.data.response.message.content)
      setAIResponse(res?.data?.response?.message?.content);
    } catch (error) {
      // alert(error)
      console.log(error)
    }
  }

  return (
    <>

      <UserOptions isCapStar={isCapStar} />

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
      <Button disabled={!(base64 && userChoice)} onClick={handleSubmit}>Generate caption</Button>
    </>
  )
}
