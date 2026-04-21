import AutoSlider from "../components/common/AutoSlider";
import CommitmentCard from "../components/common/CommitmentCard";
import HomeHighlights from "../components/common/HomeHighlights";
import Info from "../components/common/Info";
import ServicesTestimonials from "../components/common/ServicesTestimonials";

const Home = () => {
  return (
    <div className="dirt-home">
      <AutoSlider />
      <HomeHighlights />
      <Info />
      <CommitmentCard />
      <ServicesTestimonials />
    </div>
  );
};

export default Home;
