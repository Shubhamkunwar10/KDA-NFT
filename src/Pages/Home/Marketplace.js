import React, { useEffect, useState, useRef } from "react";


import * as s from "./Marketplacecss";
import Marketplace from '../../script/Marketplace.json';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../script/pinata.js";


function Home() {

  const [formParams, updateFormParams] = useState({
    name: '', 
    description: '',
    externallink: '', // Additional field: External link
    attributes: [], // Additional field: Attributes
    address:''
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  const [uploadMessage, updateUploadMessage] = useState('');
  const [ipfsImgLink, setIPFSImgLink] = useState('');



  function updateAttribute(index, field, value) {
    const updatedAttributes = [...formParams.attributes];
    updatedAttributes[index][field] = value;
    updateFormParams({ ...formParams, attributes: updatedAttributes });
  }

  function addAttribute() {
    const updatedAttributes = [...formParams.attributes, { trait_type: '', value: '' }];
    updateFormParams({ ...formParams, attributes: updatedAttributes });
  }



  async function OnChangeFile(e) {
    var file = e.target.files[0];
    updateUploadMessage("Image Uploading")
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        updateUploadMessage(`Image Uploaded to`)
        setIPFSImgLink(response.pinataURL)
        setFileURL(response.pinataURL);
      }
    }
    catch (e) {
      console.log("Error during file upload", e);
    }
  }


  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description, externallink, attributes } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description)
      return;
    if (!externallink) {
      setFileURL("https://kda-dev.c3ihub.org");
    }
    const nftJSON = {
      name, description, externallink, attributes, image: fileURL
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


  async function mintNft(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const {address } = formParams;
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)")

      //Pull the deployed contract instance
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

      //actually create the NFT
      let transaction = await contract.safeMint(address, metadataURL)
      await transaction.wait()

      alert("Successfully Minted your NFT!");
      updateMessage("");
      updateFormParams({ name: '', description: '', attributes:[], externallink:'',address:'' });
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

          <h1>Create DRC Nft</h1>
          <s.TextInfo> * Required fields</s.TextInfo>
          <s.TextSubTitle>Image, Video, Audio, or 3D Model *</s.TextSubTitle>
          <s.TextInfo>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</s.TextInfo>

          <s.uploadLabel for="fileid">
            {fileURL ? (
              <img src={fileURL} alt="Uploaded File" style={{ maxWidth: "100%", maxHeight: "200px" }} />
            ) : (
              <s.StyledLogo alt="logo" style={{ margin: "auto", marginTop: "35%" }} src={"/config/images/logo.svg"} />
            )}
          </s.uploadLabel>
          <s.uploadInput onChange={OnChangeFile} type="file" name="file" id="fileid" />
          <s.TextInfo>{uploadMessage}<a href={ipfsImgLink}  target="_blank"> {ipfsImgLink}</a> </s.TextInfo> 

          <s.TextSubTitle>Name* (DRC ID)</s.TextSubTitle>
          <s.nftInput type="text" name="name" placeholder="Item Name" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name} />

                <div>

          <s.TextSubTitle>External link (By default: http://kdaindia.co.in/) </s.TextSubTitle>
          <s.TextInfo>KDA will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</s.TextInfo>
          <s.nftInput type="text" name="externallink" placeholder="https://kda-dev.c3ihub.org/" value={formParams.externallink} onChange={e => updateFormParams({ ...formParams, externallink: e.target.value })} />
                </div>

          <s.TextSubTitle>Description</s.TextSubTitle>
          <s.TextInfo>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</s.TextInfo>
          <s.nftInput type="text" name="description" placeholder="Description" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })} />

          <div>
            <s.TextSubTitle>Land Attributes</s.TextSubTitle>
            {formParams.attributes.map((attribute, index) => (
              <s.AttributeContainer key={index}>
                <s.nftInput
                  type="text"
                  name={`trait_type_${index}`}
                  placeholder="Trait Type"
                  value={attribute.trait_type}
                  onChange={e => updateAttribute(index, 'trait_type', e.target.value)}
                />
                <s.nftInput
                  type="text"
                  name={`value_${index}`}
                  placeholder="Value"
                  value={attribute.value}
                  onChange={e => updateAttribute(index, 'value', e.target.value)}
                />
              </s.AttributeContainer>
            ))}
            <s.AddAttributeButton onClick={addAttribute}>
              Add Attribute
            </s.AddAttributeButton >



          </div>


          <s.TextSubTitle>Address to send KDA NFT</s.TextSubTitle>
          <s.nftInput type="text" name="address" placeholder="address" onChange={e => updateFormParams({ ...formParams, address: e.target.value })} value={formParams.address} />

          <s.StyledButton onClick={mintNft} className="">
            Mint DRC NFT
          </s.StyledButton>
          
          <s.TextInfo>{message}</s.TextInfo>

          {/* Rest of the code */}
        </s.ResponsiveWrapper>
      </s.Container>
    </>
  );
}

export default Home;