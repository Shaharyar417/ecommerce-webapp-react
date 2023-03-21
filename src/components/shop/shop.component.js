import React from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";

import CollectionOverview from "../collection-overview/collection-overview.component.js";

const ShopPage = () => {
    // const { id } = useParams();
    // console.log(id);
    return (
        <div className="shop-page">
            {/* <Routes>
                <Route exact path='/shop' element={CollectionOverview} />
            </Routes> */}
            <CollectionOverview />
        </div>
    )
}

export default ShopPage;