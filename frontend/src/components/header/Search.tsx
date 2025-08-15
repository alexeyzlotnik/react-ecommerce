import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { SearchModal } from "../features/search/SearchModal";
import { useEffect, useState } from "react";

function Search() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Logic to check for the key combination
      if (event.metaKey && event.key === "k") {
        // Example: Ctrl + K
        event.preventDefault(); // Prevent default browser behavior if needed
        setOpen(prev => !prev); // Toggle visibility
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <InputGroup
        className="search"
        flex="1"
        startElement={<LuSearch />}
        endElement={<Kbd>⌘ K</Kbd>}
        onClick={() => setOpen(true)}>
        <Input
          placeholder="Search products"
          className="focus-none outline-none"
        />
      </InputGroup>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Search;
