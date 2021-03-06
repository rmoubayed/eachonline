export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class Product {
  constructor(public objectID: number,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public description1: string,
              public description2: string,
              public description3: string,
              public description4: string,
              public description5: string,
              public description6: string,
              public description7: string,
              public description8: string,
              public availabilityCount: number,
              public cartCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public shipping: number,
              public categoryLabel:string,
              public categoryId: number){ }
}
