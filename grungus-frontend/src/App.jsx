import Channelbar from "./components/ChannelBar";
import ContentContainer from "./components/ContentContainer";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex h-full min-h-screen">
      <SideBar />
      <Channelbar />
      <ContentContainer />
    </div>
  );
}

export default App;
