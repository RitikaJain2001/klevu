const axios = require('axios');
const config = require('../config');
const db = require('../data-access');

async function makeFetchProductsFromBigComm()
{
  try{
    const result = await axios.get(`https://api.bigcommerce.com/stores/${config.storeHash}/v3/catalog/products?limit=250&include_fields=id`, {
      headers: {
          'X-auth-token': config.acess_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  });

  for (let product of result.data.data) {
      //add product-id in db;
      let productEixtInDb = await db.product_query.isProductExistInDb({productId:product.id});
      if(productEixtInDb && productEixtInDb.length>0)
      {
        console.info("product already exist in db");
      }else{
        await db.product_query.insertProductInDb({productId:product.id,date:new Date()});
      }
  }

  let totalPage = result.data.meta.pagination.total_pages;
  let currentPage = 1623 // result.data.meta.pagination.current_page;
  for (let j = 0; j < totalPage - 1; j++) {
      currentPage+= 1;
      const result1 = await axios.get(`https://api.bigcommerce.com/stores/${config.storeHash}/v3/catalog/products?page=${currentPage}&limit=250&include_fields=id`, {
          headers: {
              'X-auth-token': config.acess_token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });

      for (let product of result1.data.data) {
        let productEixtInDb = await db.product_query.isProductExistInDb({productId:product.id});
        if(productEixtInDb && productEixtInDb.length>0)
        {
          console.info("product already exist in db");
        }else{
          await db.product_query.insertProductInDb({productId:product.id,date:new Date()});
        }     
      }
  }
  }catch(err)
  {
     console.info("Getting error while fetching products", err);
  }
}

makeFetchProductsFromBigComm();