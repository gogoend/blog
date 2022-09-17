import 'reflect-metadata'


@Reflect.metadata('class-a', {
  at: 'class-a'
})
class A {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata('class-a b', { at: 'class-a b' })
  b() {}

  @Reflect.metadata('class-a c', { at: 'class-a c' })
  c() {}
}

@Reflect.metadata('class-b', {
  at: 'class-b'
})
class B {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata('class-b b', { at: 'class-b b' })
  b() {}

  @Reflect.metadata('class-b c', { at: 'class-b c' })
  c() {}
}

// 后续会尝试读取这个类的metadata
console.log(Reflect.getMetadata('class-a', A));
console.log(Reflect.getMetadata('class-b c', B.prototype, 'c'));
