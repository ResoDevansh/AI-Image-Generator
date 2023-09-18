import FileSaver from "file-saver"
import { surpriseMePrompts } from "../constants/index"

const getRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]
    if(randomPrompt===prompt) return getRandomPrompt(prompt)
    return randomPrompt 
}

const downloadImage = async (_id,photo) => {
    FileSaver.saveAs(photo,`download-${_id}.jpg`)
}
// export async function downloadImage(_id, photo) {
    
// }
export { downloadImage,getRandomPrompt }
// export { getRandomPrompt }