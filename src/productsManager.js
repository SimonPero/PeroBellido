import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
        this.id = 1
        try {
            const productsString = fs.readFileSync(this.path, "utf-8")
            const products = JSON.parse(productsString)
            this.products = products
            this.id = products.length + 1
        } catch (error) {
            return `Error reading products file: ${error}`
        }
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]');
            }
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            let content = JSON.parse(fileContent);
            if (content.some((item) => item.code == code)) {
                return `Error: Codigo ${code} repetido`;
            } else if (!title || !description || !price || !thumbnail || !code || !stock) {
                return "Error: todos los campos son requeridos";
            } else if (isNaN(Number(price)) || isNaN(Number(stock))) {
                return "Error: price and stock must be valid numbers";
            } else {
                const product = { title, description, price: Number(price), thumbnail, code, stock: Number(stock), id: this.id };
                content.push(product);
                this.id++;
                const productsString = JSON.stringify(content);
                await fs.promises.writeFile(this.path, productsString);
                return "Producto agregado con exito";
            }
        } catch (error) {
            console.error(`Error reading file at path ${this.path}: ${error}`);
            return null;
        }
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]');
            }
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error reading file at path ${this.path}: ${error}`);
            return null;
        }
    }
    async getProductById(id) {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]');
            }
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            let content = JSON.parse(fileContent);
            const product = content.find(p => p.id === id);
            if (product) {
                return product;
            } else {
                return "Error producto no encontrado"
            }
        } catch (error) {
            console.error(`Error reading file at path ${this.path}: ${error}`);
            return null;
        }
    }

    async updateProduct(id, campo) {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, "[]");
            }
            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            let content = JSON.parse(fileContent);

            const product = content.find((p) => p.id === id);
            const toUpdate = JSON.parse(campo);
            const otherProducts = content.filter((p) => p.id !== id);

            if (
                product === undefined ||
                Object.keys(product).length < 6 ||
                otherProducts.some((item) => item.code === toUpdate.code)
            ) {
                return (
                    "no hay ningun objeto con esta id, estas intentando añadir más campos de los permitidos o el codigo es el mismo al de otr producto"
                );
            } else {
                let toUpdateKeys = Object.keys(toUpdate);
                let productKeys = Object.keys(product);
                let productsIds = [];
                for (const item of content) {
                    productsIds.push(item.id);
                }
                let newId = 0;
                do {
                    newId = Math.round(Math.random() * 100);
                } while (productsIds.includes(newId));
                product.id = newId;
                for (let i = 0; i < productKeys.length; i++) {
                    if (productKeys.includes(toUpdateKeys[i])) {
                        product[toUpdateKeys[i]] = toUpdate[toUpdateKeys[i]];
                    }
                }
                const updatedProductsString = JSON.stringify(content);
                await fs.promises.writeFile(this.path, updatedProductsString);
                return "Producto cambiado correctamente";
            }
        } catch (error) {
            console.error(`Error reading file at path ${this.path}: ${error}`);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]');
            }
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            let content = JSON.parse(fileContent);
            const index = content.findIndex(p => p.id === id)
            if (index !== -1) {
                content.splice(index, 1)
                console.log(content)
                const updatedProductsString = JSON.stringify(content)
                await fs.promises.writeFile(this.path, updatedProductsString)
                return ("Eliminado correctamente")
            } else {
                return ("Esta Id no existe")
            }
        } catch (error) {
            console.error(`Error reading file at path ${this.path}: ${error}`);
            return null;
        }
    }
}

//module.exports = ProductManager
export default ProductManager



