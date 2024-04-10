const axios = require('axios');
const config = require('../config');
const db = require('../data-access');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

// let sessionData = await getSessionId(); 
// let sessionId = sessionData.message.sessionId[0];

let sessionId = config.sessionId;

async function updateProductsOnKlevu() {
    let allUnprocessedProductId = await db.product_query.getAllUnprocessedProductId();
    console.info("total", allUnprocessedProductId);

    const batchSize = 250;
    const batches = [];

    let currentBatch = [];

    for (const product of allUnprocessedProductId) {
        currentBatch.push(product.productId);

        if (currentBatch.length === batchSize) {
            batches.push(currentBatch);
            currentBatch = [];
        }
    }

    // Add the remaining products to the last batch (if any)
    if (currentBatch.length > 0) {
        batches.push(currentBatch);
    }

    console.info("batches",batches);



//     const productData = `<?xml version="1.0" encoding="UTF-8" ?>
// <request>
//     <sessionId>${sessionId}</sessionId>
//     <records>
//         <record>
//         <pairs>
//         <!-- IDs -->
//             <pair>
//                 <key>id</key>
//                 <value>${product.productId}</value>
//             </pair>
//         </pairs>
//         </record>
//     </records>
// </request>`;

    // const apiData = {
    //     method: 'post',
    //     url: 'https://rest2.ksearchnet.com/rest/service/updateRecords',
    //     headers: {
    //         'Authorization': config.Authorization,
    //         'Content-type':'application/xml'
    //     },
    //     data: productData
    // };

    // axios(apiData)
    // .then(response => {
    //     console.info("responseData", response);
    // })
    // .catch(error => {
    //     console.error(error);
    // });
}

async function getSessionId() {
    try {
        const apiData = {
            method: 'post',
            url: 'https://rest2.ksearchnet.com/rest/service/startSession',
            headers: {
                'Authorization': config.Authorization,
            },
            // data: productData
        };

        const response = await axios(apiData);
        const parser = new xml2js.Parser();
        const jsonData = await parser.parseStringPromise(response.data);

        // Process the jsonData here
        return jsonData;
    } catch (error) {
        console.error(error);
    }
}


updateProductsOnKlevu();
