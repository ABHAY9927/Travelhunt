import NavBar from "../NavBar/Navbar";
import HeroSection from "../Hero/HeroSection";
import FooterCon from "../Footer/FooterCon";
import Places from "../Places/Places";
import Hotels from "../Places/Hotels";


const Home = () => {
 
  return (
    <div className="dark:bg-slate-900">
      <NavBar />
      <HeroSection />
      <Places props={{ name: "Popular Places" }} />
      <Hotels />
      <FooterCon />
    </div>
  );
};

export default Home;
