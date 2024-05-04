/**
 * @file Renders a loader component, which displays a loading animation while the
 * application is fetching data.
 * 
 * @module Loader
 * @returns {JSX.Element} The rendered loader component.
 */
// Assets
import video from "../../assets/loader.mp4"

const Loader = () => {
  return (
    <div>
      <h2>LOADING</h2>
      <video src={video} autoPlay={true} loop={true} muted={true} height="500px" width="700px"/>
    </div>
  );
};

export default Loader;