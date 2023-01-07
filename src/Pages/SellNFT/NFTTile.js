
import { Link, } from "react-router-dom";

function NFTTile(data) {
  
    const newTo = {
        pathname: "/nftpage/" + data.data.tokenId
    }
    return (

        <Link id={data.data.tokenId} to={newTo}>
            <div className="border-2 ml-12 mt-5 mb-6 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
                <img src={data.data.image} alt="" className="w-72 h-80 rounded-lg object-cover" />
                <div className=" w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
                    <strong className="text-xl">{data.data.name}</strong>
                    <p className="display-inline">
                        Price:{data.data.price}
                    </p>
                </div>
            </div>
        </Link>

    )
}

export default NFTTile;