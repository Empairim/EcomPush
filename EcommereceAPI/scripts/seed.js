
//note: to run this file, the server needs to be running
//```
//node ./path/seed.js /path/to/json/dir fresjwt token
//```
const { readFile } = require('fs');

const [, , path, token] = process.argv;

const baseUrl = 'http://localhost:3001/api/v1';

const pears = [
    {
        route: `${baseUrl}/products/addProduct`,
        jsonFile: 'products',
        seed: (route, data) => {
            console.log("adding products");
            post(route, data);
        }
    },
    {
        route: `${baseUrl}/categories/addCategory`,
        jsonFile: 'categories',
        seed: (route, data) => {
            console.log("adding categories");
            post(route, data.data);
        }
    },
    {
        route: `${baseUrl}/collections/addCollection`,
        jsonFile: 'collections',
        seed: (route, data) => {
            console.log("adding collections");
            post(route, data.data);
        }
    },
    {
        route: `${baseUrl}/shops`,
        jsonFile: 'shops',
        seed: (route, data) => {
          console.log('Adding shops');
          post(route, data);
        },
      },
    ];


async function post(route, items) {
    const promises = items.map(async (item) => {
        return fetch(route, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...item,
                token
            })
        })
    });

    try {
        await Promise.all(promises);
        console.log('added');
    } catch (err) {
        console.log(err);
    }

}

async function seed() {
    pears.forEach(async ({ route, jsonFile, seed }) => {
        const filePath = `${path}/${jsonFile}.json`;

        readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const dataJson = JSON.parse(data);
            seed(route, dataJson);
        });
    });
}

seed();
