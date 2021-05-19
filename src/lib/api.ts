import fetch from "node-fetch";

// TODO: sanitize strings

export async function searchLyrics(
    artist: string,
    title: string
): Promise<string> {
    const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
    );
    const json = await response.json();

    return json["lyrics"];
}
