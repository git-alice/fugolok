import Icon from "@/components/Elements/Icon/Icon";

import Account from "@/components/Windows/Account";
import Help from "@/components/Windows/Help";
import ExDropMe from "@/components/Windows/SimpleFilm";
import Library from "@/components/Windows/Library";
import DragAndDropFilm from "@/components/Windows/DragAndDropFilm";
import Radio from "@/components/Windows/Radio";

let yFirst = 10
let xFirst = 10
let step = 80

let icons = [
    {
        component: Icon,
        window: Account,
        src: require("@/assets/img/account.png"),
    },
    {
        component: Icon,
        window: Help,
        src: require("@/assets/img/net.png"),
    },
    {
        component: Icon,
        window: ExDropMe,
        src: require("@/assets/img/upload.png")
    },
    {
        component: Icon,
        window: Library,
        src: require("@/assets/img/folder.png")
    },
    {
        component: Icon,
        window: DragAndDropFilm,
        src: require("@/assets/img/upload.png")
    },
    {
        component: Icon,
        window: Radio,
        // src: require("@/assets/img/Volume Dialog.png")
    },
]

for(let i=0; i < icons.length; i++) {
    icons[i] = Object.assign(icons[i], {id: i, x: xFirst, y: yFirst + step*i})
}

export default icons;