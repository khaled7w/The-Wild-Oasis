import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

/*eslint-disable*/
const Label = styled.label`
  font-weight: 500;
`;

/*eslint-disable*/
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { id: cabinId, ...editValues } = cabin;
  const isEditSession = Boolean(cabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : '',
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession)
      editCabin(
        { data, image: data.image[0], id: cabinId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal':'regular'}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        {' '}
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This feild is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This feild is required',
            min: {
              value: 25,
              message: 'Price should be at least 25',
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This feild is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'discount should be less than regular price',
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {
            required: 'This feild is required',
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: isEditSession ? false : 'This filed is required',
          })}
        />
      </FormRow>
      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create new Cabin'}
        </Button>
      </FormRow2>
      ;
    </Form>
  );
}

export default CreateCabinForm;
