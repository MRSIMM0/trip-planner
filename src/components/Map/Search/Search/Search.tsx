import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import Image from "next/image";
import useSearchBarStore from "@/store/searchBarStore";
import { useQuery } from "@tanstack/react-query";
import SearchItem from "./SearchItem/SearchItem";
import { ThreeDots } from "react-loader-spinner";
import useContextMenuStore from "@/store/contextMenuStore";

export default function Search() {
  const { close } = useSearchBarStore();
  const {close : closeContextMenu} = useContextMenuStore();
  const [inputValue, setInputValue] = useState("Colosseo, Rome");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(inputValue);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(inputValue);
    }, 500);
    

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    closeContextMenu();
  }, [])

  const { isPending, error, data } = useQuery({
    queryKey: ["locations", debouncedSearchTerm],
    queryFn: async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${debouncedSearchTerm}&format=jsonv2`
      );
      return res.json();
    },
    staleTime: 1000,
    enabled: !!debouncedSearchTerm,
  });



  return (
    <main onClick={() => close()} className={styles.search_main}>
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.input_group}
      >
        <input
          autoFocus
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.search_bar}
        />
        {/* <button className={styles.search_button}>
          <Image src="/search_icon.svg" alt="" fill />
        </button> */}
      </section>
      {inputValue && (
        <section
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={styles.options}
        >
          { isPending && (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#c7c7c7fd"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
          {error && <p>Error: {error.message}</p>}
          {data &&
            data.map((location, i) => <SearchItem key={i} item={location} />)}
          {data && data.length === 0 && <p>No results found</p>}
        </section>
      )}
    </main>
  );
}
