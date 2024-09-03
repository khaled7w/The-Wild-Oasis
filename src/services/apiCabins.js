import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to fetch caninns');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Unable to fetch caninns');
  }
}

export async function createCabin(newCabin) {
  if (!newCabin.image) {
    const newObject = { ...newCabin.data };
    const { data: insertedCabin, error: insertError } = await supabase
      .from('cabins')
      .insert([newObject]);

    if (insertError) {
      console.error('Error inserting cabin data:', insertError.message);
      throw new Error('Unable to create Cabin');
    }
    return insertedCabin;
  }
  // Generate a random image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  // Construct the full image path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Insert cabin data into the 'cabins' table
  const newObject = { ...newCabin.data, image: imagePath };
  const { data: insertedCabin, error: insertError } = await supabase
    .from('cabins')
    .insert([newObject]);

  if (insertError) {
    console.error('Error inserting cabin data:', insertError.message);
    throw new Error('Unable to create Cabin');
  }

  // Upload image to Supabase storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error('Error uploading cabin image:', storageError.message);
    // Rollback: Delete the inserted cabin data if image upload fails
    await supabase.from('cabins').delete().eq('id', insertedCabin[0].id);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return insertedCabin;
}

// export async function editCabin(newCabin) {
//   // console.log(newCabin);
//   const hasImagePath = newCabin.data.image.startsWith(supabase);
//   // Generate a random image name
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
//   // Construct the full image path
//   const imagePath = hasImagePath
//     ? newCabin.data.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // Insert cabin data into the 'cabins' table
//   const newObject = { ...newCabin.data, image: imagePath };
//   console.log(newObject);
//   const { data: editedCabin, error: editError } = await supabase
//     .from('cabins')
//     .update(newObject)
//     .eq('id', newCabin.id);

//   if (editError) {
//     console.error('Error updating cabin data:', editError.message);
//     throw new Error('Unable to edit Cabin');
//   }

//   // Upload image to Supabase storage
//   const { error: storageError } = await supabase.storage
//     .from('cabin-images')
//     .upload(imageName, newCabin.image);

//   if (storageError) {
//     console.error('Error uploading cabin image:', storageError.message);
//     // Rollback: Delete the inserted cabin data if image upload fails
//     await supabase.from('cabins').delete().eq('id', editError.id);
//     throw new Error(
//       'Cabin image could not be uploaded and the cabin was not created'
//     );
//   }

//   return editedCabin;
// }

export async function editCabin(newCabin) {
  // Check if a new image is uploaded
  const hasNewImage = newCabin.image && newCabin.image.name;

  // If there's a new image uploaded, handle it
  if (hasNewImage) {
    // Generate a random image name
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
      '/',
      ''
    );
    // Construct the full image path
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Upload new image to Supabase storage
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error('Error uploading cabin image:', storageError.message);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not updated'
      );
    }

    // Update cabin data with new image path
    const newObject = { ...newCabin.data, image: imagePath };
    const { data: editedCabin, error: editError } = await supabase
      .from('cabins')
      .update(newObject)
      .eq('id', newCabin.id);

    if (editError) {
      console.error('Error updating cabin data:', editError.message);
      throw new Error('Unable to edit Cabin');
    }

    return editedCabin;
  } else {
    // If there's no new image uploaded, retain the existing image path
    const { data: editedCabin, error: editError } = await supabase
      .from('cabins')
      .update(newCabin.data)
      .eq('id', newCabin.id);

    if (editError) {
      console.error('Error updating cabin data:', editError.message);
      throw new Error('Unable to edit Cabin');
    }

    return editedCabin;
  }
}
