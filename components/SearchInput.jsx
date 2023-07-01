import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import IconSearch from '../../../../assets/images/reskin-images/icon--search.svg';
import IconX from '../../../../assets/images/reskin-images/icon--x.svg';

const SearchInput = ({ searchQuery, setSearchQuery, className, active }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`px-4 py-3 flex items-center bg-white-faint rounded-2lg border-2 ${className} ${
        active || isFocused ? ' border-purple bg-white' : 'bg-white-faint'
      }`}
    >
      <SVG
        src={IconSearch}
        className={`mr-2 search-input-icon ${
          (active || isFocused) && 'search-input-icon--active'
        }`}
      />
      <input
        className={`${
          active || isFocused ? 'bg-white' : 'bg-white-faint'
        }  focus:outline-none`}
        type="text"
        id="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search"
      />

      {active && searchQuery !== '' && (
        <button type="button" onClick={() => setSearchQuery('')}>
          <SVG src={IconX} />
        </button>
      )}
    </div>
  );
};
export default SearchInput;
