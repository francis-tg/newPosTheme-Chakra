import {io} from "socket.io-client";
import {BaseURL} from "./common";
export const socket = io(BaseURL);
