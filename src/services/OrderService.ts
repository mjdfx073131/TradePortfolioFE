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
}

export default new OrderService();