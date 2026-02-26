import { Hono } from "hono";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customers.controller";

const customersRouter = new Hono();

customersRouter.get("/", getAllCustomers);
customersRouter.get("/:id", getCustomerById);
customersRouter.post("/", createCustomer);
customersRouter.put("/:id", updateCustomer);
customersRouter.delete("/:id", deleteCustomer);

export default customersRouter;
