import apiClient from "./apiClient";

export function addToCartAPI(productId, quantity) {
  return apiClient.post(`/cart`, { productId, quantity });
}

export function getCartApi() {
  return apiClient.get("/cart");
}

export function removeFromCartApi(id) {
  return apiClient.delete(`/cart/remove/${id}`);
}
export function increaseCartApi(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}
export function descreaseCartApi(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
export function clearCartApi() {
  return apiClient.delete("/cart/clear"); // Call the clear cart endpoint
}
