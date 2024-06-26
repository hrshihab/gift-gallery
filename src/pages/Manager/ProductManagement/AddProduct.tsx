/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import GForm from "../../../components/form/GForm";
import GInput from "../../../components/form/GInput";
import GTextBox from "../../../components/form/GTextBox";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { productSchema } from "../../../Schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import GSelect from "../../../components/form/GSelect";
import {
    useAddNewProductMutation,
    useGetAllBrandQuery,
    useGetAllCategoryQuery,
    useGetAllOccasionQuery,
    useGetAllThemeQuery,
} from "../../../redux/feature/product/productManagement.api";
import { useNavigate } from "react-router";
// import GImageInput from "../../../components/form/GImageInput";

const AddProduct = () => {
    const [addNewProduct] = useAddNewProductMutation();
    const navigate = useNavigate();

    const { data: categoryData, isLoading: isCategoryDataLoading } =
        useGetAllCategoryQuery(undefined);
    const { data: brandData, isLoading: isBrandDataLoading } =
        useGetAllBrandQuery(undefined);
    const { data: occasionData, isLoading: isOccasionDataLoading } =
        useGetAllOccasionQuery(undefined);
    const { data: themeData, isLoading: isThemeDataLoading } =
        useGetAllThemeQuery(undefined);

    const categoryOptions = categoryData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const brandOptions = brandData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const occasionOptions = occasionData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const themeOptions = themeData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Product...");
        const productInfo = {
            name: data.name,
            price: Number(data.price),
            quantity: Number(data.quantity),
            description: data.description,
            category: data.category,
            brand: data.brand,
            occasion: data.occasion,
            theme: data.theme,
        };
        console.log(data);

        const formData = new FormData();
        formData.append("data", JSON.stringify(productInfo));
        // formData.append("file", data.imageURL);

        try {
            const res = await addNewProduct(formData).unwrap();

            if (res.success) {
                navigate("/manager/gift-list");
                toast.success("Product Created Successfully", {
                    id: toastId,
                    duration: 2000,
                });
            } else {
                toast.error(res.message || "Failed to add product", {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to add product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div className="flex flex-col w-4/5 mx-auto rounded-lg  justify-start gap-4">
            <div>
                <h2 className="text-center bg-white py-3 text-3xl font-bold rounded">
                    Add New Gift
                </h2>
            </div>
            <div className="bg-white  px-5 py-3 rounded text-[16px]">
                <GForm
                    onSubmit={onSubmit}
                    disableReset={true}
                    resolver={zodResolver(productSchema)}
                >
                    <GInput
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        label="Product Name"
                    />
                    <GInput
                        type="text"
                        name="price"
                        placeholder="Enter price"
                        label="Price"
                    />
                    <GInput
                        type="text"
                        name="quantity"
                        placeholder="Enter Product Quantity"
                        label="Product Quantity"
                    />
                    {/* <GImageInput
                        type="file"
                        name="imageURL"
                        label="Product Image"
                    /> */}
                    <GTextBox
                        type="text"
                        name="description"
                        placeholder="Enter Product Details"
                        label="Product Details"
                    />
                    <GSelect
                        name="category"
                        placeholder="Select Product Category"
                        label="Product Category"
                        mode="multiple"
                        options={categoryOptions}
                        disabled={isCategoryDataLoading}
                    />
                    <GSelect
                        name="brand"
                        placeholder="Select Product Brand"
                        label="Product Brand"
                        options={brandOptions}
                        disabled={isBrandDataLoading}
                    />
                    <GSelect
                        name="occasion"
                        placeholder="Select Product Suitable Occasion"
                        label="Product Suitable Occasion"
                        mode="multiple"
                        options={occasionOptions}
                        disabled={isOccasionDataLoading}
                    />
                    <GSelect
                        name="theme"
                        placeholder="Select Product Theme"
                        label="Product Theme"
                        mode="multiple"
                        options={themeOptions}
                        disabled={isThemeDataLoading}
                    />
                    <button
                        type="submit"
                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg"
                    >
                        Add Product
                    </button>
                </GForm>
            </div>
        </div>
    );
};

export default AddProduct;
