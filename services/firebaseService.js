import { firestore } from '@/firebase';
import {collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query } from 'firebase/firestore'

export const fetchPantryItems = async () => {
    const snapshot = query(collection(firestore, 'Pantry'))
    const docs=  await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
        pantryList.push({id: doc.id, ...doc.data()});
    })
    return pantryList
}

// Function to add pantry items
export const addPantryItem = async (item) => {
    try {
        const docRef = await addDoc(collection(firestore, 'Pantry'), item);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

  // Function to update the quantity of a pantry item
export const updatePantryItemQuantity = async (id, quantity) => {
    try {
      const itemRef = doc(firestore, 'Pantry', id);
      if(quantity!=0){
        await updateDoc(itemRef, { quantity });
      }
      else{
        await deleteDoc(itemRef)
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };