const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const imgColor = (label, hex) =>
  `https://placehold.co/400x400/${hex}/ffffff?text=${encodeURIComponent(label)}`;

// Verified Unsplash CDN URLs — fetched from actual photo pages
const free = (id) =>
  `https://images.unsplash.com/${id}?w=400&h=400&fit=crop&auto=format&q=80`;

const plus = (id) =>
  `https://plus.unsplash.com/${id}?w=400&h=400&fit=crop&auto=format&q=80`;

const products = [
  // ── Vegetables ──────────────────────────────────────────────────────────────
  { title: "Organic Broccoli",      price: 2.99,  rate: 4.8, category: "Vegetables",      image: plus("premium_photo-1702403157830-9df749dc6c1e"), description: "Fresh organic broccoli, rich in vitamins C and K. Grown without pesticides in certified organic farms.", stock: 150, isFeatured: true },
  { title: "Organic Spinach",       price: 3.49,  rate: 4.7, category: "Vegetables",      image: plus("premium_photo-1701699257548-8261a687236f"), description: "Tender organic baby spinach leaves, packed with iron and folate. Perfect for salads and smoothies.", stock: 120, isFeatured: false },
  { title: "Organic Carrots",       price: 1.99,  rate: 4.6, category: "Vegetables",      image: plus("premium_photo-1675798983878-604c09f6d154"), description: "Sweet and crunchy organic carrots loaded with beta-carotene. Harvested fresh from certified farms.", stock: 200, isFeatured: false },
  { title: "Organic Kale",          price: 3.99,  rate: 4.9, category: "Vegetables",      image: plus("premium_photo-1675365979619-27e23094b87e"), description: "Nutrient-dense organic kale — one of the world's healthiest greens. High in vitamins A, K, and C.", stock: 80,  isFeatured: true },
  { title: "Organic Zucchini",      price: 2.49,  rate: 4.5, category: "Vegetables",      image: plus("premium_photo-1675731118529-ba445c5c8d9a"), description: "Tender organic zucchini, versatile for grilling, sautéing, or baking. Low in calories, high in nutrients.", stock: 100, isFeatured: false },
  { title: "Organic Sweet Corn",    price: 1.79,  rate: 4.4, category: "Vegetables",      image: plus("premium_photo-1667047165840-803e47970128"), description: "Sweet organic corn on the cob, picked at peak ripeness. Non-GMO and naturally grown.", stock: 180, isFeatured: false },
  { title: "Organic Bell Peppers",  price: 3.29,  rate: 4.7, category: "Vegetables",      image: plus("premium_photo-1675731117887-a42bad4a4ce2"), description: "Vibrant tri-color organic bell peppers — sweet, crunchy, and packed with vitamin C and antioxidants. Great raw or roasted.", stock: 130, isFeatured: false },
  { title: "Organic Cherry Tomatoes", price: 4.49, rate: 4.8, category: "Vegetables",     image: plus("premium_photo-1661811820259-2575b82101bf"), description: "Sweet and juicy organic cherry tomatoes bursting with lycopene. Perfect for salads, snacking, and pasta dishes.", stock: 110, isFeatured: true },

  // ── Fruits ──────────────────────────────────────────────────────────────────
  { title: "Organic Apples",        price: 4.99,  rate: 4.8, category: "Fruits",          image: plus("premium_photo-1724249990837-f6dfcb7f3eaa"), description: "Crisp and sweet organic apples packed with fiber and antioxidants. Available in a variety of types.", stock: 120, isFeatured: true },
  { title: "Organic Bananas",       price: 2.49,  rate: 4.6, category: "Fruits",          image: free("photo-1571771894821-ce9b6c11b08e"), description: "Ripe organic bananas, a great source of potassium and natural energy. Sustainably grown.", stock: 200, isFeatured: false },
  { title: "Organic Strawberries",  price: 5.99,  rate: 4.9, category: "Fruits",          image: plus("premium_photo-1724256149016-05c013fe058e"), description: "Juicy organic strawberries bursting with flavour and vitamin C. Hand-picked at perfect ripeness.", stock: 60,  isFeatured: true },
  { title: "Organic Blueberries",   price: 6.99,  rate: 4.9, category: "Fruits",          image: plus("premium_photo-1674347951519-ba11f53502ff"), description: "Plump organic blueberries packed with powerful antioxidants — a superfood for brain and heart health.", stock: 50,  isFeatured: true },
  { title: "Organic Avocados",      price: 3.99,  rate: 4.7, category: "Fruits",          image: plus("premium_photo-1724250043016-81ae56238026"), description: "Creamy organic avocados rich in healthy monounsaturated fats. Perfect for guacamole or toast.", stock: 90,  isFeatured: false },
  { title: "Organic Oranges",       price: 3.49,  rate: 4.6, category: "Fruits",          image: free("photo-1557800636-894a64c1696f"), description: "Juicy organic oranges bursting with vitamin C. Great for fresh juice or eating whole.", stock: 150, isFeatured: false },
  { title: "Organic Mangoes",       price: 5.49,  rate: 4.9, category: "Fruits",          image: plus("premium_photo-1724255863045-2ad716767715"), description: "Luscious organic tropical mangoes, rich in vitamins A and C. Tree-ripened for maximum sweetness and flavour.", stock: 75,  isFeatured: true },
  { title: "Organic Pomegranate",   price: 6.49,  rate: 4.8, category: "Fruits",          image: plus("premium_photo-1668076515507-c5bc223c99a4"), description: "Jewel-like organic pomegranate seeds bursting with punicalagins — among the most powerful antioxidants on Earth.", stock: 55,  isFeatured: false },

  // ── Grains & Cereals ────────────────────────────────────────────────────────
  { title: "Organic Quinoa",        price: 8.99,  rate: 4.8, category: "Grains & Cereals", image: plus("premium_photo-1705207702015-0c1f567a14df"), description: "Complete-protein organic quinoa — a superfood grain rich in all nine essential amino acids.", stock: 75,  isFeatured: true },
  { title: "Organic Rolled Oats",   price: 5.49,  rate: 4.7, category: "Grains & Cereals", image: free("photo-1645258751218-1a1ddb1630dc"), description: "Hearty organic rolled oats perfect for porridge, granola, and baking. High in soluble fibre.", stock: 100, isFeatured: false },
  { title: "Organic Brown Rice",    price: 4.99,  rate: 4.6, category: "Grains & Cereals", image: plus("premium_photo-1705338026411-00639520a438"), description: "Whole-grain organic brown rice retaining all its natural nutrients and fibre. A wholesome daily staple.", stock: 110, isFeatured: false },
  { title: "Organic Spelt Flour",   price: 6.99,  rate: 4.5, category: "Grains & Cereals", image: imgColor("Spelt Flour", "d4a74e"), description: "Ancient-grain organic spelt flour, easier to digest than regular wheat. Great for bread and pastries.", stock: 60,  isFeatured: false },
  { title: "Organic Buckwheat",     price: 7.49,  rate: 4.7, category: "Grains & Cereals", image: plus("premium_photo-1764410145945-91767c3ecbd9"), description: "Gluten-free organic buckwheat, rich in rutin and magnesium. Excellent for pancakes and noodles.", stock: 55,  isFeatured: false },
  { title: "Organic Amaranth",      price: 9.99,  rate: 4.8, category: "Grains & Cereals", image: imgColor("Amaranth", "9f1239"), description: "Ancient superfood organic amaranth grain — high in protein and minerals. Naturally gluten-free.", stock: 40,  isFeatured: false },
  { title: "Organic Millet",        price: 5.99,  rate: 4.6, category: "Grains & Cereals", image: imgColor("Millet", "d97706"), description: "Ancient organic millet — a naturally gluten-free grain rich in magnesium, phosphorus, and B vitamins. Light and fluffy when cooked.", stock: 65,  isFeatured: false },
  { title: "Organic Red Lentils",   price: 4.49,  rate: 4.7, category: "Grains & Cereals", image: plus("premium_photo-1701064865147-cebf00e6855f"), description: "Quick-cooking organic red lentils — an excellent plant-based source of protein and iron. Perfect for soups, dahls, and stews.", stock: 90,  isFeatured: false },

  // ── Dairy & Eggs ────────────────────────────────────────────────────────────
  { title: "Organic Whole Milk",          price: 4.49, rate: 4.7, category: "Dairy & Eggs", image: plus("premium_photo-1694481100261-ab16523c4093"), description: "Pure organic whole milk from grass-fed cows. Rich in calcium, vitamins, and natural probiotics.", stock: 80,  isFeatured: false },
  { title: "Free-Range Organic Eggs",     price: 5.99, rate: 4.9, category: "Dairy & Eggs", image: plus("premium_photo-1676686125407-227f3d352df8"), description: "Fresh free-range organic eggs from happy hens. Rich golden yolks with superior nutrition.", stock: 100, isFeatured: true },
  { title: "Organic Greek Yogurt",        price: 3.99, rate: 4.8, category: "Dairy & Eggs", image: free("photo-1530259152377-3a014e1092e0"), description: "Thick and creamy organic Greek yogurt, packed with protein and live probiotics. No added sugars.", stock: 70,  isFeatured: false },
  { title: "Organic Grass-Fed Butter",    price: 6.49, rate: 4.6, category: "Dairy & Eggs", image: imgColor("Butter", "fbbf24"), description: "Rich organic butter from grass-fed cows. Higher in omega-3s and CLA than conventional butter.", stock: 50,  isFeatured: false },
  { title: "Organic Cheddar Cheese",      price: 8.99, rate: 4.7, category: "Dairy & Eggs", image: plus("premium_photo-1691939610797-aba18030c15f"), description: "Aged organic cheddar from grass-fed cow's milk. Bold, complex flavour with no artificial additives.", stock: 45,  isFeatured: false },
  { title: "Organic Kefir",              price: 4.99, rate: 4.8, category: "Dairy & Eggs", image: free("photo-1609246280917-339404083c49"), description: "Probiotic-rich organic kefir — a fermented milk drink that supports gut health. Naturally tangy.", stock: 60,  isFeatured: false },
  { title: "Organic Cottage Cheese",      price: 4.29, rate: 4.6, category: "Dairy & Eggs", image: imgColor("Cottage Cheese", "e0f2fe"), description: "Creamy organic cottage cheese from grass-fed cows — high in protein and calcium with a mild, fresh taste.", stock: 60,  isFeatured: false },
  { title: "Organic Heavy Cream",         price: 3.79, rate: 4.5, category: "Dairy & Eggs", image: imgColor("Heavy Cream", "fef3c7"), description: "Rich organic heavy whipping cream from pasture-raised cows. Perfect for sauces, desserts, and coffee.", stock: 45,  isFeatured: false },

  // ── Herbs & Spices ──────────────────────────────────────────────────────────
  { title: "Organic Turmeric Powder",  price: 7.99, rate: 4.9, category: "Herbs & Spices", image: plus("premium_photo-1726862790171-0d6208559224"), description: "Pure organic turmeric with high curcumin content. Powerful anti-inflammatory and antioxidant spice.", stock: 120, isFeatured: true },
  { title: "Organic Ceylon Cinnamon",  price: 5.99, rate: 4.8, category: "Herbs & Spices", image: plus("premium_photo-1726072356922-7d9d4eafcf71"), description: "Fragrant Ceylon organic cinnamon — the 'true' cinnamon. Ideal for baking, teas, and savoury dishes.", stock: 100, isFeatured: false },
  { title: "Organic Ginger Root",      price: 3.99, rate: 4.7, category: "Herbs & Spices", image: free("photo-1630623093145-f606591c2546"), description: "Fresh organic ginger root, prized for anti-nausea and anti-inflammatory properties.", stock: 90,  isFeatured: false },
  { title: "Fresh Organic Basil",      price: 2.49, rate: 4.6, category: "Herbs & Spices", image: plus("premium_photo-1725899523683-838307ab1552"), description: "Aromatic fresh organic basil — essential for Italian cooking. Bright flavour and rich in vitamins.", stock: 80,  isFeatured: false },
  { title: "Organic Oregano",          price: 4.99, rate: 4.7, category: "Herbs & Spices", image: plus("premium_photo-1726862854826-950e8bd34048"), description: "Robust dried organic oregano packed with antioxidants. A cornerstone herb of Mediterranean cuisine.", stock: 70,  isFeatured: false },
  { title: "Organic Rosemary",         price: 4.49, rate: 4.8, category: "Herbs & Spices", image: plus("premium_photo-1725669195586-f056535699f4"), description: "Fragrant dried organic rosemary — ideal for roasted meats, artisan bread, and Mediterranean dishes.", stock: 65,  isFeatured: false },
  { title: "Organic Black Pepper",     price: 5.49, rate: 4.8, category: "Herbs & Spices", image: free("photo-1599021419847-d8a7a6aba5b4"), description: "Freshly ground organic black peppercorns with a bold, pungent aroma. Enhances bioavailability of curcumin in turmeric.", stock: 130, isFeatured: false },
  { title: "Organic Thyme",            price: 3.99, rate: 4.6, category: "Herbs & Spices", image: imgColor("Thyme", "166534"), description: "Fragrant dried organic thyme with powerful antimicrobial properties. Indispensable in Mediterranean and French cuisine.", stock: 85,  isFeatured: false },

  // ── Nuts & Seeds ────────────────────────────────────────────────────────────
  { title: "Organic Raw Almonds",    price: 12.99, rate: 4.8, category: "Nuts & Seeds", image: plus("premium_photo-1675237625910-e5d354c03987"), description: "Premium organic raw almonds — a powerhouse of protein, healthy fats, and vitamin E.", stock: 80,  isFeatured: true },
  { title: "Organic Walnuts",        price: 13.99, rate: 4.7, category: "Nuts & Seeds", image: plus("premium_photo-1668445743008-0d84ffc370e0"), description: "Crunchy organic walnuts loaded with omega-3 fatty acids and brain-boosting antioxidants.", stock: 70,  isFeatured: false },
  { title: "Organic Chia Seeds",     price: 8.99,  rate: 4.9, category: "Nuts & Seeds", image: plus("premium_photo-1726729281152-4d3d387baf87"), description: "Tiny but mighty organic chia seeds packed with omega-3s, fibre, and plant-based protein.", stock: 100, isFeatured: true },
  { title: "Organic Flaxseeds",      price: 6.99,  rate: 4.8, category: "Nuts & Seeds", image: imgColor("Flaxseeds", "78350f"), description: "Organic whole flaxseeds — rich in lignans and omega-3 fatty acids for heart and digestive health.", stock: 90,  isFeatured: false },
  { title: "Organic Sunflower Seeds", price: 5.99, rate: 4.6, category: "Nuts & Seeds", image: plus("premium_photo-1726072386964-62fe47163be7"), description: "Organic sunflower seeds — excellent source of vitamin E, selenium, and healthy unsaturated fats.", stock: 110, isFeatured: false },
  { title: "Organic Pumpkin Seeds",  price: 9.99,  rate: 4.7, category: "Nuts & Seeds", image: plus("premium_photo-1723874550998-f72f9d3f0b16"), description: "Organic pumpkin seeds (pepitas), rich in zinc, magnesium, and plant-based protein.", stock: 75,  isFeatured: false },
  { title: "Organic Cashews",        price: 14.99, rate: 4.8, category: "Nuts & Seeds", image: plus("premium_photo-1726768984120-f476b15835f2"), description: "Buttery organic raw cashews — a great source of copper, magnesium, and heart-healthy monounsaturated fats.", stock: 65,  isFeatured: false },
  { title: "Organic Pistachios",     price: 16.99, rate: 4.7, category: "Nuts & Seeds", image: plus("premium_photo-1725874816737-8918f48c41a4"), description: "Premium organic pistachios — among the lowest-calorie nuts, rich in protein, fibre, and antioxidants like lutein.", stock: 50,  isFeatured: false },

  // ── Oils & Vinegars ─────────────────────────────────────────────────────────
  { title: "Organic Extra Virgin Olive Oil", price: 14.99, rate: 4.9, category: "Oils & Vinegars", image: free("photo-1474979266404-7eaacbcd87c5"), description: "Cold-pressed organic extra virgin olive oil. Premium quality with a rich, fruity flavour profile.", stock: 60,  isFeatured: true },
  { title: "Organic Virgin Coconut Oil",     price: 11.99, rate: 4.8, category: "Oils & Vinegars", image: plus("premium_photo-1661454115552-def6952a1de3"), description: "Unrefined organic virgin coconut oil — perfect for cooking, baking, and natural skincare.", stock: 70,  isFeatured: false },
  { title: "Organic Apple Cider Vinegar",    price: 6.99,  rate: 4.8, category: "Oils & Vinegars", image: free("photo-1628268909461-ec1eec52a74e"), description: "Raw unfiltered organic apple cider vinegar with the mother. Supports digestion and blood sugar balance.", stock: 80,  isFeatured: false },
  { title: "Organic Avocado Oil",            price: 16.99, rate: 4.9, category: "Oils & Vinegars", image: imgColor("Avocado Oil", "84cc16"), description: "Premium cold-pressed organic avocado oil with a high smoke point — ideal for high-heat cooking.", stock: 45,  isFeatured: false },
  { title: "Organic Toasted Sesame Oil",     price: 9.99,  rate: 4.7, category: "Oils & Vinegars", image: plus("premium_photo-1663936756798-ead5c2609856"), description: "Toasted organic sesame oil — a staple in Asian cooking with a rich, nutty flavour.", stock: 55,  isFeatured: false },
  { title: "Organic Hemp Seed Oil",          price: 18.99, rate: 4.8, category: "Oils & Vinegars", image: imgColor("Hemp Oil", "166534"), description: "Cold-pressed organic hemp seed oil with a perfect ratio of omega-3 to omega-6 fatty acids.", stock: 35,  isFeatured: false },
  { title: "Organic Balsamic Vinegar",       price: 12.99, rate: 4.8, category: "Oils & Vinegars", image: imgColor("Balsamic Vinegar", "1c1917"), description: "Aged organic balsamic vinegar from Modena with a rich, complex sweetness. Ideal for dressings, glazes, and drizzling.", stock: 40,  isFeatured: false },
  { title: "Organic Walnut Oil",             price: 15.99, rate: 4.7, category: "Oils & Vinegars", image: imgColor("Walnut Oil", "92400e"), description: "Cold-pressed organic walnut oil — exceptionally high in alpha-linolenic acid (ALA) omega-3s. Best used unheated in salads.", stock: 30,  isFeatured: false },

  // ── Superfoods ──────────────────────────────────────────────────────────────
  { title: "Organic Spirulina Powder",   price: 24.99, rate: 4.8, category: "Superfoods", image: plus("premium_photo-1695925106172-5868f5dcb120"), description: "Pure organic spirulina — one of the most nutrient-dense foods on Earth. Rich in protein and B12.", stock: 40,  isFeatured: true },
  { title: "Organic Maca Powder",        price: 19.99, rate: 4.7, category: "Superfoods", image: plus("premium_photo-1726594717498-574f37370cdb"), description: "Peruvian organic maca root powder known for energy, endurance, and hormonal balance support.", stock: 45,  isFeatured: false },
  { title: "Organic Acai Powder",        price: 22.99, rate: 4.8, category: "Superfoods", image: plus("premium_photo-1671379064046-6dc7551c71c2"), description: "Freeze-dried organic acai berry powder — exceptionally high in antioxidants and healthy fats.", stock: 35,  isFeatured: false },
  { title: "Organic Cacao Nibs",         price: 14.99, rate: 4.9, category: "Superfoods", image: plus("premium_photo-1726001345874-06eb889d9c6d"), description: "Raw organic cacao nibs — pure chocolate in its most natural form. Rich in magnesium and flavanols.", stock: 55,  isFeatured: true },
  { title: "Organic Moringa Powder",     price: 17.99, rate: 4.7, category: "Superfoods", image: plus("premium_photo-1671130295843-cd4f9b29c613"), description: "Organic moringa leaf powder from the 'miracle tree'. Contains 90+ nutrients and 46 antioxidants.", stock: 40,  isFeatured: false },
  { title: "Organic Wheatgrass Powder",  price: 15.99, rate: 4.8, category: "Superfoods", image: plus("premium_photo-1724026486301-2f1f3cfa1bca"), description: "Fresh-juiced freeze-dried organic wheatgrass powder — alkalising and detoxifying green superfood.", stock: 50,  isFeatured: false },
  { title: "Organic Matcha Powder",      price: 29.99, rate: 4.9, category: "Superfoods", image: plus("premium_photo-1694825173868-ed003c071068"), description: "Ceremonial-grade Japanese organic matcha — shade-grown for maximum L-theanine and chlorophyll. Calm energy without jitters.", stock: 35,  isFeatured: true },
  { title: "Organic Baobab Powder",      price: 21.99, rate: 4.7, category: "Superfoods", image: imgColor("Baobab", "c2410c"), description: "African organic baobab fruit powder — exceptionally rich in vitamin C (6× more than oranges) and soluble fibre.", stock: 30,  isFeatured: false },
];

const offers = [
  {
    title: "Fresh Organic Apple Box",
    description: "A hand-picked selection of crisp, sweet organic apples direct from certified farms. Perfect for healthy snacking all week long.",
    originalPrice: 18.99,
    discountedPrice: 11.99,
  },
  {
    title: "Weekly Green Smoothie Bundle",
    description: "Everything you need for 7 days of nutrient-packed green smoothies — spinach, kale, cucumber, and more, all organically grown.",
    originalPrice: 32.00,
    discountedPrice: 21.99,
  },
  {
    title: "Seasonal Veggie Box",
    description: "A curated mix of seasonal organic vegetables delivered fresh. Supports local organic farmers and fills your kitchen with colour.",
    originalPrice: 28.00,
    discountedPrice: 19.50,
  },
  {
    title: "Organic Herb Garden Kit",
    description: "Grow your own basil, mint, rosemary, and parsley at home with our ready-to-plant certified organic starter kits.",
    originalPrice: 22.00,
    discountedPrice: 14.99,
  },
  {
    title: "Cold-Pressed Juice Pack",
    description: "Six bottles of cold-pressed, small-batch organic juice — no additives, no preservatives, just pure fruit and vegetable goodness.",
    originalPrice: 38.00,
    discountedPrice: 26.99,
  },
  {
    title: "Whole Grain & Nuts Basket",
    description: "A premium assortment of organic quinoa, rolled oats, almonds, walnuts, and chia seeds for a week of wholesome meals.",
    originalPrice: 24.00,
    discountedPrice: 16.50,
  },
];

async function main() {
  console.log(`Seeding ${products.length} products across 8 categories…`);

  for (const product of products) {
    await prisma.product.upsert({
      where: { title: product.title },
      update: product,
      create: product,
    });
  }

  console.log("Seeding 6 offers…");

  await prisma.offer.deleteMany();
  await prisma.offer.createMany({ data: offers });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
