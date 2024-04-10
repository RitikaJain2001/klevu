module.exports = function product_query({ db }) {
    return Object.freeze(
        {
            insertProductInDb,
            isProductExistInDb,
            getAllUnprocessedProductId,
        }
    )

    async function insertProductInDb({productId,date}) {
        try{
            const sql = `INSERT INTO productData (productId,date) Values(?,?)`;
            const values = [
                productId,
                date
            ]
            const [results] = await db.promise().query(sql, values);
            console.info('Product Data saved in database:', results);
            return results;
    
          }catch(err)
          {
            console.info("error in saving data in db!", err);
            return err; 
          }
    }

    async function isProductExistInDb({productId})
    {
        try {
            // Use prepared statements for security (prevent SQL injection)
            const sql = `Select * from productData where productId=?`;
            const values = [productId];
        
            const [results] = await db.promise().query(sql, values);
            // console.info("results",results);
            return results;
          } catch (err) {
            console.error('Error selecting Product data:', err);
            return err; // Re-throw the error for further handling
          }
    }

    async function getAllUnprocessedProductId()
    {
        try{
            const sql = `Select productId from productData where isprocessed=?`;
            const values = [false];

            const [results] = await db.promise().query(sql, values);
            return results;

        }catch(err)
        {
            console.info('getting error while fetching products');
        }
    }
}