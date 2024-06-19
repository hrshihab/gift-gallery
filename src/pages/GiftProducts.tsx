/* eslint-disable @typescript-eslint/no-unused-vars */
import FilterView from "../components/ui/Product/FilterView";
import ProductGridView from "../components/ui/Product/ProductGridView";
import { Spin } from "antd";
import { useGetAllProductsQuery } from "../redux/feature/product/productManagement.api";
import { useAppSelector } from "../redux/hooks";
import { useSearchParameter } from "../redux/feature/product/productSlice";

const filterObject = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => {
            if (Array.isArray(value)) {
                return value.length !== 0;
            } else {
                return value !== "" && value !== 0 && value !== -1;
            }
        }),
    );
};

const GiftProducts = () => {
    const searchParameter = useAppSelector(useSearchParameter);
    const { data: productsData, isLoading } = useGetAllProductsQuery(
        filterObject(searchParameter),
    );

    return (
        <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col md:flex-row md:justify-between rounded gap-3 text-center bg-white py-2 px-5">
                <h2 className="text-3xl font-bold">Gift Products</h2>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-center gap-3">
                <div className="flex flex-col md:flex-row-reverse md:gap-3 w-full">
                    <div className="w-full md:w-auto">
                        <FilterView />
                    </div>
                    {isLoading === false ? (
                        <div className="w-full">
                            <ProductGridView
                                productData={productsData?.data || []}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full my-10">
                            <Spin tip="Loading"></Spin>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GiftProducts;
