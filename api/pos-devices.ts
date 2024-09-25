interface PosDevice {
	id: string;
	title: string; // cashier|taker|user ...
	type: string; // tablet|phone|pc ...
	isDefault: boolean;
}

interface Printer {
	id: string;
	title: string;
	printerName: string;
	printTakeaway: boolean;
	printDelivery: boolean;
	printIndoor: boolean;
	serverIP: string;
	// printAllProducts?: boolean;
}

export const apis: API = {
	posDevices: {
		method: 'GET',
		url: 'api/posDevices?onlyBranch={}&branch={}&userId={}',
		successCode: 200,
		response: { data: [] as PosDevice[] },
		notes: `
    if (no "MapPrinters" api): return Printer->printableProductIds property.
    if (no branch is passed): return token user devices.
    `,
	},
	printers: {
		method: 'GET',
		url: 'api/printers?deviceId={}',
		successCode: 200,
		response: { data: [] as Printer[] },
	},
	mapPrinter: {
		method: 'POST',
		url: 'api/posDevices/{deviceId}?mapPrinters=true',
		payload: {} as { productIds: string[] },
		successCode: 201,
		response: { data: {} as { [printerId: string]: string[] } }, //productIds
		notes: `used to map printerIds to productIds`,
	},
};
