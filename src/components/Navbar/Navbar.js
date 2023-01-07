import React, { useEffect, useState, useRef } from "react";

import * as s from "./navbarcss"

function Navbar() {


    const [currAddress, updateAddress] = useState('0x');

    async function getAddress() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr)

        const ethereumButton = document.querySelector('.enableEthereumButton');
        ethereumButton.textContent = addr.substring(0, 15) + '...'
    }



    async function connectWebsite() {

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x5') {
            //alert('Incorrect network! Switch your metamask network to Rinkeby');
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }],
            })
        }
        await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(() => { 
                getAddress()
                
            
               
            });
    }

    return (
        <div>
            <s.Header>
                <s.StyledLogo alt={"logo"} id="mymainimage" src={"/config/images/logo.svg"} />
                <s.TextTitle>Opensea</s.TextTitle>
                <s.searchInput type="text" name="searchBar" placeholder="Search Items" />
                
            
                <s.StyledButton className="enableEthereumButton" onClick={connectWebsite}>Connect Wallet</s.StyledButton>
            </s.Header>

            <nav class="navbar navbar-inverse">
                <div class="container-fluid">

                    <ul class="d-flex flex-row">
                        <li class="active mr-4"><a href="/">Home</a></li>
                        <li><a class="mr-4 " href="/profile">Profile</a></li>
                        <li><a class="mr-4 " href="/sellnft">all NFT</a></li>
                    </ul>

                </div>
            </nav>
        

        </div>
    );
}

export default Navbar;
