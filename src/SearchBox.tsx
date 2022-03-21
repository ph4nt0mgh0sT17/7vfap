export interface SearchBoxProps {
    value: string;
    setSearchValue: (searchValue: string) => void;
}

const SearchBox = (props: SearchBoxProps) => {

    return (
        <>
            <div className="col col-sm-4">
                <input
                    className="form-control"
                    value={props.value}
                    onChange={(event) => props.setSearchValue(event.target.value)}
                    placeholder="Název filmu"
                />
            </div>
        </>
    );

}

export default SearchBox;