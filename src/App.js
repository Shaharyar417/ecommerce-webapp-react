import React from 'react';
import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './components/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrenUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrenUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrenUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }
      setCurrenUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {

    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route exat path='/checkout' element={<CheckoutPage />} />
          <Route exact path='/signin' element={this.props.currentUser ? (<Navigate to='/' />) : (<SignInAndSignUp />)} />
        </Routes>

      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrenUser: user => dispatch(setCurrenUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
