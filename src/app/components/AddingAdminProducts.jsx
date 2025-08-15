import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "../../lib/prisma";

export default async function AddingAdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <Tabs defaultValue={categories[0]} className="lg:px-24 md:px-10 px-4 my-10">
      <TabsList>
        {categories.map((cat) => (
          <TabsTrigger key={cat} value={cat}>
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((cat) => (
        <TabsContent key={cat} value={cat}>
          <div className="grid grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === cat)
              .map((p) => (
                <Card
                  key={p.id}
                  className="group relative w-64 border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                >
                  <CardContent className="p-4">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h3 className="mt-2 font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-500">${p.price}</p>

                    
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
