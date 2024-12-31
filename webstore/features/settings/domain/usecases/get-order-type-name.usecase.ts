import { SyncUseCase } from '@src/app/features/base';

const orderTypeIds: { [key: number]: OrderType } = {
	3: 'pickup',
	4: 'delivery',
	5: 'indoor',
};

export class GetOrderTypeNameUseCase implements SyncUseCase<number, OrderType> {
	execute(value: number): OrderType {
		return orderTypeIds[value];
	}
}

export const GetOrderTypeNameUseCaseProvider = {
	provide: GetOrderTypeNameUseCase,
	useFactory: () => new GetOrderTypeNameUseCase(),
};
