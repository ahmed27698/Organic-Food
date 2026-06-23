import AdminButton from "../components/AdminButton";
import AddingProductButton from "../components/AddingProductButton";
import AdminProductUpdata from "../components/AdminProductUpdata";
import { prisma } from "../../../lib/prisma";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AddingOffers from "../components/addingOffers";
import DeletingOffer from "../components/DeletingOffer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DeletingProduct from "../components/DeletingProduct";
import Chart from "../components/Chart";
export default async function page() {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
        redirect("/");
    }

    let products = [];
    let offers = [];
    try {
        [products, offers] = await Promise.all([
            prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.offer.findMany({ orderBy: { createdAt: "desc" } }),
        ]);
    } catch (_) {}
    return (
        <main className="bg-gray-200 ">
            <Tabs defaultValue="all_products" className="w-full">
                <section className="flex items-start justify-start gap-0.5">
                    <aside className="bg-[#FAFAFA] w-2/12 h-screen flex flex-col justify-start sticky top-0 items-center gap-10">
                        <Link href={"../"}>
                            <Image
                                src="data:image/webp;base64,UklGRiwEAABXRUJQVlA4WAoAAAAQAAAAmQAAKQAAQUxQSO0CAAABkNva2p1YX+7EGaklcsv5fTlzeOfhfCw3YBpA1w2goQFr6AA6mBc5FGAJOsAdHIn/+7//MMDcVxIRENxIUiRF9jDF6pruC/L/NNnNVVMDQMoSH3afAzNgPQ6xBSYMHYwsZ2V0BZQAMAswB3CIKQKpL58GLoGblMncJ8lZ0F08BbHaQiXXe09Y0aC++NNNj1lkUkGzEZH4EcCLTZm6NIr11T22B/ZwqSTbwMY0LZVZdA0Et1vFTgbwCDwJXdHTGVA6xtOlE2lGBlHZ9cB6VrAiAdkQabARbYHFAL1phwUAnECkWX/xans0g5/G40tvNNSIEwnJUgTe0vqX4wo0qX9aifWaaAkrU0VhmqwjSiQoy3Fj9aE38JIsWEZF7/jiA0Ww02icYG+bTCmRsCzFsHuIRSRuh23uMwmvgvYm3bpO9esiGel6MRKZqoEqlajUJowIIcsA4PD00+1Ulc8iOwH0X8RhOqifVFuKjURKKjKqRkmIMLIk7sRjIpIPHi/i2LKrvjRIzcaoW7n6k8gXq6KP1C8nRBhZDm/nl0g22Kxslp3LWmnVPiJiN2FDpzZHqPSYESHCyDIM8LPJ/LJRVNRjha6MBFPbcUT01bYIL0vwAhgnj0WxdwwSwJaoCeqAYxOmMeFlOfbGTiatcdByaO2OoLEZn7jiZQkWwMraTWTvyNzdJ/Exp8swpcnHnK6AZ+uuZzVutxWGjKUJoxV6s3mv7cekO6YgRBhZhgTABEbyGMDNApWQRD1x2u4SZ0Q/WqiOnBBhZMN4U4i5wUJWQLy/kSPMvFCPihgHKPixZyyiRceECCNL0QLIt8ZlafGSJBIgmE4CfMB43REi1HhNEQ/ALjO60yR3t51GH4W42DmOt3kySp7v5US6SEJc8rwwdlcrv1RSnQD6rhmLEIik/Fx6mhIilCyJOqWKfmAun0vUHU280P99fDKJXwAsY/XFRD6btHvgcCP5C5by+aR6AZ4fJJkk8hkln7THvX9UEQBWUDggGAEAALAJAJ0BKpoAKgA+kUiZSiWkoiGmeAwAsBIJYwB4ZkQIANstdju8qgRbkc0FH/EKSxwe06B4nD9qPnxOl0b2m/v/oL5eJzVhvvpRsmCUwjsLXMkSpHrAAP7zf//+GH8A/ICZI7kOH7h/AKZXBlLwuvFYWf37FI10gPXv+fwf04tN0oQVT/vjZ//yPibis6WQLBu0Zq+w//9Oqq7hzK6/LTkGxB/9/Z8wt8UKEhBfe2UFFxOnForPVlGMn1J9VA+HnKHO+mzPgjd8gTlkIfbpyMVzsN4DlTH0cHfsfJF31/gNfC/+5xkFtc5mK54DKeUNo++6y4I3Zeqv/GO0VmT1qdhR8eOvAwBEwSap//8dEdHPidMySzhAAAA="
                                width={200}
                                height={200}
                                alt="logo"
                                className="w-10/12"
                            />
                        </Link>
                        <TabsList className="flex flex-col gap-5 mt-10">
                            <TabsTrigger value="dashboard">
                                Dashboard
                            </TabsTrigger>
                            <TabsTrigger value="all_products">
                                All Products
                            </TabsTrigger>
                            <TabsTrigger value="Offers">Offers</TabsTrigger>
                        </TabsList>
                    </aside>
                    <div className="flex flex-col justify-start items-start w-full gap-5">
                        <nav className="bg-[#fafafa] z-10 sticky top-0 w-full h-20 flex items-center justify-end px-10">
                            <AdminButton />
                        </nav>
                        <TabsContent value="dashboard" className="w-full">
                            <h2 className="mx-10">Dashboard</h2>
                            <div className="flex justify-between items-center w-full px-10">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="../">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                Dashboard
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                                <Chart />
                        </TabsContent>
                        <TabsContent value="all_products" className="w-full">
                            <h2 className="mx-10">All Products</h2>
                            <div className="flex justify-between items-center w-full px-10">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="../">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                All Products
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                                <Dialog>
                                    <DialogTrigger className="btn py-3 px-5 rounded-lg flex justify-center items-center text-white bg-green-600">
                                        Add Product
                                    </DialogTrigger>
                                    <DialogContent
                                        className="p-6"
                                        style={{
                                            width: "800px",
                                            maxWidth: "90vw",
                                            height: "600px",
                                            maxHeight: "90vh",
                                        }}
                                    >
                                        <DialogTitle>
                                            Add Product To The Store
                                        </DialogTitle>
                                        <DialogDescription>
                                            Please fill out the form below to
                                            add a new product.
                                        </DialogDescription>
                                        <AddingProductButton />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="flex justify-center w-full gap-5 flex-wrap mt-10">
                                {products.map((p) => {
                                    return (
                                        <Card
                                            key={p.title}
                                            className="w-3/12 flex flex-col justify-between"
                                        >
                                            <CardHeader>
                                                <Image
                                                    src={p.image}
                                                    alt="image"
                                                    width={200}
                                                    height={200}
                                                    className="w-full"
                                                />
                                                <CardTitle
                                                    className={
                                                        "flex justify-between items-center"
                                                    }
                                                >
                                                    <p>{p.title}</p>
                                                    <p>{p.price}</p>
                                                </CardTitle>

                                                <CardAction></CardAction>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>
                                                    {p.description}
                                                </CardDescription>
                                            </CardContent>
                                            <CardFooter className="flex flex-col">
                                                <Progress
                                                    value={Math.min(
                                                        100,
                                                        Math.max(
                                                            0,
                                                            ((p.stock ?? 0) /
                                                                400) *
                                                                100
                                                        )
                                                    )}
                                                    className={`bg-white ${
                                                        p.stock < 150
                                                            ? "[&>div]:bg-red-600"
                                                            : p.stock >= 150 &&
                                                              p.stock < 250
                                                            ? "[&>div]:bg-amber-600"
                                                            : "[&>div]:bg-green-600"
                                                    }`}
                                                />
                                                <div className="flex justify-between w-full mt-5">
                                                    <Dialog>
                                                        <DialogTrigger className="btn p-2 px-10 rounded-lg flex justify-center items-center text-white bg-green-600">
                                                            Update
                                                        </DialogTrigger>
                                                        <DialogContent className="p-6">
                                                            <DialogTitle>
                                                                Update Product
                                                                To The Store
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Please fill out
                                                                the form That
                                                                You Want To
                                                                Edit.
                                                            </DialogDescription>
                                                            <AdminProductUpdata
                                                                product={p}
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                    <DeletingProduct
                                                        product={p}
                                                    />
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="Offers"
                            className="flex flex-col justify-between items-center w-full px-10"
                        >
                            <div className="flex justify-between w-full ">
                                <div>
                                    <h2>Offers</h2>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="../">
                                                    Home
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>
                                                    Offers
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                                <AddingOffers />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 w-full">
                                {offers.map((offer) => {
                                    const discount = Math.round(
                                        ((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100
                                    );
                                    const savings = (offer.originalPrice - offer.discountedPrice).toFixed(2);
                                    return (
                                        <div
                                            key={offer.id}
                                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
                                        >
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex justify-between items-start gap-2">
                                                <p className="text-white font-bold text-base leading-snug line-clamp-2">
                                                    {offer.title}
                                                </p>
                                                <span className="bg-white text-green-600 text-xs font-bold px-2 py-1 rounded-full shrink-0">
                                                    -{discount}%
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col gap-3 flex-1">
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                                    {offer.description}
                                                </p>
                                                <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100">
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-0.5">Original</p>
                                                        <del className="text-gray-500 font-semibold text-sm">${offer.originalPrice}</del>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-0.5">Price</p>
                                                        <p className="text-green-600 font-bold">${offer.discountedPrice}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-0.5">You Save</p>
                                                        <p className="text-emerald-600 font-semibold text-sm">${savings}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(offer.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                    </p>
                                                    <DeletingOffer offer={offer} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </TabsContent>
                    </div>
                </section>
            </Tabs>
        </main>
    );
}
