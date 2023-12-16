"use client"

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { User } from "next-auth";
import { signOut } from "next-auth/react"
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";

interface UserMenuProps {
  user: User
}

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          showFallback
          as="button"
          className="transition-transform"
          src={user.image || undefined}
          name={user.name || "avatar"}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection title={user.email || undefined}>
          {siteConfig.navUserItems.map((item, index) => (
            <DropdownItem key={`${item.label}-${index}`} href={item.href}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection aria-label="actions">
          <DropdownItem key="logout" onClick={() => signOut()}>
            <span className={linkStyles({ color: "danger" })}>Sign Out</span>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

