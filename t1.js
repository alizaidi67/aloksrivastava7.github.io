function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const foodsData = [
{
  id: 1,
  name: "Butter Chicken",
  desc: "Tempor ad qui consequat pariatur cillum ea.",
  categories: ["spicy", "meditteranean"],
  img: "",
  price: 250 },

{
  id: 2,
  name: "Chicken Biryani",
  desc: "Pariatur tempor aliquip amet nulla quis excepteur adipisicing excepteur id.",
  categories: ["spicy", "meditteranean"],
  img: "",
  price: 100 },

{
  id: 3,
  name: "Chhole Bhature",
  desc: "Ad dolore commodo officia reprehenderit adipisicing Lorem ad quis.",
  categories: ["spicy", "meditteranean"],
  img: "",
  price: 80 },

{
  id: 4,
  name: "Dosa",
  desc: "Qui voluptate exercitation consectetur consequat reprehenderit veniam laborum.",
  categories: ["spicy", "meditteranean"],
  img: "",
  price: 80 },

{
  id: 5,
  name: "Rogan Josh",
  desc: "Cillum aliqua veniam sint enim reprehenderit.",
  categories: ["spicy", "meditteranean"],
  img: "",
  price: 250 },

{
  id: 6,
  name: "Chicken Korma",
  desc: "Excepteur cillum fugiat consequat non do amet.",
  categories: ["spicy", "meditteranean"],
  img: "",
  price: 200 }];




const CartOrder = ({ order, order: { name, qty, price, changeQtyClass }, onAddAnotherOrder, onRemoveOrder }) => {

  return (
    React.createElement(React.Fragment, null,
    React.createElement("div", { className: "cart-order__name" }, name),
    React.createElement("div", { className: `cart-order__qty ${changeQtyClass}` }, qty),
    React.createElement("div", { className: "cart-order__amt" }, "x $", price * qty),
    React.createElement("div", { className: "cart-order__actions" },
    React.createElement("a", { href: "#", onClick: () => onAddAnotherOrder(order), className: "btn-actions btn-actions--add" }, "+"),
    React.createElement("a", { href: "#", onClick: () => onRemoveOrder(order), className: "btn-actions btn-actions--remove" }, "-"))));



};

const Food = ({ item, item: { name, desc, price }, addClass, onAddFood, onAnimationEnd }) => {

  return (
    React.createElement("div", {
      className: `food ${addClass}`,
      onAnimationEnd: () => onAnimationEnd(item) },


    React.createElement("div", { className: "food__header" },
    React.createElement("div", { className: "food__img" },
    React.createElement("img", { src: "https://images.unsplash.com/photo-1544982590-45298dc5d0e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1899&q=80", alt: "" })),

    React.createElement("h1", { className: "food__title" }, name)),


    React.createElement("div", { className: "food__body" },

    React.createElement("div", { className: "food__desc" },
    React.createElement("p", null, desc)),



    React.createElement("ul", { className: "list-categories" },
    React.createElement("li", null, "Category 1"),
    React.createElement("li", null, "Category 2")),

    React.createElement("h4", { className: "food__price" }, "$", price)),


    React.createElement("div", { className: "food__footer" },
    React.createElement("a", {
      className: "food__add-btn",
      onClick: () => onAddFood(item),
      href: "#" },

    React.createElement("i", { class: "fas fa-plus-circle fa-2x" })))));





};




class App extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "state",


    { foodSelection: foodsData, cart: [] });_defineProperty(this, "onAddFood",




    currentFood => {
      const { foodSelection } = this.state;

      const newFoodSelection = foodSelection.map(food => {
        if (food.id === currentFood.id) {
          food.addClass = "food-actions__get-order";
        }

        return food;
      });

      this.setState({ foodSelection: newFoodSelection });
    });_defineProperty(this, "onAnimationEnd",

    currentFood => {
      const { cart, foodSelection } = this.state;

      const newFoodSelection = foodSelection.map(food => {
        if (food.id === currentFood.id) {
          food.addClass = "";
        }
        return food;
      });

      const currentFoodInCart = cart.some(order => order.id === currentFood.id);

      if (!currentFoodInCart) {
        const newOrder = { id: currentFood.id, name: currentFood.name, qty: 1, price: currentFood.price, addClass: "", changeQtyClass: "" };

        this.setState({ foodSelection: newFoodSelection, cart: cart.concat([newOrder]) });
      } else {
        // just increase the quantity of the order
        const newOrderCartList = cart.map(order => {
          if (order.id === currentFood.id) {
            order.qty += 1;
          }

          return order;
        });
        this.setState({ foodSelection: newFoodSelection, cart: newOrderCartList });
      }
    });_defineProperty(this, "clearQtyClass",

    () => {
      const newCartLists = this.state.cart.map(order => {
        order.changeQtyClass = "";
        return order;
      });
      this.setState({ cart: newCartLists });
    });_defineProperty(this, "onAddAnotherOrder",

    currentOrder => {
      this.clearQtyClass();

      // add delay to change state in order to trigger animations again...
      setTimeout(() => {
        const newCartLists = this.state.cart.map(order => {
          if (order.id === currentOrder.id) {
            order.changeQtyClass = "food-actions--qty-changed";
            order.qty += 1;
          }
          return order;
        });
        this.setState({ cart: newCartLists });
      }, 100);
    });_defineProperty(this, "onRemoveOrder",

    currentOrder => {
      this.clearQtyClass();

      // delay to trigger animations...
      setTimeout(() => {
        const newCartLists = this.state.cart.map(order => {
          if (order.id === currentOrder.id && order.qty === 1) {
            order.addClass = "food-actions__remove-order";
          } else if (order.id === currentOrder.id) {
            order.changeQtyClass = "food-actions--qty-changed";
            order.qty -= 1;
          }
          return order;
        });
        this.setState({ cart: newCartLists });
      }, 100);

    });_defineProperty(this, "onAnimationEndRemoveOrder",


    currentOrder => {
      if (currentOrder.addClass) {
        const newCartLists = this.state.cart.map(order => {
          if (order.id === currentOrder.id) {
            order.addClass = "hide";
            order.qty = 0;
          }
          return order;
        });

        this.setState({ cart: newCartLists });
      }
    });_defineProperty(this, "sumOrders",

    () => {
      const result = this.state.cart.reduce((prev, curr) => {
        return prev + curr.price * curr.qty;
      }, 0);

      return result;
    });}componentDidMount() {}

  render() {
    const cartOrderList = this.state.cart.map((order) =>
    React.createElement("li", {
      className: `cart-order ${order.addClass}`,
      onAnimationEnd: () => this.onAnimationEndRemoveOrder(order) },

    React.createElement(CartOrder, {
      order: order,
      onAddAnotherOrder: this.onAddAnotherOrder,
      onRemoveOrder: this.onRemoveOrder })));



    const displayCartLayout = this.state.cart.length > 0 ? "block" : "none";

    const totalAmt = this.sumOrders();

    return (
      React.createElement("main", { className: "main" },
      React.createElement("div", { className: "food-selection" },
      this.state.foodSelection.map((x) =>
      React.createElement(Food, {
        item: x,
        onAddFood: this.onAddFood,
        addClass: x.addClass,
        onAnimationEnd: this.onAnimationEnd }))),



      React.createElement("div", { className: "cart" },
      React.createElement("h1", { className: "cart__title" }, "Your Orders"),

      React.createElement("div", { style: { display: displayCartLayout } },
      React.createElement("div", { className: "cart__orders" },
      React.createElement("ul", { className: "list-selected-order" },
      cartOrderList)),



      React.createElement("div", { className: "cart-underline" }),
      React.createElement("div", { className: "cart__total" },
      React.createElement("div", { className: "cart__total--label" }, "Total"),


      React.createElement("div", { className: "cart__total--amt" }, "$", totalAmt))))));






  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));