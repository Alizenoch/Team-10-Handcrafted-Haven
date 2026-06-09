import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a demo user
  const user = await prisma.user.create({
    data: {
      name: "Demo Seller",
      email: "demo@handcraftedhaven.com",
      password: "hashedpassword123" // replace with bcrypt hash if needed
    },
  });

  // Insert sample products linked to that user
  await prisma.product.createMany({
    data: [
      {
        title: "Handmade Woven Basket",
        description: "A beautiful basket crafted from natural fibers.",
        price: 25.00,
        sellerId: user.id,
      },
      {
        title: "Clay Pot",
        description: "Traditional clay pot perfect for cooking or decoration.",
        price: 40.00,
        sellerId: user.id,
      },
      {
        title: "Wooden Carving",
        description: "Intricate carving made from local hardwood.",
        price: 60.00,
        sellerId: user.id,
      },
    ],
  });

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
