/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { useGetInvoiceByIdQuery } from "../redux/feature/Invoice/invoice.api";
import { Spin, Table } from "antd";
import moment from "moment";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { Link } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/feature/auth/authSlice";
import { TUser } from "../types";

const Invoice = () => {
    const token = useAppSelector(useCurrentToken);
    const user = verifyToken(token || "");

    const params = useParams();
    const {
        data: invoiceData,
        isLoading,
        isFetching,
    } = useGetInvoiceByIdQuery(params.id);

    const tableData =
        invoiceData?.data?.products.map(
            (
                item: {
                    productId: any;
                    productName: any;
                    price: any;
                    quantity: any;
                },
                index: number,
            ) => {
                return {
                    key: index + 1,
                    productId: item.productId,
                    name: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                };
            },
        ) || [];

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Product ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_text: any, record: { price: number }) => {
                return (
                    <span className="whitespace-nowrap">
                        &#2547; {record.price}
                    </span>
                );
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (
                _text: any,
                record: { price: number; quantity: number },
            ) => {
                return (
                    <span className="whitespace-nowrap">
                        &#2547; {record.price * record.quantity}
                    </span>
                );
            },
        },
    ];

    const getTargetElement = () =>
        document.getElementById(invoiceData.data._id);
    const downloadPdf = () =>
        generatePDF(getTargetElement, {
            resolution: Resolution.EXTREME,
            page: {
                margin: Margin.MEDIUM,
                format: "A4",
                orientation: "portrait",
            },
            filename: `Receipt_${invoiceData.data.buyerName}_${invoiceData.data._id}.pdf`,
        });

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            {!isLoading && !isFetching ? (
                <div className="max-w-4xl mx-auto bg-white p-10 shadow-lg rounded">
                    <div
                        className="border-2 p-5 rounded"
                        id={invoiceData.data._id}
                    >
                        <div className="text-center mb-5">
                            <img
                                src={
                                    "https://sources.com.bd/images/company-logo/20211217101213UwgRFy.png"
                                }
                                alt="Gift Gallery Logo"
                                className="mx-auto w-20 h-20 mb-3"
                            />

                            <h1 className="text-4xl font-bold text-primary mb-1">
                                Gift Gallery
                            </h1>
                            <h2 className="text-2xl font-semibold text-gray-700">
                                Invoice
                            </h2>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row justify-between mb-5">
                            <div className="my-5 text-lg">
                                <div className="flex gap-2">
                                    <span className="font-bold">Name:</span>
                                    <span>{invoiceData.data.buyerName}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold">
                                        Seller Id:
                                    </span>
                                    <span>{invoiceData.data.sellerId._id}</span>
                                </div>
                            </div>
                            <div className="my-5 text-lg">
                                <div className="flex gap-2">
                                    <span className="font-bold">
                                        Invoice No:
                                    </span>
                                    <span>{invoiceData.data._id}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold">
                                        Invoice Date:
                                    </span>
                                    <span>
                                        {moment(
                                            invoiceData.data.sellDate,
                                        ).format("DD MMMM, YYYY")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            scroll={{ x: 500 }}
                            pagination={false}
                            className="mb-10"
                        />
                        <div className="flex flex-col items-end gap-y-6 mb-10">
                            <div className="text-lg w-full md:w-[300px]">
                                <div className="flex justify-between">
                                    <span className="font-bold">
                                        Total Quantity
                                    </span>
                                    <span>
                                        {invoiceData.data.products.reduce(
                                            (
                                                acc: number,
                                                item: { quantity: number },
                                            ) => acc + item.quantity,
                                            0,
                                        )}
                                    </span>
                                </div>
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between">
                                    <span className="font-bold">Subtotal</span>
                                    <span className="whitespace-nowrap">
                                        &#2547; {invoiceData.data.totalAmount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold">Discount</span>
                                    <span className="whitespace-nowrap">
                                        &#2547; {invoiceData.data.discount}
                                    </span>
                                </div>
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold whitespace-nowrap text-xl">
                                        &#2547;{" "}
                                        {
                                            invoiceData.data
                                                .totalAmountAfterDiscount
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <div className="font-bold text-lg">
                                Terms & Conditions
                            </div>
                            <div className="text-gray-700">
                                <p>
                                    1. All sales are final. Products cannot be
                                    returned or exchanged once purchased.
                                </p>
                                <p>
                                    2. We do not offer any guarantees or
                                    warranties on our products. Please inspect
                                    your items upon delivery.
                                </p>
                                <p>
                                    3. Any discrepancies or damages must be
                                    reported within 24 hours of receipt.
                                </p>
                                <p>
                                    4. Prices and availability are subject to
                                    change without notice.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row gap-2 justify-end mt-5">
                        <Link to={`/${(user as TUser).role}/dashboard`}>
                            <button className="button-primary w-full md:w-auto">
                                Return to Dashboard
                            </button>
                        </Link>
                        <button
                            onClick={downloadPdf}
                            className="button-primary"
                        >
                            Download Invoice
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[50vh]">
                    <Spin tip="Loading"></Spin>
                </div>
            )}
        </div>
    );
};

export default Invoice;
