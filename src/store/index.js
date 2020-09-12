import Vue  from "vue";
import Vuex from "vuex";
import dbStore from "../assets/firebaseConfig/firebaseInit"
import "firebase/database"
import firebase from "firebase/app"
import "firebase/auth" 
// import "firebase/firestore"
import Cookies from 'js-cookie'
// import {v4 as uuidv4} from 'uuid'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  articles: [],
  cart: [],
  comments: [],
  tempCart: [],
  cartStatus: '',
  sessionId: '',
  showReviewCart: false,
  username: '',
  emailaddress: '',
  uid: null,
  },
  mutations: {
    fetchArticles(currentState, payload){
        // console.log("articles", payload.name)
        currentState.articles.push(payload);
    },
    fetchCart(currentState, payload){
        const found = currentState.cart.find(el => el.prodId === payload.prodId);
        console.log("fetchCart", payload)
        if(!found){
            currentState.cart.push(payload);
        }else{
            found.qty = payload.qty;
        }
    },
    fetchTempCart(currentState, payload){
        const found = currentState.tempCart.find(el => el.prodId === payload.prodId);
        if(!found){
            currentState.tempCart.push(payload);
        }else{
            found.qty = payload.qty;
        }
    },
    fetchComment(currentState, payload){
        // console.log("payload ", payload)
        const find = currentState.comments.filter(el => el.id === payload.id && el.comment === payload.comment)
        if(find){
           return
        }else{
            currentState.comments.push(payload);
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
        // item.qty = Number(item.qty) // because product.qty in cart.vue is type string
        const index = currentState.cart.findIndex(el => el.prodId == item.prodId);
        if(index != -1){
            currentState.cart[index].qty += Number(item.qty);
        }else{
            console.log('push item...')
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
        }else{
            currentState.cart.push(item);
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
        return state.cart.reduce((ac, next) => ac + Number(next.qty), 0);
    },
    getCartTotal(state){
        if(!state.cart.length){
            return 0;
        }
        return state.cart.reduce((acc, curr) => acc + Number(curr.qty) * curr.price, 0);
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
    },
    getUsername(state){
        return state.username;
    },
    getUserEmail(state){
        return state.emailaddress;
    },
    getUid(state){
        return state.uid;
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
            rawDocs.forEach(rawDoc => {
                if(rawDoc.type == 'added' || rawDoc.type == 'modified'){
                    let val = rawDoc.doc.data();
                    context.commit('fetchArticles', {...val});
                }
            })
        })
    },
    retrieveCart(context){
        const toggle = context.state.username;
        const collectionId = toggle ? context.state.uid: Cookies.get('collectionId');
        if(collectionId){
            dbStore.collection("cart").onSnapshot(snap => {
                let rawDocs = snap.docChanges();
                rawDocs.forEach(rawDoc => {
                    console.log(rawDoc.doc.id, " ", collectionId)
                    if((rawDoc.type == 'added' || rawDoc.type == 'modified') && rawDoc.doc.id === collectionId){
                        let cartArray = rawDoc.doc.data();
                        console.log("retrieve cart... ", cartArray)
                        cartArray.items.map(el => context.commit('fetchCart', {...el})) ///  A revoir
                    }
                })
            })
        }
    },
    retrieveTempCart(context){
        if(Cookies.get('collectionId')){
            const collectionId = Cookies.get('collectionId');
            dbStore.collection("cart").onSnapshot(snap =>{
                let rawDocs = snap.docChanges();
                rawDocs.forEach(rawDoc => {
                    if((rawDoc.type == 'added' || rawDoc.type == 'modified') && rawDoc.doc.id === collectionId){
                        let cartArray = rawDoc.doc.data();
                        cartArray.items.map( el => context.commit('fetchTempCart', {...el}));
                    }
                })
            })
        }
    },
    /*eslint-disable no-unused-vars*/
    retrieveUserInfo(context){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                context.state.username = user.displayName;
                context.state.emailaddress = user.email;
                context.state.uid = user.uid;
            }else{
                context.state.username = '';
                context.state.emailaddress = '';
                context.state.uid = '';            
            }
            context.dispatch('retrieveCart');
        })
    },
    /*eslint-unable no-unused-vars*/
    retrieveReviews(context, payload){
        console.log(payload)
        dbStore.collection("reviews").onSnapshot(snap => {
            let rawDocs = snap.docChanges();
            rawDocs.forEach(rawDoc => {
                console.log("reviewsData ", rawDoc.doc.id, " ", payload)
                if(rawDoc.type == 'added' || rawDoc.type == 'modified'){
                    if(rawDoc.doc.id === payload){
                        let val = rawDoc.doc.data();
                        console.log(val);
                        val.commentsList.map(el => context.commit('fetchComment', {...el}));
                    }
                }
            })
        })
    },  
},

  modules: {}
});
