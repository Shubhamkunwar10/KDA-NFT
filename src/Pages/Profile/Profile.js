
import { useLocation, useParams } from 'react-router-dom';

import MarketplaceJSON from '../../script/Marketplace.json';

import axios, * as others from 'axios';
import { useState } from "react";
import NFTTile from "./NFTTile";

//require('dotenv').config();
const key = "1a2709f1d10eb00b4aea"
const secret = "ae07f9453f0645ac5bcc46588b889a2ba7b14a7500952cc9dc5064b7f865456e";


export default function Profile() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */

        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            console.log(tokenURI)

        /*
            let meta = await axios.get(tokenURI, {
                headers: {
                    pinata_api_key: key,
                    pinata_secret_api_key: secret,
                }
            })
             
        
           console.log(meta,meta.data)
            meta = meta.data; 
            */

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: tokenURI,
                name: tokenURI,
                //description: meta.description,
            }
            sumPrice += Number(price);
            return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched)
        getNFTData(tokenId);

    return (
        <div className="profileClass" style={{ "minHeight": "100vh" }}>
           
            <div className="profileClass">
                <div className="flex text-center flex-col mt-11 md:text-2xl ">
                    <div className="mb-5">
                        <h2 className="font-bold">Wallet Address</h2>
                        {address}
                    </div>
                </div>
                <div className="flex flex-row text-center justify-center mt-10 md:text-2xl ">
                    <div>
                        <h2 className="font-bold">No. of NFTs</h2>
                        {data.length}
                    </div>
                    <div className="ml-20">
                        <h2 className="font-bold">Total Value</h2>
                        {totalPrice} ETH
                    </div>
                </div>
                <div className="flex flex-col text-center items-center mt-11 ">
                    <h2 className="font-bold">Your NFTs</h2>
                    <div className="flex justify-center flex-wrap max-w-screen-xl">
                        {data.map((value, index) => {
                            return <NFTTile data={value} key={index}></NFTTile>;
                        })}
                    </div>
                    <div className="mt-10 text-xl">
                        {data.length == 0 ? "Oops, No NFT data to display " : ""}
                    </div>
                </div>
            </div>
        </div>
    )
};