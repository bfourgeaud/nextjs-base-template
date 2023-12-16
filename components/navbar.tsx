"use client"

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/navbar";

import { Divider } from "@nextui-org/divider";

import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { ReactNode, useReducer } from "react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react"

export const Navbar = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname()
	const session = useSession()

	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false)

	return (
		<NextUINavbar maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			{/* Left Content */}
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">ACME</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden md:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			{/* Right Content */}
			<NavbarContent
				className="hidden md:flex"
				justify="end"
			>
				<NavbarItem className="flex gap-2">
					<Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem>{searchInput}</NavbarItem>
				<NavbarItem>
					{children}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end" className="md:hidden">
				<ThemeSwitch />
				<NavbarMenuToggle icon={(isOpened) => isOpened ? <XMarkIcon width={24} /> : <Bars3CenterLeftIcon width={24} />} />
			</NavbarContent>

			{/* Mobile Menu */}
			<NavbarMenu>
				{searchInput}
				<ul className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navItems.map((item) => (
						<NavbarMenuItem key={item.href} isActive={pathname === item.href} onClick={() => setIsMenuOpen()} className="group">
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground", size: "lg" }),
									"group-data-[active=true]:text-primary group-data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarMenuItem>
					))}
				</ul>

				{session.status === "authenticated" && (
					<>
						<Divider />
						<ul className="mx-4 mt-2 flex flex-col gap-2">
							{siteConfig.navUserItems.map((item) => (
								<NavbarMenuItem key={item.href} isActive={pathname === item.href} onClick={() => setIsMenuOpen()} className="group">
									<NextLink
										className={cn(
											linkStyles({ color: "foreground", size: "lg" }),
											"group-data-[active=true]:text-primary group-data-[active=true]:font-medium"
										)}
										color="foreground"
										href={item.href}
									>
										{item.label}
									</NextLink>
								</NavbarMenuItem>
							))}
							<NavbarMenuItem onClick={() => signOut()}>
								<span className={cn("font-medium cursor-pointer", linkStyles({ color: "danger", size: "lg" }))}>SignOut</span>
							</NavbarMenuItem>
						</ul>
					</>
				)}
			</NavbarMenu>
		</NextUINavbar>
	);
};
