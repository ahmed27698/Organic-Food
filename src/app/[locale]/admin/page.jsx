import AdminButton from "../../components/adminButton";
import AddingProductButton from "../../components/AddingProductButton";
import { prisma } from "../../../lib/prisma";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default async function page() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log(products);

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
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="all_products">All Products</TabsTrigger>
              <TabsTrigger value="order_list">Order List</TabsTrigger>
            </TabsList>
          </aside>
          <div className="flex flex-col justify-start items-start w-full gap-5">
            <nav className="bg-[#fafafa] sticky top-0 w-full h-20 flex items-center justify-end px-10">
              <AdminButton />
            </nav>
            <TabsContent value="dashboard" className="w-full">
              <h2 className="mx-10">Dashboard</h2>
              <div className="flex justify-between items-center w-full px-10">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="../">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <p>affa</p>
              </div>
              <div className="flex justify-center items-center px-10">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </TabsContent>
            <TabsContent value="all_products" className="w-full">
              <h2 className="mx-10">All Products</h2>
              <div className="flex justify-between items-center w-full px-10">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="../">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>All Products</BreadcrumbPage>
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
                    <DialogTitle>Add Product To The Store</DialogTitle>
                    <DialogDescription>
                      Please fill out the form below to add a new product.
                    </DialogDescription>
                    <AddingProductButton />
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                {products.map((product) => {
                  return (
                    <div key={product.id}>
                      <p>{product.title}</p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="order_list">order list</TabsContent>
          </div>
        </section>
      </Tabs>
    </main>
  );
}
