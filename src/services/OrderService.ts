import axios from 'axios';
import { Order } from '../types/types';


const ORDER_API_URL = 'http://tradeportfolio-tradeportfolio.openshift30.conygre.com';
class OrderService {
    
    getAllOrder() {
        return axios.get(ORDER_API_URL, {
            headers: {'Access-Control-Allow-Origin': '*'} });
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
  
    scanORDER(team_name: string, net_amount_remaining: string) {
        const PROJECT_API_URL_SCAN = 'https://a6dxgre3d8.execute-api.us-east-1.amazonaws.com/prd/team/' + team_name + '/net_amount_remaining/' + net_amount_remaining;
        return axios.get(PROJECT_API_URL_SCAN);
    }
}

export default new OrderService();