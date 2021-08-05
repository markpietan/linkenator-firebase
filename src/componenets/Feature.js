import { Header, Segment, Ref } from "semantic-ui-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Feature = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
  });
  useEffect(() => {
    if (inView) {
      setAnimationClass("fadeLeft");
    }
  }, [inView]);
  const [animationClass, setAnimationClass] = useState("");
  return (
    <Ref innerRef={ref}>
      <Segment
        circular
        // style={square}
        className={`feature ${animationClass}`}
      >
        <Header as="h2" className="featureTitle">
          Post links
          <Header.Subheader className="featureSubtitle">
            post any link on your account from any site on the web!
          </Header.Subheader>
        </Header>
      </Segment>
    </Ref>
  );
};

export default Feature;
