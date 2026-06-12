import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ✅ Clean up Product table before seeding
  await prisma.product.deleteMany({});
  await prisma.artisan.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        name: "Demo Seller",
        email: "demo@handcraftedhaven.com",
        password: "hashedpassword123", // replace with bcrypt hash if needed
      },
    ],
    skipDuplicates: true,
  });

  // Find the demo user
  const user = await prisma.user.findUnique({
    where: { email: "demo@handcraftedhaven.com" },
  });

  if (!user) throw new Error("Demo user not found");

  // Seed Artisans
  await prisma.artisan.createMany({
    data: [
      { id: 1, name: "Maria Kila", craft: "Bilum weaving", bio: "Weaves traditional PNG bilums with modern color patterns.", image: "/images/maria-bilum.png" },
      { id: 2, name: "Josephine Tau", craft: "Jewelry", bio: "Creates beaded necklaces inspired by coastal shells.", image: "/images/josephine-jewelry.png" },
      { id: 3, name: "Gabriel Mirah", craft: "Wood carving", bio: "Carves masks and sculptures rooted in local traditions.", image: "/images/gabriel-woodcarving.png" },
      { id: 4, name: "Alliana Tenadu", craft: "Basket weaving", bio: "Woven baskets with intricate geometric designs.", image: "/images/alliana-basket.png" },
      { id: 5, name: "Anna Musa", craft: "Pottery", bio: "Clay pots with traditional motifs and modern finishes.", image: "/images/anna-pottery.png" },
      { id: 6, name: "Dehyu Cassell", craft: "Painting", bio: "Tropical village scenes with vibrant colors.", image: "/images/dehyu-painting.png" },
    ],
    skipDuplicates: true,
  });

  // ✅ Insert exactly 12 products
  //await prisma.product.createMany({
    //data: [
     // { title: "Traditional Bilum Bag", description: "Handwoven bilum bag with colorful patterns.", price: 55.0, category: "Bilums", image: "/images/bilum.jpg", sellerId: user.id, artisanId: 1 },
      // { title: "Shell Necklace", description: "Beaded necklace inspired by coastal shells.", price: 35.0, category: "Jewelry", image: "/images/jewelry.jpg", sellerId: user.id, artisanId: 2 },
     // { title: "Carved Wooden Mask", description: "Traditional mask carved from local hardwood.", price: 70.0, category: "Wood Carving", image: "/images/mask.jpg", sellerId: user.id, artisanId: 3 },
     // { title: "Handmade Woven Basket", description: "A beautiful basket crafted from natural fibers.", price: 25.0, category: "Baskets", image: "/images/basket.jpg", sellerId: user.id, artisanId: 4 },
     // { title: "Clay Pot", description: "Traditional clay pot perfect for cooking or decoration.", price: 40.0, category: "Pottery", image: "/images/claypot.jpg", sellerId: user.id, artisanId: 5 },
     // { title: "Village Scene Painting", description: "Tropical village //scene painted with vibrant colors.", price: 80.0, category: "Paintings", image: "/images/painting.jpg", sellerId: user.id, artisanId: 6 },

      // { title: "Bilum Shoulder Bag", description: "Handwoven bilum bag with modern color patterns.", price: 60.0, category: "Bilums", image: "/images/bilum-shoulder.jpg", sellerId: user.id, artisanId: 1 },
      // { title: "Mini Bilum Pouch", description: "Small bilum pouch for personal items.", price: 35.0, category: "Bilums", image: "/images/bilum-pouch.jpg", sellerId: user.id, artisanId: 1 },

     // { title: "Shell Earrings", description: "Handcrafted earrings made from coastal shells.", price: 25.0, category: "Jewelry", image: "/images/earrings.jpg", sellerId: user.id, artisanId: 2 },
      // { title: "Beaded Bracelet", description: "Colorful bracelet with traditional beadwork.", price: 20.0, category: "Jewelry", image: "/images/bracelet.jpg", sellerId: user.id, artisanId: 2 },

     // { title: "Wooden Figurine", description: "Hand-carved figurine of local wildlife.", price: 65.0, category: "Wood Carving", image: "/images/figurine.jpg", sellerId: user.id, artisanId: 3 },
      // { title: "Decorative Wooden Bowl", description: "Carved bowl with tribal motifs.", price: 55.0, category: "Wood Carving", image: "/images/wood-bowl.jpg", sellerId: user.id, artisanId: 3 },
   // ],
    //skipDuplicates: true,
  //});

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
