import React, { FunctionComponent, useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import './../App.css';
import {Order} from "../types/types";
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

    return (
        <div className="container" style={{marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "40px",  borderRadius: "5px", color: "#000"}} >
            <h1 className="text-center" style={{marginTop: "20px", color: '#fff'}}>Place an Order</h1>
            <form>
                <div className="form-group row">
                    <label htmlFor="sin" className="col-sm-2 col-form-label" style={{ color: '#ffffff' }}>
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
                    <label htmlFor="ticker" className="col-sm-2 col-form-label" style={{ color: '#ffffff' }}>
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
                            }}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="Shares" className="col-sm-2 col-form-label" style={{ color: '#ffffff' }}>
                        Shares:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="shares"
                            value={shares === 1 ? "" : shares}
                            placeholder="Enter shares"
                            onChange={(e) => setShares(+e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="unitPrice" className="col-sm-2 col-form-label" style={{ color: '#ffffff' }}>
                    Unit Price:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="unitPrice"
                            value={unitPrice}
                            placeholder={unitPrice.toString()}
                        />
                    </div>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary" onClick={placeOrder} style={{backgroundColor: "#5e35b1"}}>
                        Place an Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectAdd;