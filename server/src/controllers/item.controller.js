import { prisma } from "../config/dbConnection.js";
import { getAll, deleteOne, createOne } from "../utils/crudFunctions.js";
import TryCatch from "express-async-handler";

const getItems = getAll(
  prisma.item,
  {
    company: {
      select: {
        name: true,
      },
    },
    category: {
      select: {
        name: true,
      },
    },
    variant: {
      select: {
        name: true,
      },
    },
    field: {
      select: {
        name: true,
      },
    },
  },
  ["company", "category", "variant", "field"]
);

const createItem = TryCatch(async (req, res, next) => {
  const { name, companyName, variantName } = req.body;
  const fullName = `${name.trim()} - ${companyName.trim()} - ${variantName.trim()}`;

  delete req.body.companyName;
  delete req.body.variantName;

  const data = await prisma.item.create({
    data: {
      ...req.body,
      fullName,
    },
  });

  res.status(201).json({
    status: "Success",
    data,
  });
});

const updateItem = TryCatch(async (req, res, next) => {
  const itemId = parseInt(req.params.id);
  const { name, companyName, variantName } = req.body;

  const fullName = `${name.trim()} - ${companyName.trim()} - ${variantName.trim()}`;

  const { purchasePrice, salePrice } = await prisma.item.findUnique({
    where: { id: itemId },
    select: {
      purchasePrice: true,
      salePrice: true,
    },
  });

  delete req.body.companyName;
  delete req.body.variantName;

  const updatedData = { ...req.body, fullName };

  if (Number(req.body.purchasePrice) !== Number(purchasePrice)) {
    updatedData.oldPurchasePrice = purchasePrice;
  }
  if (Number(req.body.salePrice) !== Number(salePrice)) {
    updatedData.oldSalePrice = salePrice;
  }

  const data = await prisma.item.update({
    where: { id: itemId },
    data: updatedData,
  });

  if (!data) {
    return next(new ApiError("No Entry found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data,
  });
});

const deleteItem = deleteOne(prisma.item);

export { getItems, createItem, updateItem, deleteItem };
