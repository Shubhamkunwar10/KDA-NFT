import React, { useEffect, useState, useRef } from "react";


import * as s from "./Marketplacecss";
import Marketplace from '../../script/Marketplace.json';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../script/pinata.js";


function Home() {

    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');



    async function OnChangeFile(e) {
        console.log("Error during file upload");
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            if (response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch (e) {
            console.log("Error during file upload", e);
        }
    }


    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        //Make sure that none of the fields are empty
        if (!name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success === true) {
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch (e) {
            console.log("error uploading JSON metadata:", e)
        }
    }


    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 5 mins)")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
            updateMessage("");
            updateFormParams({ name: '', description: '', price: '' });
            window.location.replace("/")
        }
        catch (e) {
            alert("Upload error" + e)
        }
    }

    return (
        <>

            <s.Container flex={1} ai={"center"} style={{ paddingTop: 30 }}>


                <s.ResponsiveWrapper flex={1} test>

                    <h1>Create New Item</h1>
                    <s.TextInfo> * Required fields</s.TextInfo>
                    <s.TextSubTitle>Image, Video, Audio, or 3D Model *</s.TextSubTitle>
                    <s.TextInfo> File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</s.TextInfo>

                    <s.uploadLabel for="fileid"> <s.StyledLogo alt={"logo"} style={{ margin: "auto", marginTop: "35%" }} src={"/config/images/logo.svg"} /></s.uploadLabel>
                    <s.uploadInput onChange={OnChangeFile} type="file" name="file"  id="fileid" />

                    <s.TextSubTitle>Name *</s.TextSubTitle>
                   
                    <s.nftInput type="text" name="name" placeholder="Item Name" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name} />

                    <s.TextSubTitle>External link</s.TextSubTitle>
                    <s.TextInfo>OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</s.TextInfo>

                    <s.nftInput type="text" name="externallink" placeholder="https://yoursite.io/" value={formParams.externallink} onChange={e => updateFormParams({ ...formParams, externallink: e.target.value })} />

                    <s.TextSubTitle>Description</s.TextSubTitle>
                    <s.TextInfo>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</s.TextInfo>
                    <s.nftInput type="text" name="description" placeholder="Description" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}  />

                    <s.TextSubTitle>Price</s.TextSubTitle>
                    <s.nftInput type="number" name="price" placeholder="Price" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })} />

                    <s.TextSubTitle>Collection</s.TextSubTitle>
                    <s.nftInput type="text" name="collection" placeholder="Collection Name" value={formParams.collection} onChange={e => updateFormParams({ ...formParams, collection: e.target.value })} />


                    <s.StyledButton onClick={listNFT} className="">
                        List NFT
                    </s.StyledButton>

                </s.ResponsiveWrapper>


            </s.Container>

        </>

    );
}

export default Home;