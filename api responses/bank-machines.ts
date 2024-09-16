interface BankMachine {
	bankMachineId: number;
	serial: string;
	commissionPercent: number;
	bankName: string;
}

export const apis: API = {
	getBanckMachines: {
		method: 'GET',
		url: 'api/bankMachines',
		successCode: 200,
		response: { data: [] as BankMachine[] },
	},
};
