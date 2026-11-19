
import { z } from "zod";

export const resourceQuerySchema = z.object({
  search: z.string().max(100).optional(),

  category: z.enum([
    "Application Security",
    "Cloud Security",
    "Network Security",
    "Ethical Hacking",
  ]).optional(),

  type: z.enum([
    "BOOK",
    "VIDEO",
    "ARTICLE",
  ]).optional(),
}).strip();
