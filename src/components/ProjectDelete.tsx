import React, { FunctionComponent, useState, useEffect } from 'react';
import OrderService from '../services/OrderService';

export interface ProjectDeleteItem {
  getAllProjects: any
}

const ProjectDeleteEntry: FunctionComponent<ProjectDeleteItem> = (props) => {
  const [order_id, setOrderId] = useState(0);

  function DeleteoneOrder(): void {
    OrderService.deleteOneOrder(order_id).then((response: any) => {
      props.getAllProjects();
      console.log(response.data)
      setOrderId(0);
    });
  }
  useEffect(() => {
    const timer = setInterval(props.getAllProjects, 10000);
    return () => clearInterval(timer);
  }, [props.getAllProjects])

  return <div className="container" style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "0px", borderRadius: "5px", color: "#000" }} >
    <h1 className="text-center" style={{ color: "#ffffff", marginBottom: "20px" }}>Cancel an Order</h1>
    <div>
      <input type="text"
        value={order_id === 0 ? "" : order_id }
        placeholder="Enter an Order Id"
        onChange={e => setOrderId(+e.target.value)}
        style={{ marginLeft: "20px", marginRight: "20px", borderRadius: "5px" }}
      />
      <button className="btn btn-primary" onClick={DeleteoneOrder} style={{ backgroundColor: "#5e35b1" }}>
        Submit
      </button>
      <h1 className="text-center" style={{ color: '#ffffff', marginTop: "80px", marginBottom: "0px" }}>History of Orders</h1>
    </div>
  </div>


}
export default ProjectDeleteEntry;
