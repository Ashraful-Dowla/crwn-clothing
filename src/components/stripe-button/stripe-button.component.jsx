import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton =({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51GzDgmH96ZGsIC3NzKySlArJVrordEBNy1YUp4I2tOILzKPHiVhcj3zXQbN3M2N7AuVkBhoDwWlrd1AKEuEnae9o006XydTll8';
    
    const onToken = token =>{
        console.log(token);
        alert('Payment Successful');
    }
    
    return (
        <StripeCheckout
            label='Pay Now'
            name= 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image= 'https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price} `}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;