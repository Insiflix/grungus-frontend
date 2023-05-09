import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "./api";

const SocketContext = createContext({
	socket: null,
	connected: false,
});

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const socketInstance = io(SOCKET_URL, { autoConnect: false });

		socketInstance.on("connect", () => {
			setConnected(true);
		});

		socketInstance.on("disconnect", () => {
			setConnected(false);
		});

		socketInstance.on("connect_error", err => {
			console.log(`Connection Error: ${err.message}`);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, connected }}>
			{children}
		</SocketContext.Provider>
	);
};
