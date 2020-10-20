import Account from "@/components/Windows/Account";
import Help from "@/components/Windows/Help";
import Library from "@/components/Windows/Library";
import SimpleFilm from "@/components/Windows/SimpleFilm";
import DragAndDropFilm from "@/components/Windows/DragAndDropFilm";
import Radio from "@/components/Windows/Radio";

let windowsThatWeSaved = [Account, Help, Library, SimpleFilm, DragAndDropFilm, Radio]
export let windowNamesThatWeSaved = windowsThatWeSaved.reduce((accumulator, window) => {accumulator.push(window.name); return accumulator}, [])

export default {windowsThatWeSaved, windowNamesThatWeSaved};