import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import TldrawComponent from "./TldrawComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [temp, setTemp] = useState(0);
  const [noOfTimelines, setNoOfTimelines] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "c") {
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNoOfTimelines(temp);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-2 h-[50px]">
        <h1 className="text-2xl font-bold">TLDraw Canvas:</h1>
        <Button onClick={() => setIsOpen(true)} size="sm">
          Create Timeline
        </Button>
      </nav>
      <TldrawComponent noOfTimelines={noOfTimelines} />
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Timeline</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={temp}
              onChange={(e) => setTemp(+e.target.value)}
              placeholder="No. of timelines you want to create"
              type="number"
            />
            <Button type="submit" className="w-full">
              Generate
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
