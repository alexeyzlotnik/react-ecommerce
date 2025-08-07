import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

function Search() {
  return (
    <InputGroup className="search" flex="1" startElement={<LuSearch />}>
      <Input placeholder="Search products" />
    </InputGroup>
  );
}

export default Search;
