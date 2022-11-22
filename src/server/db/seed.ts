import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const data = [
  {
    til: "Kung fu",
    tiwo: "Meditating",
    userId: "clalcj1pa00004ntv2gj2e97i",
    createdAt: new Date(currentYear, currentMonth, 1),
  },
  {
    til: "To do a hand-stand",
    tiwo: "Meditating",
    userId: "clalcj1pa00004ntv2gj2e97i",
    createdAt: new Date(currentYear, currentMonth, 2),
  },
  {
    til: "To cook a better carbonara",
    tiwo: "Meditating",
    userId: "clalcj1pa00004ntv2gj2e97i",
    createdAt: new Date(currentYear, currentMonth, 3),
  },
  {
    til: "How to make arepas",
    tiwo: "Meditating",
    userId: "clalcj1pa00004ntv2gj2e97i",
    createdAt: new Date(currentYear, currentMonth - 1, 1),
  },
  {
    til: "How to dance salsa",
    tiwo: "Guitar skills",
    userId: "clalcj1pa00004ntv2gj2e97i",
    createdAt: new Date(currentYear, currentMonth - 2, 1),
  },
];

async function main() {
  data.map(async (entry) => {
    await prisma.entry.create({
      data: entry,
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
