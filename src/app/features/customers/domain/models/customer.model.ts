export interface Customer {
	id: string;
	name: string;
	phone?: string;
	mobile?: string;
	classification: ClassificationDTO;
	addresses?: AddressDTO[];
}

// export class Customer {
// 	id: string;
// 	name: string;
// 	phone?: string;
// 	mobile?: string;
// 	classification: Classification;
// 	addresses?: Address[];

// 	constructor(
// 		params: CustomerEntity,
// 		classification: Classification,
// 		addresses?: Address[],
// 	) {
// 		// super();
// 		this.id = params.id;
// 		this.name = params.name;
// 		this.phone = params.phone;
// 		this.mobile = params.mobile;
// 		this.classification = classification;
// 		this.addresses = addresses;
// 	}
// }
