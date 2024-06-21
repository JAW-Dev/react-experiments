import DarkmodeToggle from '@/components/darkmode-toggle';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';


/**
 * Footer component that displays copyright information and a DarkmodeToggle.
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional className to be applied to the footer.
 * @param {string} [props.toggleClassName] - Optional className to be applied to the DarkmodeToggle.
 */
const Footer = ({ className }: FooterProps) => {
	return (
		<footer>
			<Card className={cn("flex justify-between rounded-none border-0 border-t w-full p-4", className)} role="contentinfo">
				<div className="flex items-center"><span aria-hidden="true">&copy;</span> 2024 Admin Dashboard</div>
				<DarkmodeToggle className={className} />
			</Card>

		</footer>
	);
};

/**
 * Props for the Footer component.
 */
interface FooterProps {
	className: string;
}

export default Footer;