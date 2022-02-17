import { Search } from '@mui/icons-material';

function TopBar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">EducatBook</span>
      </div>
      <div className="topbarRight">
        <div className="searchbar">
          <Search />
          <input placeholder="Search for a post" className="searchInput" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;