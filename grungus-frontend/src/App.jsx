import Channelbar from "./components/ChannelBar/ChannelBar";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import SideBar from "./components/SideBar/SideBar";
// import { Socket } from "./tools/Socket";

function App() {
	return (
		<div className="flex">
			<SideBar />
			<Channelbar />
			<ContentContainer />
		</div>
	);
}

export default App;
