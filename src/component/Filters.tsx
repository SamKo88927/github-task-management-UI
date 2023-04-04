import { TextField, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import "./filters.scss"
import { Link} from 'react-router-dom'
interface FilterSortSearchProps {
  filter: string;
  setFilter: (filter: string | any) => void;
  sort: string;
  setSort: (sort: string | any) => void;
  search: string;
  setSearch: (search: string) => void;
}

//改名叫功能bar

const Filters = ({ filter, setFilter, sort, setSort, search, setSearch }: FilterSortSearchProps) => {
  return (
    <div className="filters">
      <InputLabel className='inputLabel'>Filter</InputLabel>
      <Select
        labelId="filter-select-label"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className='filterSelect'
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <InputLabel className='inputLabel'>Sort</InputLabel>
      <Select
        labelId="sort-select-label"
        value={sort}
        className='filterSelect'
        onChange={(e) => setSort(e.target.value)}
      >
        <MenuItem value="Newest">Newest</MenuItem>
        <MenuItem value="Oldest">Oldest</MenuItem>
      </Select>
      <TextField
        id="search-input"
        className='searchInput'
        placeholder="Search Title or Body(below)" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <Link to="/create" style={{ textDecoration: "none", color: "inherit" }}>
        <Button variant="contained" className='filterButton' 
        >New Issue</Button>
        </Link>

    </div>
  )
}

export default Filters