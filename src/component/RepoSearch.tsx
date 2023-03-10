import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import "./repoSearch.scss"
const RepoSearch = () => {
  const [repo, setRepo] = useState<null | string>(null);
  const [owner, setOwner] = useState<null | string>(null);

  return (
    <div className='SearchBar'>
      <div className="tag">
        Required
      </div>
      <TextField
        id="search-input"
        placeholder="Owner Name"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      /> /
      <TextField
        id="search-input"
        placeholder="Repo Name"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
    </div>

  )
}

export default RepoSearch