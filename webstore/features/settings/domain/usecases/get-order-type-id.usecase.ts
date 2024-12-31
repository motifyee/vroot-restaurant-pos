import { SyncUseCase } from '@src/app/features/base';

const orderTypes: { [key in OrderType]: number } = {
	pickup: 3,
	delivery: 4,
	indoor: 5,
};

export class GetOrderTypeIdUseCase implements SyncUseCase<OrderType, number> {
	execute(value: OrderType): number {
		return orderTypes[value];
	}
}

export const GetOrderTypeIdUseCaseProvider = {
	provide: GetOrderTypeIdUseCase,
	useFactory: () => new GetOrderTypeIdUseCase(),
};
