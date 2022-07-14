import products from "../utils/data";


const getProduct= async (product)=>{
    
}
const service  = {

  getData: ({ from, to }) => {
    return new Promise((resolve, reject) => {
     
      const data = products.products.slice(from, to);
      resolve({
        count: products.products.length,
        data: data,
      });
    });
  },
};
export default service;
