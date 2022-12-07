import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      {/* <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" /> */}

      {/* <FormGroup>
        <Label for="exampleSearch">Search</Label>
        <Input
          id="exampleSearch"
          name="search"
          placeholder="search placeholder"
          type="search"
        />
      </FormGroup> */}
    </form>
  );
};

export default Search;
