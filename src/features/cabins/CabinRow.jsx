import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi';
import { HiSquare2Stack } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

/*eslint-disable*/
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

/*eslint-disable*/
function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  const { isDeleteing, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleCreateCabin() {
    const newCabin = {
      data: {
        name: `copy of ${name}`,
        image,
        maxCapacity,
        regularPrice,
        discount,
      },
    };
    createCabin(newCabin);
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* <button onClick={handleCreateCabin}>
          <HiSquare2Stack />
        </button> */}

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleCreateCabin}>
                Duplicate
              </Menus.Button>
              <Menus.Button icon={<HiPencil />}>
                <Modal.Open opens="edit">
                  <button>Edit</button>
                </Modal.Open>
              </Menus.Button>
              <Menus.Button icon={<HiTrash />}>
                <Modal.Open opens="delete">
                  <button>Delete</button>
                </Modal.Open>
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>

            {/* <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open> */}

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleteing}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
