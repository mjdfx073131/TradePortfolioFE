import React, { FunctionComponent, useState } from "react";
import { Chart } from "react-google-charts";
import {Portfolio, STATUS_CODE } from "../types/types";
import OrderService from "../services/OrderService";

export interface PortfolioProps {

}

const ProjectPortfolio: FunctionComponent<PortfolioProps> = (props) => {

    const emptyPortfolioList: Portfolio[] = [];
    const [allOrders, setAllOrders] = useState(emptyPortfolioList);
    const [sin, setSIN] = useState("");
    const [submitted, setSubmit] = useState<boolean>(false);
    const emptyData: string[][] = [];
    const [data, setData] = useState(emptyData);
    const [showTickerHistory, setShowTickerHistory] = useState<{}>({});
    const [ticker_order_history, setT] = useState<{}>({});

    const options = {
        title: "Portfolio Report",
        pieHole: 0.4,
        is3D: false,
        titleTextStyle: {
            color: 'Black',
            fontName: 'Aboreto',
            fontSize: '30px',
            bold: true,
            italic: false
        },
        legend: {
            textStyle: {
                color: 'Black',
                fontName: 'Aboreto',
                fontSize: '30px',
                bold: true,
                italic: false
            }
        },
    };

    function getPortFolio(e: any): void {
        OrderService.getPortfolioBySin(sin).then((response) => {
            setAllOrders(response.data);
            setSubmit(true);
            const dataToShow = [["Ticker", "Ticker per sum"]];
            const showTickerHistory1 = {}
            response.data.forEach(order => {
                showTickerHistory[order.ticker] = false;
                dataToShow.push([order.ticker, order.shares * order.avgPrice])
            })
            setShowTickerHistory(showTickerHistory1);
            setData(dataToShow);
        })
        OrderService.filterOrdersBySin(sin).then((response) => {
            const tmpObj = {}
            response.data.forEach( (order) => {
                if (order.ticker in tmpObj) {
                    tmpObj[order.ticker].push(order)
                } else {
                    tmpObj[order.ticker] = []
                    tmpObj[order.ticker].push(order)
                }
            })
            console.log(tmpObj);
            setT(tmpObj)
        })

    }
    function getHistory(e: any) {
        setShowTickerHistory(prev => {
            let curr = { ...prev }
            curr[e.target.id] = !curr[e.target.id];
            return curr
        })
        
    }
    return (
        <div className="container" style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "40px", borderRadius: "5px", color: "#000" }} >
            <h1 className="text-center" style={{ color: "#ffffff", marginBottom: "20px" }}>Portfolio Report</h1>
            <div>
                <input type="text"
                    value={sin}
                    placeholder="Enter a SIN"
                    onChange={e => setSIN(e.target.value)}
                    style={{ marginLeft: "20px", marginRight: "20px", borderRadius: "5px" }}
                />
                <button className="btn btn-primary" onClick={getPortFolio} style={{ backgroundColor: "#5e35b1" }}>
                    Submit
                </button>
            </div>
            <br></br>
            {submitted ? <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            /> : null}
            <table className="table table-striped table-light table-bordered table-hover">
                <thead>
                    <tr>
                        <td>Ticker</td>
                        <td>Shares</td>
                        <td>Unit Price</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        allOrders.map(
                            oneProject =>
                                <tr key={oneProject.ticker}>
                                    <td><button style={{
                                        padding: "0",
                                        border: "none",
                                        background: "none"
                                    }} id={oneProject.ticker} onClick={getHistory}>{oneProject.ticker}</button>
                                        {showTickerHistory[oneProject.ticker]? <table className="table table-striped table-light table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <td>Order Id</td>
                                                    <td>SIN</td>
                                                    <td>Ticker</td>
                                                    <td>Shares</td>
                                                    <td>Market Price</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ticker_order_history[oneProject.ticker].map(
                                                        oneProject =>
                                                            <tr key={oneProject.orderId}>
                                                                <td>{oneProject.orderId}</td>
                                                                <td>{oneProject.sin}</td>
                                                                <td>{oneProject.ticker}</td>
                                                                <td>{oneProject.shares}</td>
                                                                <td>{oneProject.unitPrice}</td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table> : null}</td>
                                    <td>{oneProject.shares}</td>
                                    <td>{oneProject.avgPrice.toFixed(2)}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <p style={{ color: "white", textAlign: "right", fontSize: "15px" }}>Shares: Total Shares/ticker. UnitPrice: Average Buying Price</p>
        </div>
    )
}

export default ProjectPortfolio;