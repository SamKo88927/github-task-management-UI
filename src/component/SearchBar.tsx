import "./searchBar.scss"
interface props {
  searchBar:string;
  setSearchBar: (value: any) => void;
  handleSearch:() => void;
}
const SearchBar = ({ searchBar,setSearchBar,handleSearch}:props ) => {
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setSearchBar(e.target.value)
  }

  return (
    <div className="headerSearchBar">
      <div className="SearchBarItem">
        <input
          value={searchBar}
          type="text"
          onChange={handleChange}
          placeholder='Search for titles and bodies of GitHub issues(DataBase)'
          className='SearchInput' />
      </div>
      <button className='SearchBarBtn' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar