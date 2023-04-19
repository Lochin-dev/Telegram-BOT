import fs from 'fs'


const read_file = (file_name) => {
    return JSON.parse(fs.readFileSync(`./model/${file_name}`, 'utf-8'))
}

const write_file = (file_name, data) => {
    return fs.writeFileSync(`./model/${file_name}`, JSON.stringify(data, null, 4))
}


export {
    read_file,
    write_file
}