import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';


import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

import { useNavigate } from 'react-router-dom';


const withRouter = (Component) => {
    const Wrapper = (props) => {
        const history = useNavigate();
        return <Component history={history} {...props} />
    }
    return Wrapper;
}

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                    :
                    <span className='empty-message'>Your Cart Is Empty</span>
            }
        </div>
        {/* <CustomButton onClick={() => history.push('/checkout')}>CHECKOUT</CustomButton> */}
        <CustomButton >
            {/* done this inseteal of using history.push becuase it is not resolving */}
            <Link className='checkout-link' to='/checkout'>CHECKOUT</Link>
        </CustomButton>
    </div>
);



const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));