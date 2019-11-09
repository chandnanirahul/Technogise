var newSlab = require('./objects');

/**
 * Calculate GST
 *  gstId  - String
 *  unitPrice - String
 *  quantity -String
 */
function calculateGST(gstId, unitPrice, quantity) {
  const gstObj = newSlab.GST_SLAB.find(gst => gst.id === gstId);
  if (gstObj) {
    return ((unitPrice * gstObj.rate) / 100) * quantity;
  }
  else {
    throw ("GST_SLAB not found");
  }
}

/**
 * Calculate calculateFinalPrice
 *  product  - String
 *  unitPrice - String
 *  quantity -String
 */
function calculateFinalPrice(product, unitPrice, quantity) {
  const productObj = newSlab.PRODUCTS.find(p => p.products.indexOf(product.toUpperCase()) > -1);
  if (productObj) {
    const gstApplicable = calculateGST(productObj.gstId, unitPrice, quantity);
    return (quantity * unitPrice) + gstApplicable;
  }
  else {
    throw ("Product not found");
  }

}

/**
 * Error Handling using try catch
 */
try {
  if (typeof (newSlab.INPUT) === 'object') {
    newSlab.INPUT.forEach(function (inp) {
      try {
        const splitted = inp.split(' ');
        console.log(inp, ' ->', calculateFinalPrice(splitted[1], splitted[2], splitted[0]));
      }
      catch (err) {
        console.log("Please Enter Valid Data Type OR ", err);
      }
    })
  }
  else {
    throw ("Please validate input");
  }
}
catch (e) {
  console.log("Error ->", e);
}


