import { useEffect, useState, useRef, forwardRef } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import { BsPencil, BsTrash, BsHeart } from "react-icons/bs";
import { useSocket } from "../../tools/Socket";

const Message = ({ name, timestamp, text }) => {
	const [menu, setMenu] = useState({ visible: false, x: "0px", y: "0px" });
	const menuRef = useRef();

	const handleContextMenu = event => {
		event.preventDefault();

		setMenu({
			visible: true,
			x: `${event.clientX}px`,
			y: `${event.clientY}px`,
		});
	};

	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!menuRef.current.contains(target)) {
				setMenu({ visible: false, x: "0px", y: "0px" });
			}
		};

		document.addEventListener("mousedown", clickHandler);

		return () => {
			document.removeEventListener("mousedown", clickHandler);
		};
	});

	return (
		<div className={"post"} onContextMenu={handleContextMenu}>
			<ContextMenu
				ref={menuRef}
				visible={menu.visible}
				x={menu.x}
				y={menu.y}
				setMenu={setMenu}
			/>
			<div className="avatar-wrapper">
				<img
					src={`https://avatars.dicebear.com/api/open-peeps/${name}.svg`}
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

const ContextMenu = forwardRef(({ visible, x, y, setMenu }, ref) => {
	const options = [
		{
			text: "Like",
			onClick: () => {
				console.log("Like clicked");
				setMenu({ visible: false, x: "0px", y: "0px" });
			},
			icon: <BsHeart />,
		},
		{
			text: "Edit",
			onClick: () => {
				console.log("Edit clicked");
				setMenu({ visible: false, x: "0px", y: "0px" });
			},
			icon: <BsPencil />,
		},
		{
			text: "Delete",
			onClick: () => {
				console.log("Delete clicked");
				setMenu({ visible: false, x: "0px", y: "0px" });
			},
			icon: <BsTrash />,
		},
	];

	return (
		<div
			ref={ref}
			className={`context-menu ${visible ? "active" : ""}`}
			style={{
				top: y,
				left: x,
				position: "absolute",
				backgroundColor: "white",
				borderRadius: "10px",
				display: visible ? "block" : "none",
			}}>
			{options.map((option, index) => (
				<>
					<div
						key={index}
						className="context-menu-option"
						onClick={option.onClick}
						style={{
							padding: "10px",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
						}}>
						{option.icon}
						<span
							style={{
								marginLeft: "20px",
							}}>
							{option.text}
						</span>
					</div>
					{index < options.length - 1 && (
						<hr
							style={{
								width: "100%",
								borderTop: "1px solid black",
							}}
						/>
					)}
				</>
			))}
		</div>
	);
});

export default Message;
