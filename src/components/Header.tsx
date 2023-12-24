import { UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Header () {
  return <header className="w-full border-b">
    <nav className="max-w-6xl mx-auto flex p-5 justify-between items-center">
      <span className=" text-muted-foreground font-semibold">@copycap</span>

      <Button variant={"secondary"}>
        <UserButton />
      </Button>
    </nav>
  </header>
}