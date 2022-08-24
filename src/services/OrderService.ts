import axios from 'axios';
import { Order } from '../types/types';


const ORDER_API_URL = 'http://tradeportfolio-tradeportfolio.openshift30.conygre.com/api/orders';
// const ORDER_API_URL = 'http://localhost:8080/api/orders';
class OrderService {

    getAllOrder() {
        return axios.get(ORDER_API_URL);
    }

    createOrder(order: Order) {
        return axios.post(ORDER_API_URL, order)
    }

    getOneOrder(order_id: number) {
        const PROJECT_API_URL_GET = ORDER_API_URL + '/orderId?orderId=' + order_id;
        return axios.get(PROJECT_API_URL_GET);
    }


    deleteOneOrder(order_id: number) {
        // delete function
        const PROJECT_API_URL_GET = ORDER_API_URL + '/orderId?orderId=' + order_id;
        return axios.delete(PROJECT_API_URL_GET);
    }

    filterOrdersBySin(sin: string) {
        const ORDER_API_URL_FILTER = ORDER_API_URL + '/SIN?SIN=' + sin;
        return axios.get(ORDER_API_URL_FILTER);

    }
    filterOrdersByTicker(ticker: string) {
        const ORDER_API_URL_FILTER = ORDER_API_URL + '/ticker?ticker=' + ticker;
        return axios.get(ORDER_API_URL_FILTER);

    }
    getMarketPriceByTicker(ticker: string) {
        const MARKET_PRICE_URL = "http://tradeportfolio-tradeportfolio.openshift30.conygre.com/stock/" + ticker;
        return axios.get(MARKET_PRICE_URL);
    }
    getAdviceByTicker(ticker: string) {
        const ADVICE_URL = "https://qz4sxjl623.execute-api.us-east-1.amazonaws.com/default/tradeAdvisor?ticker=" + ticker;
        return axios.get(ADVICE_URL);
    }
    getPortfolioBySin (sin: string) {
        const PORTFOLIO_URL = ORDER_API_URL + '/Portfolio?SIN=' + sin;
        return axios.get(PORTFOLIO_URL);
    }
}

export default new OrderService();