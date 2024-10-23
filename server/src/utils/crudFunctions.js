import TryCatch from "express-async-handler";
import { ApiError } from "./ApiError.js";

// const getAll = ( //* Get all with features
//   Model,
//   populate = null,
//   transformKeys = [],
//   numberFields = []
// ) =>
//   TryCatch(async (req, res, next) => {
//     const {
//       sort = "1",
//       sortBy = "createdAt",
//       search = "",
//       searchBy = "",
//       page = 1,
//       perPage = 25,
//     } = req.query;

//     const searchQuery = {};
//     if (searchBy && search) {
//       if (numberFields.includes(searchBy)) {
//         searchQuery[searchBy] = parseInt(search);
//       } else {
//         searchQuery[searchBy] = {
//           contains: search,
//           mode: "insensitive",
//         };
//       }
//     }

//     const [data, totalRecords] = await Promise.all([
//       Model.findMany({
//         where: searchQuery,
//         orderBy: { [sortBy]: Number(sort) === 1 ? "asc" : "desc" },
//         take: Number(perPage),
//         skip: (Number(page) - 1) * Number(perPage),
//         include: populate,
//       }),
//       Model.count(),
//     ]);

//     const totalPages = Math.ceil(totalRecords / perPage);

//     let transformedData = data;
//     if (populate && transformKeys.length > 0) {
//       transformedData = data.map((val) => {
//         const transformedObj = { ...val };
//         transformKeys.forEach((key) => {
//           if (transformedObj[key] && transformedObj[key].name) {
//             transformedObj[key] = transformedObj[key].name;
//           }
//         });

//         return transformedObj;
//       });
//     }

//     res.status(200).json({
//       status: "Success",
//       totalRecords,
//       data: transformedData || data,
//       totalPages,
//     });
//   });

const getAll = (Model, populate = null, transformKeys = []) =>
  TryCatch(async (req, res, next) => {
    const [data, totalRecords] = await Promise.all([
      Model.findMany({
        include: populate,
        orderBy: { id: "asc" },
      }),
      Model.count(),
    ]);

    let transformedData = data;
    if (populate && transformKeys.length > 0) {
      transformedData = data.map((val) => {
        const transformedObj = { ...val };
        transformKeys.forEach((key) => {
          if (transformedObj[key] && transformedObj[key].name) {
            transformedObj[key] = transformedObj[key].name;
          }
        });

        return transformedObj;
      });
    }

    res.status(200).json({
      status: "Success",
      totalRecords,
      data: transformedData || data,
    });
  });

const createOne = (Model, type = null) =>
  TryCatch(async (req, res, next) => {
    let { name, ...rest } = req.body;

    if (name) {
      name = name.trim();
    }

    const dataToCreate = {
      ...rest,
      ...(name && { name }),
      ...(type && { type }),
    };

    const data = await Model.create({
      data: dataToCreate,
    });

    res.status(201).json({
      status: "Success",
      data,
    });
  });

const updateOne = (Model) =>
  TryCatch(async (req, res, next) => {
    const data = await Model.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    if (!data) {
      return next(new ApiError("No Entry found with that ID", 404));
    }
    res.status(200).json({
      status: "Success",
      data,
    });
  });

const deleteOne = (Model) =>
  TryCatch(async (req, res, next) => {
    const doc = await Model.delete({ where: { id: parseInt(req.params.id) } });

    if (!doc) {
      return next(new ApiError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "Success",
      data: null,
    });
  });

const getParties = (Model, type = "") =>
  TryCatch(async (req, res, next) => {
    const [data, totalRecords] = await Promise.all([
      Model.findMany({
        where: {
          type,
        },
        orderBy: { id: "asc" },
      }),
      Model.count(),
    ]);

    res.status(200).json({
      status: "Success",
      totalRecords,
      data,
    });
  });

export { getAll, getParties, createOne, updateOne, deleteOne };
