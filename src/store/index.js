import Vue  from "vue";
import Vuex from "vuex";
import dbStore from "../assets/firebaseConfig/firebaseInit"
import "firebase/database"
import Cookies from 'js-cookie'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
  cart: [],
  cartStatus: 'empty',
  sessionId: '',
  showReviewCart: false,
  },
  mutations: {
    fetchArticles(currentState, payload){
        currentState.articles.push(payload);
    },
    fetchCart(currentState, payload){
        const found = currentState.cart.find(el => el.prodId === payload.prodId);
        console.log('found', found);
        if(!found){
            currentState.cart.push(payload);
        }else{
            found.qty = payload.qty;
        }
    },
    updateCart(currentState, info){
      currentState.cartStatus = info;
    },

    clearCart(currentState){
        currentState.cart = [];
        currentState.cartStatus = 'empty';
    },

    addToCart(currentState, item){
        const found = currentState.cart.find(el => {
            el.id == item.id;
        })
        if(found){
            found.qty += item.qty;
        }else{
            currentState.cart.push(item);
        }
    },

    setSessionId(currentState, id){
        currentState.sessionId = id;
    },

    addOneItemAlreadyInCart(currentState, item){
        const index = currentState.cart.findIndex(el => el.id == item.id);
        if(currentState[index].qty){
            currentState[index].qty ++;
            // Modifier automatiquement dans firebase
        }else{
            currentState.cart.splice(index, 1);
        }
    },

    removeOneItemAlreadyInCartFromCart(currentState, item){
        const index = currentState.cart.findIndex(el => el.id == item.id);
        if(currentState.cart[index].qty){
            currentState.cart[index].qty --;
        }else{
            currentState.cart.splice(index, 1);
        }
    },
    removeOneProductFromCart(currentState, item){
        currentState.cart = currentState.cart.filter(el => el.prodId != item.prodId);
    },
  },

  getters:{
    getAllArticles(state){
      return state.articles.filter(el => el.quantity > 0);
    },
    getCartCount(state){
        if(!state.cart.length){
            return 0;
        }
        return state.cart.reduce((ac, next) => ac + next.qty, 0);
    },
    getCartTotal(state){
        if(!state.cart.length){
            return 0;
        }
        return state.cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    },
    getTaxTvq(state, getters){
        return Number.parseFloat(getters.getCartTotal * 0.09975).toFixed(2);
    },
    getTaxTps(state, getters){
        return Number.parseFloat(getters.getCartTotal * 0.05).toFixed(2);
    },
    getCartItems(currentState){
        if(!currentState.cart.length){
            return []
        }
        return currentState.cart.map(item => {
            return {
                "quantity": Number(item.qty),
                "amount": Number.parseInt(item.price * 100 * (1.14975)),
                "name": item.name,
                "description": item.description,
                "currency": "usd",
            };
        });
    }
  },

  actions: {
    async checkout(context){
      const promesse = await fetch('http://localhost:8080', {
          method: "POST",
          headers: {
              "Content-Type": "applicaton/json"
          },
          body: context.getters.getCartItems
      })
      .then(x => {
          return x.json();
      })
      .catch(e => {
          console.log(e);
      })
      //tester pour le cas ou la requete echoue
      context.commit("setSessionId", promesse.sessionId);
      context.commit("clearCart");
    },
    retrieveArticles(context){
        dbStore.collection("articles").onSnapshot(snap =>{
            let rawDocs = snap.docChanges();
            // console.log(rawDocs);
            rawDocs.forEach(rawDoc => {
                if(rawDoc.type == 'added' || rawDoc.type == 'modified'){
                    console.log(rawDoc.doc.data());
                    let val = rawDoc.doc.data();
                    val = {
                        ...val,
                    };
                    // console.log(val);
                    context.commit('fetchArticles', {...val});
                }
            })
        })
    },
    retrieveCart(context){
        const collectionId = Cookies.get('collectionId');
        dbStore.collection(collectionId).onSnapshot(snap =>{
            let rawDocs = snap.docChanges();
            rawDocs.forEach(rawDoc => {
                if(rawDoc.type == 'added' || rawDoc.type == 'modified'){
                    let val = rawDoc.doc.data();
                    console.log(rawDoc.doc.id)
                    const documentId = rawDoc.doc.id;
                    val = {
                        ...val,
                        documentId,
                    };
                    console.log('retrieveCart documentId',documentId);
                    context.commit('fetchCart', {...val});
                }
            })
        })
    }
  },
  
  modules: {}
});
