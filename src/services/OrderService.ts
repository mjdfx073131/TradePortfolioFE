import axios from 'axios';
import { Order } from '../types/types';


const ORDER_API_URL = 'http://tradeportfolio-tradeportfolio.openshift30.conygre.com/api/orders';
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
  
    filterOrders(sin: string) {
        // const PROJECT_API_URL_SCAN = 'https://a6dxgre3d8.execute-api.us-east-1.amazonaws.com/prd/team/' + team_name + '/net_amount_remaining/' + net_amount_remaining;
        // if (orderId == null){
        //     return axios.get(ORDER_API_URL);
        // }
        const ORDER_API_URL_FILTER = ORDER_API_URL + '/SIN?SIN=' + sin;
        // const PROJECT_API_URL_ID = ORDER_API_URL + '/orderId?orderId=' + orderId; 
        // return axios.get(PROJECT_API_URL_ID);
        // console.log(axios.get(ORDER_API_URL));
        return axios.get(ORDER_API_URL_FILTER);

    }
}

export default new OrderService();