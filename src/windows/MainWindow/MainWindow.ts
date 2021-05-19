import { QMainWindow, QStackedWidget, WidgetAttribute } from "@nodegui/nodegui";
import { MainView } from "../../views/MainView/MainView";

export class MainWindow extends QMainWindow {
    private root = new QStackedWidget(this);

    private mainView = new MainView();

    constructor() {
        super();
        this.initializeWindow();
    }

    protected initializeWindow() {
        this.setWindowTitle("Lyrium");
        this.setObjectName("RootWindow");
        this.setMinimumSize(400, 600);
        this.setAttribute(WidgetAttribute.WA_AlwaysShowToolTips, true);
        this.setCentralWidget(this.root);

        this.root.addWidget(this.mainView);

        this.root.setCurrentWidget(this.mainView);
    }
}
