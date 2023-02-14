import Card from "../components/Card.js";

export function createCard(item, handleImageClick) {
  return new Card({
    ...item,
    template: "#element-template",
    handleImageClick,
  });
}
