import './App.css'
import {
	Dialog,
	DialogDescription,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
	DialogContent, DialogFooter, DialogClose,
} from "@/components/ui/dialog.tsx";
import {Link} from "@/types.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import LinkCard from "@/components/LinkCard.tsx";
// import LinkCard from "@/components/LinkCard.tsx";

function App() {
	const [storedLinks, setStoredLinks] = useLocalStorage<Link[]>("links", []);
	
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	
	const [isOpen, setIsOpen] = useState<boolean>(false);
	
	const addLink = () => {
		const newLink: Link = {
			id: storedLinks.length + 1,
			title: title,
			description: description,
			url: url,
		};
		
		setStoredLinks([...storedLinks, newLink]);
	}
	
	return (
		<>
			<h1 className={"text-5xl font-bold"}>Save For Later</h1>
			
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger className={"mt-10"}>
					<Button>Add Link</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Link</DialogTitle>
					</DialogHeader>
					
					<DialogDescription className={"my-2"}>
						<Label htmlFor="title">Title</Label>
						<Input type="text" id="title" onChange={e => {setTitle(e.target.value)}}/>
						
						<Label htmlFor="description">Description (optional)</Label>
						<Textarea id="description" onChange={e => {setDescription(e.target.value)}}/>
						
						<Label htmlFor="url">URL</Label>
						<Input type={"text"} id="url" onChange={e => {setUrl(e.target.value)}} />
					</DialogDescription>
					
					<DialogFooter>
						<DialogClose>
							<Button variant={"destructive"}>Cancel</Button>
						</DialogClose>
						<Button onClick={() => {
							if (title && url) {
								addLink();
								setIsOpen(false);
							} else {
								alert("Please fill out all fields");
							}
						}}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			
			<div className={"grid grid-cols-3 gap-4 mt-10"}>
				{storedLinks.map(link => {
					return <LinkCard key={link.id} {...link} />
				})}
			</div>
		</>
	)
}

export default App
