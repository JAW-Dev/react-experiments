"use client"

import React, { useState } from 'react';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';


/**
 * DarkmodeToggle component allows toggling between light, dark, and system themes.
 * Uses the `next-themes` hook to manage theme state.
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional className to be applied to the component.
 */
const DarkmodeToggle: React.FC<DarkmodeToggleProps> = ({ className }) => {
	const { setTheme } = useTheme();
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	/**
	 * Toggles the dropdown menu visibility.
	 */
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	/**
	 * Closes the dropdown menu.
	 */
	const closeDropdown = () => {
		setDropdownOpen(false);
	};

	/**
	 * Handles theme change based on user selection.
	 * @param {string} theme - Theme name ('light', 'dark', 'system').
	 */
	const handleThemeChange = (theme: string) => {
		setTheme(theme);
		closeDropdown();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					aria-label="Toggle theme"
					onClick={toggleDropdown}
					tabIndex={0} // Make it focusable
					className={cn(className)}
				>
					<Sun
						className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${className}`}
						aria-hidden={!isDropdownOpen}
					/>
					<Moon
						className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${className}`}
						aria-hidden={isDropdownOpen}
					/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				role="menu"
				aria-hidden={!isDropdownOpen}
				onKeyDown={(e) => {
					if (e.key === 'Escape') closeDropdown();
				}}
			>
				<DropdownMenuItem onClick={() => handleThemeChange("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

/**
 * Props for the DarkmodeToggle component.
 */
interface DarkmodeToggleProps {
	className?: string;
}

export default DarkmodeToggle;