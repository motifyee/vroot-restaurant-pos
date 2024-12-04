import { inject } from '@angular/core';
import { GetCompanyInfoUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	withMethods,
	withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

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

export function withLoadCompanyInfoMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withMethods((store) => {
			let useCase = inject(GetCompanyInfoUseCase);
			return {
				getCompanyInfo: rxMethod<void>(
					pipe(
						switchMap(() =>
							useCase.execute().pipe(
								tapResponse({
									next: (companyInfo: Company) => {
										patchState(store, {
											companyInfo,
											companyInfoStatus: 'loaded',
										});
									},
									error: () =>
										patchState(store, {
											companyInfoStatus: 'error',
										}),
								}),
							),
						),
					),
				),
				selectBranch: (branch: Branch) =>
					patchState(store, { selectedBranch: branch }),
			};
		}),
	);
}
