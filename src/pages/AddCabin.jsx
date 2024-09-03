import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import CabinTable from '../features/cabins/CabinTable';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [showCabinForm, setShowCabinForm] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setShowCabinForm((show) => !show)}>
//         {showCabinForm ? 'Hide Cabin form' : ' Add new Cabin'}
//       </Button>
//       {showCabinForm && (
//         <Modal onClose={() => setShowCabinForm(false)}>
//           <CreateCabinForm onCloseModal={() => setShowCabinForm(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
