const MovieListHeadingWalek = (props: any) => {
    const CustomHeadingTag = `h${props.level}` as keyof JSX.IntrinsicElements;
    return (
        <div className="col">
            <CustomHeadingTag>{props.heading}</CustomHeadingTag>
        </div>
    )
};

export default MovieListHeadingWalek;