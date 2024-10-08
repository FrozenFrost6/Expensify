import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: { 
    expenses: [],
	expenseTypes: [
		'Food',
		'Groceries',
		'Fuel',
		'Entertainment',
		'House maintenance',
		'Product',
		'Clothes',
		'Investments',
		'Health',
		'Bills',
		'Fees',
		'Transport',
		'Other'
	]
  },
  reducers: {
    addExpense: (state, action) => {
      const {
        id = uuidv4(),
        type = 'Bills',
        description = '',
        amount = 0,
        owedTo = 'Yourself',
        createdAt = 0
      } = action.payload;

      state.expenses.push({
        id,
        type,
        description,
        amount,
        owedTo,
        createdAt
      });
    },
    removeExpense: (state, action) => {
      const { id } = action.payload;
      state.expenses = state.expenses.filter(expense => expense.id !== id);
    },
    editExpense: (state, action) => {
      const { id, updates } = action.payload;
      const editExpenseIndex = state.expenses.findIndex(expense => expense.id === id);

      if (editExpenseIndex >= 0) {
        state.expenses[editExpenseIndex] = {
          ...state.expenses[editExpenseIndex],
          ...updates
        };
      }
    },
	addExpenseType: (state, action) => {
		let expType = action.payload;
	
		if (expType && !state.expenseTypes.find(type => type.toLowerCase() === expType.toLowerCase())) {
			expType = expType.trim().toLowerCase();
			expType = expType.charAt(0).toUpperCase() + expType.slice(1);
			// Insert the new type before the last element (which is "Other")
			state.expenseTypes = [
				...state.expenseTypes.slice(0, -1), // All elements except the last one ("Other")
				expType,
				state.expenseTypes[state.expenseTypes.length - 1] // The last element ("Other")
			];
		}
	}, 
	removeExpenseType: (state, action) => {
		const expType = action.payload;
		state.expenseTypes = state.expenseTypes.filter(type => type.toLocaleLowerCase() !== expType.toLowerCase());
	}, 
	editExpenseType: (state, action) => {
		const { sourceType, destType } = action.payload;
		const editTypeIndex = state.expenseTypes.findIndex(expType => expType.toLocaleLowerCase() === sourceType.toLocaleLowerCase());
	
		if (editTypeIndex >= 0) {
			let newDestType = destType.trim().toLowerCase();
			newDestType = newDestType.charAt(0).toUpperCase() + newDestType.slice(1);
			state.expenseTypes[editTypeIndex] = newDestType;
		}
	}
  }
});

export const { addExpense, removeExpense, editExpense, addExpenseType, removeExpenseType, editExpenseType} = expensesSlice.actions;
export default expensesSlice.reducer;