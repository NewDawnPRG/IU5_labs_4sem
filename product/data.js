export const productStore = {
  items: [
    {
      id: 1,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkARIao6rosHFaBTy2SPnGl8Lpl_bAjQ8vhw&s",
      title: "Продавец яблок",
      text: "Зарплата 30.000-50.000 рублей",
      badge: "Требуется сейчас"
    },
    {
      id: 2,
      src: "https://img.gazeta.ru/files3/102/21050102/ban3-pic_square_600x600-600x600-39432.jpg",
      title: "Продавец бананов",
      text: "Зарплата 35.000-60.000 рублей",
      badge: "Лучший выбор"
    },
    {
      id: 3,
      src: "https://apeti.ru/upload/iblock/8ae/nrow91y03tlkj6qauaqw8i4tlek18yd4/grusha_pakkham.png",
      title: "Продавец груш",
      text: "Зарплата 40.000-45.000 рублей",
      badge: "Стабильность"
    }
  ],
  nextId: 4,

  addProduct() {
    const first = this.items[0];
    if (!first) return;
    const newProduct = {
      ...first,
      id: this.nextId++,
      title: first.title + " (копия)"
    };
    this.items.push(newProduct);
  },

  removeProduct(id) {
    const index = this.items.findIndex(p => p.id == id);
    if (index !== -1) this.items.splice(index, 1);
  }
};
