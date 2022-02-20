import SideBarComp from './SideBar';
import '../styles/homepage.css';
import TopBar from './TopBar';
import Feed from './Feed';
function HomePage() {
  return (
    <div>
      <TopBar />
      <div className="homeContainer">
        <SideBarComp />
        <Feed />
      </div>
    </div>
  );
}

export default HomePage;
