const axios = require('axios');
const key = require('../config/key');
const { application } = require('express');

const exchangeRate = 23000

// const convertToUSD = async (vndAmount) => {
//     const apiKey = 'your_api_key'; // Replace with your API key
//     const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/VND/USD`;
  
//     try {
//       const response = await axios.get(url);
//       const exchangeRate = response.data.conversion_rate;
//       const usdAmount = vndAmount / exchangeRate;
//       console.log(`${vndAmount} VND is approximately ${usdAmount.toFixed(2)} USD`);
//     } catch (error) {
//       console.error('Error fetching exchange rate:', error.message);
//     }
//   };

// Generate access token to paypal app
const generateAccessToken = async () => {
    const response = await axios({
        url: key.paypal.url +  '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: key.paypal.clientId,
            password: key.paypal.clientSecret
        }
    })

    return response.data.access_token
}

// Create a order on paypal
module.exports.createOrder = async (cart, total, order) => {
    const access_token = await generateAccessToken()

    const items = cart.cart_items.map((item) => {
        return {
            name: item.product.name,
            quantity: item.quantity,
            unit_amount: {
                currency_code: 'USD',
                value: '100.00'
            }
        }
    })

    const response = await axios({
        url: key.paypal.url + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        data: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: Math.ceil(total / exchangeRate),
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: Math.ceil(total / exchangeRate)
                            }
                        }
                    },
                    custom_id: `${order.id}`
                }
            ],
            application_context: {
                return_url: 'http://localhost:9000/orders/success',
                cancel_url: 'http://localhost:9000/orders/cancel',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
            }
        })
    })
    for (let i = 0; i < response.data.links.length; i++) {
        if (response.data.links[i].rel === 'approve') {
          return response.data.links[i].href
        }
      }
    return null
}

module.exports.capturePayment = async (orderId) => {
    const accessToken = await generateAccessToken()

    const response = await axios({
        url: key.paypal.url + `/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    return response.data
}
