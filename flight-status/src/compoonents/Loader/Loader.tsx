const Loader = ({loading}:{loading:boolean}) => {
    return (<>
        {loading && <div className="spinner-border text-info mx-auto p-5 m-5" role="status">
        </div>}
    </>)
}

export default Loader;