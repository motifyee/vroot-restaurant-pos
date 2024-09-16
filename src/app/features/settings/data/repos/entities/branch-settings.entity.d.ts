declare interface BranchSettings {
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
	bankMachines: BankMachine[];
}
