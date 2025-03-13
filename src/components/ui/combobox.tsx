"use client";

import { CommandList } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type ComboboxProps = {
	options: { value: string; label: string }[];
	emptyText?: string;
	placeholder?: string;
	searchPlaceholder?: string;
	onChange: (value: string) => void;
};

export function Combobox({
	options,
	emptyText = "No options found",
	placeholder = "Select option...",
	searchPlaceholder = "Search option...",
	onChange,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="noShadow"
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? options.find((option) => option.value === value)?.label
						: placeholder}
					<ChevronsUpDown color="black" className="ml-2 h-4 w-4 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] !border-0 p-0 font-base">
				<Command>
					<CommandList>
						<CommandInput placeholder={searchPlaceholder} />
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup className="max-h-[300px] overflow-y-auto">
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
										onChange(currentValue);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
