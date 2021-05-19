import {
    Direction,
    FlexLayout,
    QBoxLayout,
    QDialog,
    QLabel,
    QLineEdit,
    QPushButton,
    QTextBrowser,
    QWidget,
} from "@nodegui/nodegui";
import { readFile } from "fs/promises";
import path from "path";
import { searchLyrics } from "../../lib/api";

export class MainView extends QWidget {
    private centralWidget = new QWidget();

    private rootLayout = new FlexLayout();

    private artistNameLabel = new QLabel();

    private songNameLabel = new QLabel();

    private artistName = new QLineEdit();

    private songName = new QLineEdit();

    private searchButton = new QPushButton();

    private lyricsPanel = new QTextBrowser();

    private mainLayout = new QBoxLayout(Direction.TopToBottom);

    constructor() {
        super();
        this.setObjectName("MainView");
        this.setLayout(this.rootLayout);
        this.rootLayout.setSpacing(0);
        this.rootLayout.setContentsMargins(0, 0, 0, 0);
        this.mainLayout.setSpacing(0);
        this.mainLayout.setContentsMargins(0, 0, 0, 0);
        this.centralWidget.setLayout(this.mainLayout);
        this.centralWidget.setMinimumSize(0, 0);

        this.loadStyles();
        this.initView();
        this.handleClick();
    }

    private initView() {
        const {
            centralWidget,
            rootLayout,
            artistNameLabel,
            songNameLabel,
            artistName,
            songName,
            searchButton,
            lyricsPanel,
        } = this;

        centralWidget.setObjectName("myroot");
        centralWidget.setMinimumSize(500, 600);

        artistNameLabel.setObjectName("artistlabel");
        artistNameLabel.setText("Artist");

        songNameLabel.setObjectName("songlabel");
        songNameLabel.setText("Song");

        searchButton.setText("Search");

        lyricsPanel.setText("");
        lyricsPanel.setMinimumSize(400, 400);

        rootLayout.addWidget(artistNameLabel);
        rootLayout.addWidget(artistName);
        rootLayout.addWidget(songNameLabel);
        rootLayout.addWidget(songName);
        rootLayout.addWidget(searchButton);
        rootLayout.addWidget(lyricsPanel);
    }

    private handleClick() {
        this.searchButton.addEventListener("clicked", async () => {
            try {
                this.lyricsPanel.setText("Searching for lyrics...");

                const lyrics = await searchLyrics(
                    this.artistName.text(),
                    this.songName.text()
                );

                this.lyricsPanel.setText(lyrics);
            } catch (e) {
                this.lyricsPanel.setText(
                    "Error while searching, please try again."
                );
            }
        });
    }

    private async loadStyles() {
        const stylePath = path.join(
            __dirname,
            "..",
            "src",
            "views",
            "MainView",
            "MainView.css"
        );

        try {
            let stylesheet = await readFile(stylePath, "utf8");

            this.setStyleSheet(stylesheet);
        } catch (e) {
            console.log("Couldn't load the stylesheet.", e);
        }
    }
}
