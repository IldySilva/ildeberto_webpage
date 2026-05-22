---
title: "The Builder Pattern in Dart"
description: "How to simplify complex object creation in Dart using the Builder pattern."
date: 2024-03-10
tags: ["Dart", "Flutter", "Patterns"]
---

The Builder pattern separates the construction of a complex object from its representation.
It's particularly useful in Dart when you have objects with many optional parameters.

## The problem

```dart
final user = User(
  name: 'Ildeberto',
  age: 23,
  email: 'ildeberto34@gmail.com',
  role: Role.admin,
  // ... 10 more optional fields
);
```

Constructors with many parameters become unreadable and error-prone.

## The solution

```dart
class UserBuilder {
  String _name = '';
  int _age = 0;
  String _email = '';
  Role _role = Role.user;

  UserBuilder name(String name) { _name = name; return this; }
  UserBuilder age(int age) { _age = age; return this; }
  UserBuilder email(String email) { _email = email; return this; }
  UserBuilder role(Role role) { _role = role; return this; }

  User build() => User(name: _name, age: _age, email: _email, role: _role);
}
```

Usage becomes expressive and readable:

```dart
final user = UserBuilder()
  .name('Ildeberto')
  .age(23)
  .email('ildeberto34@gmail.com')
  .role(Role.admin)
  .build();
```

## Dart's copyWith alternative

For immutable value objects, Dart's `copyWith` pattern covers similar ground:

```dart
final updated = user.copyWith(role: Role.admin);
```

Use the Builder pattern when construction involves validation logic or multi-step assembly.
Use `copyWith` for simple immutable data classes.
