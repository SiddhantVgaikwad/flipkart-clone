import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OzFyBSCtqy8JeCvWp3WBeXsscSmBKUpwzH7Xosa9QRwhfG7a0kYDt6QajnYNMEa6CCADoCF2ccGUBhcX1IG2aJq00tefElWOg'); // Replace with your public key
    
const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [payDisable, setPayDisable] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    bank: ''
  });

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentDetails = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setPayDisable(true);

    if (paymentMethod === 'upi' && !paymentDetails.upiId) {
      enqueueSnackbar('Please enter a valid UPI ID', { variant: 'warning' });
      setPayDisable(false);
      return;
    }

    if (paymentMethod === 'netbanking' && !paymentDetails.bank) {
      enqueueSnackbar('Please select your bank', { variant: 'warning' });
      setPayDisable(false);
      return;
    }

    try {
      const orderData = {
        paymentMethod,
        paymentDetails,
        amount: totalPrice,
        shippingInfo,
        items: cartItems,
        user: user._id,
      };

      if (paymentMethod === 'stripe') {
        const res = await fetch('/api/v1/payment/stripe-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(orderData),
        });

        const { sessionId } = await res.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
        return;
      }

      const res = await fetch('/api/v1/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      navigate('/order/success', {
        state: {
          success: true,
          orderId: data.order._id
        }
      });
      enqueueSnackbar('Payment processed successfully!', { variant: "success" });

    } catch (error) {
      setPayDisable(false);
      enqueueSnackbar(error.message || "Payment failed!", { variant: "error" });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Secure Payment" />
      <main className="w-full mt-20">
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          <div className="flex-1">
            <Stepper activeStep={3}>
              <div className="w-full bg-white p-6 rounded-lg shadow-sm">
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="payment-radio-group"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label="Cash on Delivery (COD)"
                      />
                      <FormControlLabel
                        value="upi"
                        control={<Radio />}
                        label="UPI Payment"
                      />
                      <FormControlLabel
                        value="netbanking"
                        control={<Radio />}
                        label="Net Banking"
                      />
                      <FormControlLabel
                        value="stripe"
                        control={<Radio />}
                        label="Pay with Card"
                      />
                    </RadioGroup>
                  </FormControl>

                  {paymentMethod === 'upi' && (
                    <TextField
                      fullWidth
                      label="UPI ID"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentDetails}
                      required
                    />
                  )}

                  {paymentMethod === 'netbanking' && (
                    <TextField
                      select
                      fullWidth
                      label="Select Bank"
                      name="bank"
                      value={paymentDetails.bank}
                      onChange={handlePaymentDetails}
                      required
                      SelectProps={{ native: true }}
                    >
                      <option value=""></option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="axis">Axis Bank</option>
                    </TextField>
                  )}

                  {/* Order Summary */}
                  <div className="border p-4 rounded-md bg-gray-50">
                    <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                    <ul className="text-sm space-y-2">
                      {cartItems.map((item) => (
                        <li key={item.product} className="flex justify-between">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                        </li>
                      ))}
                      <li className="flex justify-between font-semibold border-t pt-2">
                        <span>Total</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    disabled={payDisable}
                    className={`${
                      payDisable
                        ? "bg-primary-grey cursor-not-allowed"
                        : "bg-primary-orange cursor-pointer"
                    } w-full my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                  >
                    {payDisable ? 'Processing...' :
                      paymentMethod === 'cod' ?
                        `Confirm Order ₹${totalPrice.toLocaleString()}` :
                        `Pay ₹${totalPrice.toLocaleString()}`
                    }
                  </button>
                </form>
              </div>
            </Stepper>
          </div>
          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;
