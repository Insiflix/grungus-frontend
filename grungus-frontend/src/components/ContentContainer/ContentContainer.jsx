import { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import { BsPlusCircleFill } from "react-icons/bs";
// import { useState } from 'react';

const ContentContainer = () => {
	const [messages, setMessages] = useState([
		{ username: "hans", text: "hi", time: "just now" },
	]);

	function enterMessage(text) {
		const updatedMessages = [
			...messages,
			{ username: "exampleUser", text, time: "new Date()" },
		];
		setMessages(updatedMessages);
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
