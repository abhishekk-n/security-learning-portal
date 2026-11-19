
import { Router } from "express";
import prisma from "../config/prisma.js";
import { resourceQuerySchema } from "../validators/resourceValidator.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const validation = resourceQuerySchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        errors: validation.error.flatten(),
      });
    }

    const { search, category, type } = validation.data;

    const filters = {};

    if (search?.trim()) {
      filters.OR = [
        {
          title: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ];
    }

    if (category) {
      filters.category = category;
    }

    if (type) {
      filters.type = type;
    }

    const resources = await prisma.resource.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
