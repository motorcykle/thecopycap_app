import { UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header () {
  return <header className="w-full border-b">
    <nav className="max-w-6xl mx-auto flex p-5 justify-between items-center">
      <Link href={"/"} prefetch={false} className=" text-muted-foreground font-semibold">@copycap</Link>

      <Button variant={"secondary"}>
        <UserButton afterSignOutUrl="/" />
      </Button>
    </nav>
  </header>
}