import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, PrintersRepo } from '@features';

export class PrintersMapUseCase
	implements
		UseCase<
			{ variants: ProductVariant[] },
			{ [printerId: string]: string[] }
		>
{
	readonly printersRepo = inject(PrintersRepo);

	execute(
		params: { variants: ProductVariant[] },
		config?: Config,
	): Observable<{ [printerId: string]: string[] }> {
		let productIds = params.variants.map((p) => p.id);

		return this.printersRepo.printersMap({ productIds }, config);
	}
}

export const printersMapUseCaseProvider = {
	provide: PrintersMapUseCase,
	useFactory: () => new PrintersMapUseCase(),
};
