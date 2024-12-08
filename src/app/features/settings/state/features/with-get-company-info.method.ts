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
import { IS_DEVMODE } from '@src/app/core';

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
				getCompanyInfo: rxMethod<void>(
					pipe(
						switchMap(() =>
							useCase.execute().pipe(
								tapResponse({
									next: (companyInfo: Company) =>
										_handleSuccess(store, companyInfo),
									error: () =>
										patchState(store, {
											companyInfoStatus: 'error',
										}),
								}),
							),
						),
					),
				),
				selectBranch: (branch: Branch) => {
					patchState(store, { selectedBranch: branch });
				},
			};
		}),
	);
}

function _handleSuccess(store: any, companyInfo: Company) {
	patchState(store, {
		companyInfo,
		companyInfoStatus: 'loaded',
	});

	if (IS_DEVMODE && localStorage.getItem('test-company'))
		patchState(store, {
			selectedBranch: companyInfo.branchs[0],
		});
}
