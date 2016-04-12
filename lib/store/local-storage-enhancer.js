import { mapValues, forOwn } from 'lodash';

export default function localStorageEnhancer(keyPrefix = 'redux.') {
	return next => (reducer, initialState) => {
		const savedStateObject = mapValues(initialState, function(val, key) {
			let saved = window.localStorage.getItem(`${keyPrefix}${key}`);
			if (!saved) {
				return initialState[key];
			}
			try {
				saved = JSON.parse(saved);
			}
			catch (ex) {
				saved = null;
				console.log(`Unable to load data from local storage with key: ${keyPrefix}${key}`);
			}
			return saved;
		});

		const store = next(reducer, savedStateObject);

		store.subscribe(function () {
			const state = store.getState();

			forOwn(state, (value, key) => {
				const serialized = JSON.stringify(value);
				try {
					window.localStorage.setItem(`${keyPrefix}${key}`, serialized);
				}
				catch (ex) {
					console.warn('Unable to persist state to localStorage:', ex);
				}
			});
		});

		return store;
	};
}