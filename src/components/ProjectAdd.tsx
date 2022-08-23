import React, { FunctionComponent, useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import './../App.css';
import { Order } from "../types/types";
import axios from "axios";

export interface AddProjectProps {
    getAllProjects: any
}

const ProjectAdd: FunctionComponent<AddProjectProps> = (props) => {
    const [orderId, setOrderId] = useState<number>(0);
    const [sin, setSin] = useState<string>("");
    const [ticker, setTicker] = useState<string>("");
    const [shares, setShares] = useState<number>(1);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [status_code, setStatusCode] = useState<number>(0);
    const [advice, setAdvice] = useState<{}>("");

    function placeOrder(e: any): void {
        e.preventDefault();
        const order: Order = {
            orderId: orderId,
            sin: sin,
            ticker: ticker,
            shares: shares,
            unitPrice: unitPrice,
            status_code: status_code,
        };

        OrderService.createOrder(order).then(() => {
            setOrderId(0);
            setSin("");
            setTicker("");
            setShares(1);
            setUnitPrice(0);
            setStatusCode(0);
            props.getAllProjects()
        });
    }
    useEffect(() => {
        const timer = setInterval(props.getAllProjects, 10000);
        return () => clearInterval(timer);
    }, [])

    function setRealTimePrice(ticker: string): void {

        if (ticker.length === 0) {
            setUnitPrice(0)
            return
        }

        axios.get("http://tradeportfolio-tradeportfolio.openshift30.conygre.com/stock/" + ticker)
            .then((response) => {
                if (response.status === 200) {
                    setUnitPrice(response.data)
                }
            })
            .catch(() => {
                setUnitPrice(0)
            })

    }

    function getAdvice(ticker: string): void {
        console.log(ticker.length)
        if (ticker.length === 0) {
            setAdvice({})
            return
        }
        axios
            .get("https://qz4sxjl623.execute-api.us-east-1.amazonaws.com/default/tradeAdvisor?ticker=" + ticker)
            .then((response) => {
                let currAdvice = {
                    "advice": response.data["advice"],
                    "lastClose": response.data["lastClose"].toFixed(2),
                    "lowerBand": response.data["lowerBand"].toFixed(2),
                    "upperBand": response.data["upperBand"].toFixed(2)
                }
                setAdvice(
                    currAdvice
                )
            })
            .catch(() => {
                setAdvice({})
            })
    }


    return (
        <div className="container" style={{ marginLeft: "20px", marginRight: "20px", marginTop: "40px", marginBottom: "40px", borderRadius: "5px", color: "#000" }} >
            <h1 className="text-center" style={{ marginTop: "20px", color: '#fff' }}>Place an Order</h1>
            <div className="container">
                <div className="row" style={{ height: "300px" }}>
                    <div className="col-sm-6" >
                        <div style={{ display: "inline-block", marginLeft: "250px" }}><form>
                            <div className="form-group row" >
                                <label htmlFor="sin" className="col-sm-3 col-form-label" style={{ color: '#ffffff' }}>
                                    SIN:
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sin"
                                        value={sin}
                                        placeholder="Enter a SIN"
                                        onChange={(e) => setSin(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="ticker" className="col-sm-3 col-form-label" style={{ color: '#ffffff' }}>
                                    Ticker:
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ticker"
                                        placeholder="Enter a ticker"
                                        value={ticker}
                                        onChange={(e) => {
                                            setTicker(e.target.value)
                                            setRealTimePrice(e.target.value)
                                            getAdvice(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="Shares" className="col-sm-3 col-form-label" style={{ color: '#ffffff' }}>
                                    Shares:
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="shares"
                                        value={shares === 1 ? "Enter shares" : shares}
                                        // placeholder=""
                                        onChange={(e) => setShares(+e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="col-sm-6" >
                        <div className="inline" style={{ display: "inline-block", marginRight: "250px"}}>
                            <p style={{ marginTop: "35px" }}>
                                Market Price: {unitPrice}
                                <br />
                                Advice: {advice["advice"]}
                                <br />
                                Last Close Price: {advice["lastClose"]}
                                <br />
                                Uppder Band: {advice["upperBand"]}
                                <br />
                                Lower Band: {advice["lowerBand"]}
                            </p>
                            <button className="btn btn-primary" onClick={placeOrder} style={{ backgroundColor: "#5e35b1" }}>
                                Place an Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectAdd;