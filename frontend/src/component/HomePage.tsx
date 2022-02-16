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
      <h2>Home Page</h2>
    </div>
  );
}

export default HomePage;
