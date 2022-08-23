import React from "react";

const Advice = () => {
    return (
        <div>
            {/* <h9 id="title">S&P 500 Visualization</h9> */}

            <div id="search_bar">
                <label htmlFor="search"></label>
                <input id="search" type="text" name="searchActor" placeholder="Search Stocks"></input>
                <input id="submit" type="submit" />
            </div>
            <div>
                <div id="first_set">
                    <div id="left">
                        <svg id="treeMap"></svg>
                    </div>
                    <div id="right">
                        {/* <div class="tab">
                            <button className="tablinks" id="SP500_tab" onClick="lineChart.update_tab('SP500',true)">S&P500 Index</button>
                            <button className="tablinks" id="Sector_tab" onClick="lineChart.update_tab('Sector',true)">Selected Sector Total Stock Price</button>
                            <button className="tablinks" id="Companies_tab" onClick="lineChart.update_tab('Companies',true)">Selected Companies Stock Price(s)</button>
                        </div> */}
                        <svg id="lineChart"></svg>
                        <div id="lineChart_tooltip"></div>

                    </div>
                </div>
                <div id="bottom_set">
                    <svg id="bubbleChart"></svg>
                    <div id="bubbleChart-button_div"></div>
                </div>
            </div>

            <div id="tooltip"></div>
        </div>
    )
}

export default Advice;