import * as Qt from "@nodegui/nodegui";
import { MainWindow } from "./windows/MainWindow/MainWindow";

const win = new MainWindow();
win.show();

process.on(
    "unhandledRejection",
    console.error.bind(console, "Promise rejected.")
);

(global as any).win = win;

// @ts-ignore
global.Qt = Qt;
