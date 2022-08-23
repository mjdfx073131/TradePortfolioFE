import React, { FunctionComponent, useState } from "react";
import OrderService from "../services/OrderService";
import { Order } from "../types/types";
import ProjectGetEntry from "./ProjectGetEntry";
export interface ProjectUpdateItem { }

const ProjectScan: FunctionComponent<ProjectUpdateItem> = () => {

    let emptyOrdersList: Order[] = [];
    const [qualifiedOrders, filterOrders] = useState(emptyOrdersList);
    const [sin, setSIN] = useState("");
    const [ticker, setTicker] = useState("");

    function filterOrdersOnClick(): void {
        if (sin !== "" && ticker !== "") {
            OrderService.getAllOrder().then((response: any) => {
                let filtered_orders = response.data.filter(order => order.ticker === ticker && order.sin === sin)
                filterOrders(filtered_orders)
            })
        } else if (sin === "" && ticker !== "") {
            OrderService.filterOrdersByTicker(ticker).then((response: any) => {
                filterOrders(response.data)
            })
        } else if (sin !== "" && ticker === "") {
            OrderService.filterOrdersBySin(sin).then((response: any) => {
                filterOrders(response.data)
            })
        } else {
            OrderService.getAllOrder().then((response: any) => {
                filterOrders(response.data)
            })
        }
    };
    return <div className="container" style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "40px", borderRadius: "5px", color: "#000" }} >
        <ProjectGetEntry></ProjectGetEntry>
        <h1 className="text-center" style={{ color: "#ffffff", marginBottom: "20px" }}>Find Order by SIN or Ticker</h1>
        <input type="text"
            value={sin}
            placeholder="Enter a SIN"
            onChange={e => setSIN(e.target.value)}
            style={{ marginLeft: "20px", marginRight: "20px", borderRadius: "5px" }}
        />
        <input type="text"
            value={ticker}
            placeholder="Enter a ticker"
            onChange={e => setTicker(e.target.value)}
            style={{ marginLeft: "20px", marginRight: "20px", borderRadius: "5px" }}
        />
        <button className="btn btn-primary" onClick={filterOrdersOnClick} style={{ backgroundColor: "#5e35b1" }}>
            Get Orders
        </button>
        <br></br>
        <table style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "40px", color: "#000" }} className="table table-striped table-light table-bordered table-hover">
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