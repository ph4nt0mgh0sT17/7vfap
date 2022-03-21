const SearchBoxWalek = (props: any) => {
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
    )
};

export default SearchBoxWalek;