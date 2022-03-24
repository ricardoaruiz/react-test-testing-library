import { rest } from "msw";
import {
  SCOOPS_RESOLVER_WITH_DATA,
  TOPPINGS_RESOLVER_WITH_DATA,
  ORDER_RESOLVER_WITH_SUCCESS,
} from "./resolvers";

export const URLS = {
  SCOOPS: "http://localhost:3030/scoops",
  TOPPINGS: "http://localhost:3030/toppings",
  ORDER: "http://localhost:3030/order",
};

/**
 *
 */
export const handlers = [
  rest.get(URLS.SCOOPS, SCOOPS_RESOLVER_WITH_DATA),
  rest.get(URLS.TOPPINGS, TOPPINGS_RESOLVER_WITH_DATA),
  rest.post(URLS.ORDER, ORDER_RESOLVER_WITH_SUCCESS),
];
