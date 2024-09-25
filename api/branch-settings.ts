interface BranchSettings {
	id: number;

	// cashier-settings api
	defaultServicePercent: number;
	defaultTaxPercent: number;

	// invoice-notes/print-label api
	salesClosedInvoiceNote: string;
	salesPendingInvoiceNote: string;
	salesPermissionNote: string;

	//  shift-settings api
	shiftPendingTreasuryId: number;
	shiftPendingTreasuryActive: boolean;
	shiftPendingEmployeeChangeTransferMoney: boolean;
	shiftCloseWithPendingTransactions: boolean;
	shiftOwnersPrintTheFullShiftDetails: boolean;
	autoFillTheShiftAmount: boolean;
	hideShiftAmountForOwner: false;

	// bank-machine api
	bankMachines: {
		id: number;
		serial: string;
		commissionPercent: number;
		bankName: string;
	}[];
}

export const apis: API = {
	getBranchSettings: {
		method: 'GET',
		url: 'api/settings/branch',
		successCode: 200,
		response: { data: {} as BranchSettings },
	},
};
