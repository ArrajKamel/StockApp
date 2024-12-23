import React, { SyntheticEvent, ChangeEvent} from "react";
import "./Search.css"; // Assuming you have styles for dark mode

type Props = {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    handelSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<Props> = ({
                                     onSearchSubmit,
                                     search,
                                     handelSearchChange
}: Props): JSX.Element => {
    return (
        <>
            <form onSubmit={onSearchSubmit}>
                <input
                    value={search}
                    onChange={handelSearchChange}
                    placeholder="Search"
                />
            </form>
        </>
    );
};

export default Search;
