import React, { FunctionComponent, useState } from "react";
import OrderService from "../services/OrderService";
import {Order} from "../types/types";

export interface ProjectUpdateItem {}

const ProjectScan: FunctionComponent<ProjectUpdateItem> = () => {

    let emptyOrdersList: Order[] = [];
    const [qualifiedOrders, filterOrders] = useState(emptyOrdersList);
    const [orderID, setOrderID] = useState(0);
    const [sin, setSIN] = useState("");
    const [ticker, setTicker] = useState("");

    // return <></>;
    function filterOrdersOnClick(): void {
        OrderService.getAllOrder().then((response: any) => {
        let FILTER_ORDERS_ID = response.data;
        if (orderID !== 0){
            console.log("reach 20");
           let FILTER_ORDERS_ID_ID = FILTER_ORDERS_ID.filter(order => order.orderId === orderID);
        }
        if (sin !== "") {
            FILTER_ORDERS_ID.filter(order => order.sin === sin);
        }
        if (ticker !== ""){
            FILTER_ORDERS_ID.filter(order => order.ticker === ticker);
        }
            // console.log(FILTER_ORDERS_ID);
            filterOrders(FILTER_ORDERS_ID);
        });
    }

    return <div className="container" style={{marginLeft: "40px", marginRight: "40px",  borderRadius: "5px", color: "#000"}} >
            <h1 className="text-center" style={{color: "#000", marginBottom: "20px"}}>Filter Orders</h1>
        <div>
            <input type="text"
                value={orderID}
                placeholder="Enter an ID"
                onChange={e => setOrderID(+e.target.value)}
                style={{marginLeft: "20px", marginRight: "20px",  borderRadius: "5px"}}
            />
            <input type="text"
                value={sin}
                placeholder="Enter a SIN"
                onChange={e => setSIN(e.target.value)}
                style={{marginLeft: "20px", marginRight: "20px",  borderRadius: "5px"}}
            />
            <input type="text"
                value={ticker}
                placeholder="Enter a ticker"
                onChange={e => setTicker(e.target.value)}
                style={{marginLeft: "20px", marginRight: "20px",  borderRadius: "5px"}}
            />
            <button className="btn btn-primary" onClick={filterOrdersOnClick} style={{backgroundColor: "#5e35b1"}}>
                Filter Orders
            </button>
        </div>
        <br></br>
        <table style={{borderRadius: "5px"}} className="table table-striped table-light table-bordered table-hover"></table>
            <table style={{marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "40px", color: "#000"}} className="table table-striped table-light table-bordered table-hover">
            <thead>
                <tr>
                    <td>Order Id</td>
                    <td>SIN</td>
                    <td>Ticker</td>
                    <td>Shares</td>
                    <td>Unit Price</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {
                    qualifiedOrders.map(
                        oneProject => 
                        <tr key={oneProject.orderId}>
                            <td>{oneProject.orderId}</td>
                            <td>{oneProject.sin}</td>
                            <td>{oneProject.ticker}</td>
                            <td>{oneProject.shares}</td>
                            <td>{oneProject.unitPrice}</td>
                            <td>{oneProject.status_code}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>

};

export default ProjectScan;
// export{}