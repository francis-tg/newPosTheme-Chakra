/* eslint-disable no-dupe-keys */
import { createSlice } from '@reduxjs/toolkit';
import { API_URL, removeObjectsByValue } from '../../api/common';
import _ from 'lodash';
import { addLocalStorage, getLocalSorage } from '../../api/localStorage';

const initialState = {
  orders: {
    user_id: '',
    table: '',
    table_name: '',
    order: [],
    total: 0,
    commande_id: '',
  },
  compositions: [],
  type: '',
  loading: false,
  ...getLocalSorage(),
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setBack: (state, _) => {
      if (
        state.type === 'new' &&
        state.orders.user_id !== '' &&
        state.orders.table !== ''
      ) {
        state.orders = { ...state.orders, table: '', table_name: '' };
        addLocalStorage(state);
      } else if (
        state.type === 'new' &&
        state.orders.user_id !== '' &&
        state.orders.table === ''
      ) {
        state.orders = { ...state.orders, user_id: '' };
        addLocalStorage(state);
      } else if (
        state.type === 'new' &&
        state.orders.user_id === '' &&
        state.orders.table === ''
      ) {
        state.type = '';
        addLocalStorage(state);
      } else if (state.type === 'edit') {
        state.type = '';
        addLocalStorage(state);
      }
    },
    addOrder: (state, action) => {
      if (
        state.orders.order.filter(o => o.product_id === action.payload.id)
          .length === 0
      ) {
        state.orders.order.push({
          produitName: action.payload.nom,
          product_id: action.payload.id,
          price: action.payload.price,
          secteur_id: action.payload.secteur.id,
          quantite: 1,
          total: action.payload.price,
        });

        state.orders.total += action.payload.price;
        addLocalStorage(state);
      } else {
      }
    },
    videPanier: (state, _) => {
      state.orders.order = [];
      state.compositions = [];
      addLocalStorage(state);
    },
    setBarista: (state, action) => {
      state.orders = { ...state.orders, user_id: action.payload };
      addLocalStorage(state);
    },
    setTable: (state, action) => {
      state.orders = {
        ...state.orders,
        table: action.payload.id,
        table_name: action.payload.nom,
      };
      addLocalStorage(state);
    },

    addQuantity: (state, action) => {
      state.orders.order.filter((o, i) => {
        if (o.product_id === parseInt(action.payload.product_id)) {
          state.orders.order[i].quantite = state.orders.order[i].quantite + 1;
          state.orders.order[i].total =
            state.orders.order[i].price * state.orders.order[i].quantite;
        }
      });
      state.orders.total = _.sumBy(state.orders.order, 'total');
      addLocalStorage(state);
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
      state.orders.total = _.sumBy(state.orders.order, 'total');
      addLocalStorage(state);
    },
    setCommande: (state, _) => {
      state.loading = true;
      if (state.type === 'new') {
        //state.orders.total += state.orders.cp_total;
        const cpOrder = [...state.orders.order, ...state.compositions];
        const coObject = { ...state.orders };
        coObject.order = cpOrder;
        fetch(`${API_URL}/common/commande/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify(coObject),
        }).then(r => {
          if (r.status === 200) {
            window.location.href = '/';
          }
        });
        window.localStorage.removeItem('commande');
      } else {
        state.orders.total += state.orders.cp_total;

        fetch(`${API_URL}/commande/edit/${state.orders.commande_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token'),
          },
          body: JSON.stringify(state.orders),
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
      addLocalStorage(state);
    },
    removeArticle: (state, action) => {
      /*  const getIt = state.orders.order.filter(
        (a) => a.product_id === action.payload
      ); */
      if (action.payload.type === 'composition') {
        state.compositions = removeObjectsByValue(
          state.compositions,
          'tag',
          action.payload.index
        );
      } else {
        state.orders.order.splice(action.payload.index, 1);
      }
      state.orders.total = _.sumBy(state.orders.order, 'total');
      addLocalStorage(state);
    },
    editCommande(state, action) {
      const value = action.payload;
      state.orders = {
        ...state.orders,
        user_id: value.user_id.id,
        table_id: value.table,
        table_name: value.tableName,
        order: value.products,
        total: value.total,
        commande_id: value.id,
      };
      addLocalStorage(state);
    },
    addComposition: (state, action) => {
      state.compositions = [...state.compositions, ...action.payload];
      state.orders.total += _.sumBy(action.payload, 'total');
      addLocalStorage(state);
    },
  },
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
  addComposition,
  videPanier,
  setBack,
} = OrderSlice.actions;

export default OrderSlice.reducer;
