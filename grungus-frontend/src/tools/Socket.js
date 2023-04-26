import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "./api";

const config = {
	transports: ["websocket"],
};

const SocketContext = createContext({
	socket: io({ autoConnect: false }),
	connected: undefined,
	connect: _token => {},
});

export const Socket = ({ children }) => {
	const [socket, setSocket] = useState(io({ autoConnect: false }));
	const [initialized, setInitialized] = useState(false);
	const [connected, setConnected] = useState(undefined);

	useEffect(() => {
		if (socket) {
			socket.on("connect", () => {
				console.log("Connected to " + SOCKET_URL + " as " + socket.id);
				setConnected(true);
			});
			socket.on("disconnect", () => {
				console.log("disconnected");
				setConnected(false);
			});
		}
	}, [socket]);

	const memo = useMemo(() => {
		return {
			socket,
			connected,
			connect: _token => {
				setSocket(prevSocket => {
					// Use functional update to avoid circular dependency
					const newSocket = io(SOCKET_URL, {
						...config,
						auth: {
							token: "valid",
						},
					});
					setInitialized(true);
					return newSocket;
				});
			},
		};
	}, [connected]);

	return (
		<SocketContext.Provider value={memo}>{children}</SocketContext.Provider>
	);
};
