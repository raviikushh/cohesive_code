import { Button } from "@nextui-org/react";
import Layout from "../layout/Layout";
import Icon from "../shared/Icon";
import HeroSvg from "../../assets/hero.svg";
import { useNavigate } from "react-router-dom";
import useAuthState from "../../hooks/useAuthState";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuthState();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Layout>
      <div className="flex items-center pt-32">
        <div>
          <h1 className="text-6xl font-extrabold">
            <span className="text-secondary-500">Code Together,</span> <br />
            <span className="">Build Better</span>
          </h1>
          <h6 className="text-xl text-default-500 max-w-2xl mt-4">
            The collaborative coding platform that brings teams together to
            create amazing software.
          </h6>
          <Button
            onClick={handleGetStarted}
            className="mt-4"
            size="lg"
            color="primary"
          >
            Get Started <Icon name="arrow-right" />
          </Button>
        </div>
        <div>
          <img src={HeroSvg} alt="Hero" className="w-[500px] h-[500px] ml-8" />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
