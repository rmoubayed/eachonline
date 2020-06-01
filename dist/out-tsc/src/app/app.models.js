var Category = /** @class */ (function () {
    function Category(id, name, hasSubCategory, parentId) {
        this.id = id;
        this.name = name;
        this.hasSubCategory = hasSubCategory;
        this.parentId = parentId;
    }
    return Category;
}());
export { Category };
var Product = /** @class */ (function () {
    function Product(id, name, images, oldPrice, newPrice, discount, ratingsCount, ratingsValue, description, availibilityCount, cartCount, color, size, weight, categoryId) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
        this.discount = discount;
        this.ratingsCount = ratingsCount;
        this.ratingsValue = ratingsValue;
        this.description = description;
        this.availibilityCount = availibilityCount;
        this.cartCount = cartCount;
        this.color = color;
        this.size = size;
        this.weight = weight;
        this.categoryId = categoryId;
    }
    return Product;
}());
export { Product };
//# sourceMappingURL=app.models.js.map