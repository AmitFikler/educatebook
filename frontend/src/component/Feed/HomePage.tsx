import SideBarComp from '../Bars/SideBar';
import '../../styles/homepage.css';
import TopBar from '../Bars/TopBar';
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
