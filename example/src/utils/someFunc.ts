import { foo, Foo } from '@utils/foo';

export function someFunction(a: number, b: number): void {
  const bar = foo(b);
  console.log(a + bar);
}

export type Kek = Foo;
