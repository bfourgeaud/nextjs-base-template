import { getCurrentUser } from "@/lib/utils";
import UserMenu from "./user-menu";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Profile() {
  const user = await getCurrentUser()

  if(!user) return (
    <Button as={Link} href="api/auth/signin" className={"text-sm font-normal"} variant="flat">
      Sign In
    </Button>
  )

  return <UserMenu user={user} />
}