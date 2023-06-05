import React from "react";

function Info() {
    return (
        <div className="Info">
            <p>How It Works:</p>
            <ol>
                <li>Install Metamask to use app</li>
                <li>Connect Wallet (Ethereum Sopolia)</li>
                <li>Input details on employee (Biweekly payment schedule)</li>
                <li>Deploy Salary Automation contract</li>
                <li>Register contract with Chainlink Keeper Registry (need to fund w/ LINK)</li>
                <li>Enjoy your employee's salary automation</li>
            </ol>
        </div>
    );
}

export default Info;

