import { inject } from '@angular/core';
import { GetCompanyInfoUseCase } from '@webstore/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	withMethods,
	withState,
} from '@ngrx/signals';
import { of } from 'rxjs';

type State = {
	companyInfo: Company;
	companyInfoStatus: 'loading' | 'loaded' | 'error';
	selectedBranch?: Branch;
};

const initialState: State = {
	companyInfo: {} as Company, // -1 means not loaded
	companyInfoStatus: 'loading',
	selectedBranch: undefined,
};

export function withGetCompanyInfoMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withMethods((store) => {
			let useCase = inject(GetCompanyInfoUseCase);
			return {
				getCompanyInfo: () => {
					const info = localStorage.getItem('companyInfo');

					if (info) {
						const companyInfo = JSON.parse(info);
						patchState(store, {
							companyInfo,
							companyInfoStatus: 'loaded',
						});
						return of(companyInfo);
					}

					patchState(store, { companyInfoStatus: 'loading' });

					return useCase.execute().pipe(
						tapResponse({
							next: (companyInfo: Company) => {
								patchState(store, {
									companyInfo,
									companyInfoStatus: 'loaded',
								});

								localStorage.setItem(
									'companyInfo',
									JSON.stringify(companyInfo),
								);
							},
							error: () =>
								patchState(store, {
									companyInfoStatus: 'error',
								}),
						}),
					);
				},
				selectBranch: (branch?: Branch) => {
					patchState(store, { selectedBranch: branch });

					localStorage.setItem(
						'selectedBranch',
						JSON.stringify(branch),
					);
				},

				selectBranchById: (branchId: number) => {
					const branch = store
						.companyInfo()
						.branchs.find((branch) => branch.id === branchId);
					patchState(store, { selectedBranch: branch });

					localStorage.setItem(
						'selectedBranch',
						JSON.stringify(branch),
					);
				},

				loadSelectedBranch: () => {
					const branch = localStorage.getItem('selectedBranch');
					if (branch) {
						patchState(store, {
							selectedBranch: JSON.parse(branch),
						});
					}
				},
			};
		}),
	);
}
