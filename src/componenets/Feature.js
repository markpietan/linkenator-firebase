import { Header, Segment, Ref, Transition } from "semantic-ui-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
const square = { width: 275, height: 275 };
const Feature = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
  });
  useEffect(() => {
    console.log(inView);
    if (inView) {
       setVisible(true) 
    }
  }, [inView]);
  const [visible, setVisible] = useState(true)
  return (
    <Ref innerRef={ref}>
        <Transition mountOnShow visible={visible} animation='scale' duration={500}>
      <Segment style={{visibility: "hidden"}} circular style={square} className="feature">
        <Header as="h2" className="featureTitle">
          Post links
          <Header.Subheader className="featureSubtitle">
            post any link on your account from any site on the web!
          </Header.Subheader>
        </Header>
      </Segment>
      </Transition>
    </Ref>
  );
};

export default Feature;
