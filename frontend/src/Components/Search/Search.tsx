import React, { SyntheticEvent, ChangeEvent } from "react";
import "./Search.css";

type Props = {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    handelSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<Props> = ({
                                     onSearchSubmit,
                                     search,
                                     handelSearchChange,
                                 }: Props): JSX.Element => {
    return (
        <section className="relative">
            <div className="max-w-4xl">
                <form
                    className="form md:flex-row md:space-y-0"
                    onSubmit={onSearchSubmit}
                >
                    <input
                        id="search-input"
                        placeholder="Search companies"
                        value={search}
                        onChange={handelSearchChange}
                    ></input>
                </form>
            </div>
        </section>
    );
};

export default Search;
