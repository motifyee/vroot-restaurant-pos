export function useTestCompany() {
	const company = {
		address: 'Test Address',
		descriptionaddress: '',
		branchs: [
			{
				id: 9,
				name: 'Test Branch',
			},
			{
				id: 12,
				name: 'Test Branch 2',
			},
		],
		companyId: 9,
		description: 'Test Description',
		name: 'Test Company',
		phone: '+20123456789',
	};

	(<any>window).useTestCompany = () => {
		localStorage.setItem('test-company', JSON.stringify(company));
		console.log('test company is used:', company);
	};
}

export function useTestBranch() {
	(<any>window).useTestBranch = (branchId: number) => {
		localStorage.setItem('test-branch-idx', branchId.toString());
		console.log('test branch is used:', branchId);
	};
}
