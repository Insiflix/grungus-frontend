import Channelbar from "./components/ChannelBar/ChannelBar";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import SideBar from "./components/SideBar/SideBar";
import { SocketProvider } from "./tools/Socket";

function App() {
	return (
		<div className="flex h-full min-h-screen">
			<SideBar />
			<Channelbar />
			<ContentContainer />
		</div>
	);
}

function AppWithSockets() {
	return (
		<SocketProvider>
			<App />
		</SocketProvider>
	);
}

export default AppWithSockets;
