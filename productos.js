const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.filePath = `./${this.fileName}`;
        this.data = (async () => {
            try {
                const readenFile = await fs.promises.readFile(this.filePath, 'utf-6');
                return JSON.parse(readenFile)
            } catch (err) {
                console.error(err.message)
                return []
            }
        })();
    }
    async write(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 3))
        } catch (error) {

        }
    }

    async save(obj) {
        const fileContent = await this.data
        let newId = fileContent.length + 1
        let newObj = { Id: newId, ...obj }
        fileContent.push(newObj)
        await this.write(fileContent)
        console.log(newObj.Id)
    }

    async getById(Id) {
        try {
            const fileContent = await this.data
            const theItem = fileContent.find(item => item.Id === Id);
            return (theItem)
        } catch (error) {
            console.log("Hubo un error al traer el objeto" + error)
        }
    }
    async getAll() {
        const fileContent = await this.data
        return (fileContent)
    }
    async deleteById(Id) {
        const fileContent = await this.data
        let notDeleted = fileContent.filter(item => item.Id !== Id)
        await this.write(notDeleted)
    }
    async deleteAll() {
        let newContent = []
        await this.write(newContent)
    }
}
module.exports = {
    Contenedor
}