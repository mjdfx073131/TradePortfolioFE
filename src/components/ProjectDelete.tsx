import React, { FunctionComponent, useState } from 'react';
import OrderService from '../services/OrderService';
import { Order } from '../types/types';
export interface ProjectDeleteItem {}

const ProjectDeleteEntry: FunctionComponent<ProjectDeleteItem> = () => {
  let project_got = {} as Order;
  const [oneOrder, deleteoneOrder] = useState(project_got);
  const [order_id, setOrderId] = useState(0);

function DeleteoneOrder(): void {
  OrderService.deleteOneOrder(order_id as number).then((response: any) => {
    deleteoneOrder(response.data);
    console.log(response.data)
});
}

  return <div className="container" style={{marginLeft: "40px", marginRight: "40px", marginTop: "40px", marginBottom: "40px",  borderRadius: "5px", color: "#000"}} >
    <h1 className="text-center" style={{color: "#000", marginBottom: "20px"}}>Cancel an Order</h1>
    <form>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          Order Id:
        </label>
        <div className="col-sm-10">
            <input 
                type="text"
                value={order_id}
                className="form-control"
                placeholder="Enter a Order Id"
                onChange={e => setOrderId(+e.target.value)}
                style={{marginLeft: "20px", marginRight: "20px", borderRadius: "5px"}}
            />
        </div>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={DeleteoneOrder} style={{backgroundColor: "#5e35b1"}}>
          Cancel an Order
        </button>
      </div>
    </form>
  </div>


  }
export default ProjectDeleteEntry;
