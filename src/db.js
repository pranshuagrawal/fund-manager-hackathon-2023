import { db } from './firebase';
import { addDoc, getDocs, collection, doc } from 'firebase/firestore';

export const addCategory = (categoryObj) => {
  const categoryCollections = collection(db, 'categories');
  return addDoc(categoryCollections, categoryObj);
};

export const fetchCategories = () => {
  const categoryCollections = collection(db, 'categories');

  const data = getDocs(categoryCollections).then((data) =>
    data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }))
  );
  return data;
};

export const addTransactions = (transactionsObj) => {
  const transactionsCollections = collection(db, 'transactions');
  return addDoc(transactionsCollections, transactionsObj);
};

export const fetchTransactions = () => {
  const transactionsCollections = collection(db, 'transactions');

  const data = getDocs(transactionsCollections).then((data) =>
    data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }))
  );
  return data;
};
