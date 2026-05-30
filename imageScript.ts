import { exec } from "child_process";
// import animeghbkn from "./wallpaper/anime-wallpaper.jpg";
import path from "path"
import fs from "fs"

// interval in secs
const interval = 600;

// charging boolean
function checkLinuxCharging(): boolean {
    try {
        // Linux stores power supply data in the sysfs pseudo-filesystem
        const status = fs.readFileSync('/sys/class/power_supply/BAT0/status', 'utf8').trim();
        console.log(status)
        return status === 'Charging' || status === 'Full';
    } catch {
        // Fallback if your battery path is named differently (e.g., BAT1)
        return false;
    }
}

// random boolean
const random = true;

// get the path directory
const wallpapers = path.resolve("~/wallpaper"); // change wallpaper folder here

// read directory
const pictures = fs.readdirSync(wallpapers);

// math for randomly choosing image
const randomMath = () => {
    const numberPic = pictures.length - 1; // total index - 1 (0 - last)
    const numberSelectedPic = Number((Math.random() * numberPic).toFixed()); //random whole number
    const picture = pictures[numberSelectedPic]; //selected vaule with random index number

    return picture;
}

const randomPicSelection = () => {

    exec(`awww img ${wallpapers}/'${randomMath()}' --transition-type random --transition-fps 60`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        } if (stderr) {
            console.log(stderr);
            return;
        } else {
            console.log(stdout);
            return;
        }
    });

}

if (random) {

    randomPicSelection()

    setInterval(() => {

        if (checkLinuxCharging()) {
            randomPicSelection()
        }

    }, (interval * 1000))

} else {

    randomPicSelection()

}