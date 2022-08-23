import React, { FunctionComponent, useState } from "react";
import ProjectService from "../services/OrderService";
import {Order} from "../types/types";

export interface ProjectGetItem {

}

const ProjectGetEntry: FunctionComponent<ProjectGetItem> = () => {

    let project_got = {} as Order;
    const [oneProject, setOneProject] = useState(project_got);
    const [order_id, setOrderId] = useState(0);

    function getOneProject(): void {
        ProjectService.getOneOrder(order_id).then((response: any) => {
            setOneProject(response.data);
            console.log(response.data)
        });
    }


    return <div>
      <h1 className="text-center" style={{color: "#ffffff", marginBottom: "20px"}}>Find Order by ID</h1>
      <div>
          <input type="text"
                placeholder="Enter an order Id"
                onChange={e => setOrderId(+e.target.value)}
              style={{marginRight: "20px",  borderRadius: "5px"}}
          />
          <button className="btn btn-primary" onClick={getOneProject} style={{backgroundColor: "#5e35b1"}}>
              Get Order
          </button>
      </div>
      <br></br>
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

                <tr key={oneProject.orderId}>
                    <td>{oneProject.orderId}</td>
                    <td>{oneProject.sin}</td>
                    <td>{oneProject.ticker}</td>
                    <td>{oneProject.shares}</td>
                    <td>{oneProject.unitPrice}</td>
                    <td>{oneProject.status_code}</td>
                </tr>
                    
            </tbody>
        </table>
  </div>
};

export default ProjectGetEntry;