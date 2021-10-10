import { A } from './_override'

export class B extends A {
  // @ts-expect-error
  keyX = 1

  override keyY = 'y'

  // @ts-expect-error
  methodX() {
    return 'b'
  }

  // @ts-expect-error
  methodY = () => 'b'
}
