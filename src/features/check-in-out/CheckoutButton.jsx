import Button from '../../ui/Button';
import useCheckout from './useCheckOut';

/*eslint-disable*/
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
