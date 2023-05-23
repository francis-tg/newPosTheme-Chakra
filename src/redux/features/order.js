/* eslint-disable no-dupe-keys */
import {createSlice} from "@reduxjs/toolkit";
import {API_URL} from "../../api/common";
import _ from "lodash";

const initialState = {
  orders: {
    user_id: "",
    table_id: "",
    table_name: "",
    order: [],
    compositions: [],
    cp_total: 0,
    total: 0,
    commande_id: ""
  },
  type: "",
  loading: false
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      if (
        state.orders.order.filter(o => o.product_id === action.payload._id)
          .length === 0
      ) {
        state.orders.order.push({
          productName: action.payload.nom,
          product_id: action.payload._id,
          price: action.payload.price,
          secteur: action.payload.secteur._id,
          quantite: 1,
          total: action.payload.price
        });
      } else {
      }
      state.orders.total = _.sumBy(state.orders.order, "total");
    },
    setBarista: (state, action) => {
      state.orders = {...state.orders, user_id: action.payload};
    },
    setTable: (state, action) => {
      state.orders = {
        ...state.orders,
        table_id: action.payload._id,
        table_name: action.payload.nom
      };
    },
    addQuantity: (state, action) => {
      state.orders.order.filter((o, i) => {
        if (o.product_id === action.payload.product_id) {
          state.orders.order[i].quantite = state.orders.order[i].quantite + 1;
          state.orders.order[i].total =
            state.orders.order[i].price * state.orders.order[i].quantite;
        }
      });
      state.orders.total = _.sumBy(state.orders.order, "total");
    },
    removeQuantity: (state, action) => {
      state.orders.order.filter((o, i) => {
        if (o.product_id === action.payload.product_id) {
          if (
            o.product_id === action.payload.product_id &&
            state.orders.order[i].quantite > 1
          ) {
            state.orders.order[i].quantite = state.orders.order[i].quantite - 1;

            state.orders.order[i].total =
              state.orders.order[i].price * state.orders.order[i].quantite;
          }
        }
      });
      state.orders.total = _.sumBy(state.orders.order, "total");
    },
    setCommande: (state, action) => {
      state.loading = true;
      if (state.type === "new") {
        state.orders.total += state.orders.cp_total;
        fetch(`${API_URL}/common/commande/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token")
          },
          body: JSON.stringify(state.orders)
        }).then(r => {
          if (r.status === 200) {
            window.location.href = "/";
          }
        });
      } else {
        state.orders.total += state.orders.cp_total;
        fetch(`${API_URL}/commande/edit/${state.orders.commande_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token")
          },
          body: JSON.stringify(state.orders)
        }).then(r => {
          if (r.status === 200) {
            window.location.reload();
          }
        });
      }
      state.loading = false;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    removeArticle: (state, action) => {
      /*  const getIt = state.orders.order.filter(
        (a) => a.product_id === action.payload
      ); */
      if (action.payload.type === "composition") {
        state.orders.compositions.splice(action.payload.index, 1);
      } else {
        state.orders.order.splice(action.payload.index, 1);
      }
      state.orders.total = _.sumBy(state.orders.order, "total");
    },
    editCommande(state, action) {
      const value = action.payload;
      state.orders = {
        ...state.orders,
        user_id: value.user_id._id,
        table_id: value.table,
        table_name: value.tableName,
        order: value.products,
        total: value.total,
        commande_id: value._id
      };
    },
    setComposition: (state, action) => {
      state.orders.compositions = [
        ...state.orders.compositions,
        action.payload
      ];
      state.orders.cp_total += _.sumBy(action.payload, "total");
    }
  }
});

export const {
  addOrder,
  setBarista,
  setTable,
  addQuantity,
  setCommande,
  removeQuantity,
  setType,
  removeArticle,
  editCommande,
  setComposition
} = OrderSlice.actions;

export default OrderSlice.reducer;
