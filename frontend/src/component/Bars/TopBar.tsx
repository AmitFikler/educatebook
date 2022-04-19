import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logo">
          EducateBook
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
