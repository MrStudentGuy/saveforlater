import {Link} from "@/types.ts";
import {Card, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {useLocalStorage} from "@uidotdev/usehooks";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";

const LinkCard = (props :Link) => {
	const [storedLinks, setStoredLinks] = useLocalStorage<Link[]>("links", []);
	
	
	return (
		<Card className={"w-80"}>
			<CardHeader className={"flex flex-row justify-between items-center"}>
				<h1 className={"text-2xl font-bold"}>{props.title}</h1>
				
				<Button variant={"outline"} onClick={() => {
							const newLinks = storedLinks.filter(link => link.id !== props.id);
							setStoredLinks(newLinks);
						}}
						size={"icon"}
				>
					<X />
				</Button>
			</CardHeader>
			
			<p>{props.description}</p>
			
			<CardFooter>
				<a href={props.url} className={"text-blue-600 underline"}>{props.url}</a>
			</CardFooter>
		</Card>
	);
};

export default LinkCard;