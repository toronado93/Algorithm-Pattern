import { EventEmitter } from "events";
const emitter = new EventEmitter();

// Emitter Controllers
import serverRequestEmitMessager from "./serverRequestEmitMessager";

export { emitter, serverRequestEmitMessager };
