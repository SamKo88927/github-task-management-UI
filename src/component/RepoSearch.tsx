import { TextField } from '@material-ui/core'
import "./repoSearch.scss"

interface props {
  repoOptions: {
    user:string,
    repo:string
  },
  setRepoOptions: (value: any) => void;
}
const RepoSearch = ({ repoOptions, setRepoOptions }: props) => {
  return (
    <div className='SearchBar'>
      <div className="tag">
        Required
      </div>
      <TextField
        id="user"
        className='search-input'
        placeholder="Owner Name"
        value={repoOptions.user}
        onChange={(e) => setRepoOptions((prev: any) => ({ ...prev, [e.target.id]: e.target.value }))}
      />
      <TextField
        id="repo"
        className='search-input'
        placeholder="Repo Name"
        value={repoOptions.repo}
        onChange={(e) => setRepoOptions((prev: any) => ({ ...prev, [e.target.id]: e.target.value }))}
      />
    </div>

  )
}

export default RepoSearch