import { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import { BsPlusCircleFill } from "react-icons/bs";
import { useSocket } from "../../tools/Socket";

const ContentContainer = () => {
	const [messages, setMessages] = useState([
		{ username: "hans", text: "hi", time: "just now" },
	]);
	let socketProvider = useSocket();
	console.log(socketProvider);

	useEffect(() => {
		if (socketProvider.connected) {
			socketProvider.socket.on("channelJoin", e => {
				console.log(e);
			});
			socketProvider.socket.on("message", message => {
				console.log(messages);
				setMessages(prevMessages => [
					...prevMessages,
					{
						username: message.authorName,
						text: message.content,
						time: message.createdAt,
					},
				]);
			});
			return () => {
				socketProvider.socket.off("channelJoin");
			};
		}
	}, [socketProvider.socket, socketProvider.connected]);

	function enterMessage(text) {
		socketProvider.socket.emit("message", {
			channel: "af3vasdad",
			content: text,
		});
	}

	return (
		<div className="content-container">
			{/* TopNavigation component */}
			<div className="content-list">
				{messages.map((message, key) => (
					<Post
						key={key}
						name={message.username}
						text={message.text}
						timestamp={message.time}
					/>
				))}
			</div>
			<BottomBar onSubmit={enterMessage} />
		</div>
	);
};

const BottomBar = ({ onSubmit }) => (
	<div className="bottom-bar">
		<PlusIcon />
		<input
			type="text"
			placeholder="Enter message..."
			className="bottom-bar-input"
			onKeyDown={event => {
				if (event.key !== "Enter") return;
				onSubmit(event.target.value);
				event.target.value = "";
			}}
		/>
	</div>
);

const Post = ({ name, timestamp, text }) => {
	const seed = Math.round(Math.random() * 100);
	return (
		<div className={"post"}>
			<div className="avatar-wrapper">
				<img
					src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
					alt=""
					className="avatar"
				/>
			</div>

			<div className="post-content">
				<p className="post-owner">
					{name}
					<small className="timestamp">{timestamp}</small>
				</p>
				<p className="post-text">{text}</p>
			</div>
		</div>
	);
};

const PlusIcon = () => (
	<BsPlusCircleFill
		size="22"
		className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
	/>
);

export default ContentContainer;
