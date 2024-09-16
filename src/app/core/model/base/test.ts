import { Base, BaseArray, ByRef } from './base';

interface ITest {
	name?: string;
	url?: string;
	test?: ITest;
}

class Test extends Base<ITest> implements ITest {
	name?: string;
	url?: string;
	test?: ITest;
	constructor(val: Partial<ITest>, byRef?: ByRef<ITest>) {
		super();
		this.mapProps(val, { test: Test });
	}
}

export function testCallback() {
	let v = {
			name: 'test name',
			url: 'tarabia.online',
			test: {
				name: 'guru',
				url: 'zolo',
			},
		},
		t = new Test(v, { test: Test }),
		a = new BaseArray(Test, { test: Test }, [v]);

	a = a.empty;

	console.log(t, a, a[0]);
}
