import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "./api";

const SocketContext = createContext({
	socket: io({ autoConnect: false }),
	connected: undefined,
	connect: _token => {},
});

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const socketInstance = io(SOCKET_URL);
		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!socket) return;

		socket.on("connect", () => {
			setConnected(true);
		});

		socket.on("disconnect", () => {
			setConnected(false);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, [socket]);

	return (
		<SocketContext.Provider value={{ socket, connected }}>
			{children}
		</SocketContext.Provider>
	);
};
