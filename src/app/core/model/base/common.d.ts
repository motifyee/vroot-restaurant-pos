declare interface IdxSignature {
	[key: string]: any;
}

declare type Constructor<T = never> = {
	new (...args: any): T;
	// init<T>(this: Constructor<T>, props: Partial<T>): T;
};

declare type ValueOf<T> = T[keyof T];

declare type FlashType = 'success' | 'error' | 'warning' | 'info';

declare interface UIActions extends IdxSignature {
	state: { [key: string | number | symbol]: FlashType };
	setState: (
		msg?: string | number | symbol,
		flashType?: FlashType,
		duration?: number,
	) => void;
	loading?: boolean;
}
