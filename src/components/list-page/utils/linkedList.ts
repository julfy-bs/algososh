export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor(
    value: T,
    next?: LinkedListNode<T> | null,
    prev?: LinkedListNode<T> | null
  ) {
    this.value = value;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
  }
}

type LinkedListClass<T> = {
  prepend: (element: T) => LinkedListNode<T>;
  append: (element: T) => LinkedListNode<T>;
  deleteHead: () => LinkedListNode<T> | null;
  deleteTail: () => LinkedListNode<T> | null;
  addByIndex: (value: T, index: number) => LinkedListNode<T> | null;
  deleteByIndex: (index: number) => LinkedListNode<T> | null;
  fromArray: (values: T[]) => LinkedList<T>;
  toArray: () => LinkedListNode<T>[];
}

export class LinkedList<T> implements LinkedListClass<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Добавляет новый узел по индексу и возвращает его.
  addByIndex(value: T, index: number): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }
    if (index === 0) {
      return this.prepend(value);
    }

    let currentNode: LinkedListNode<T> | null = this.head;
    let currentIndex: number = 0;

    while (currentNode && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    let previousNode = currentNode?.prev;
    let newNode = new LinkedListNode(value, currentNode, previousNode);

    if (previousNode) previousNode.next = newNode;
    if (currentNode) currentNode.prev = newNode;
    return newNode;
  }

  // Удаляет узел по индексу и возвращает его.
  deleteByIndex(index: number): LinkedListNode<T> | null {
    // Если this.head - falsy, значит список пуст - выходим из функции.
    if (!this.head) {
      return null;
    }

    // Если пытаемся удалить первый элемент - вызываем готовый метод,
    // чтобы избежать дублирования кода.
    if (index === 0) {
      return this.deleteHead();
    }

    let currentNode: LinkedListNode<T> | null = this.head;
    let currentIndex: number = 0;
    // Перебираем все узлы в поиске значения.
    // Ограничим цикл проверкой на falsy значение для currentNode.
    while (currentNode && currentIndex < index) {
      currentNode = currentNode?.next || null;
      currentIndex++;
    }
    // Явно называем удаляемый элемент
    let deletedNode = currentNode;

    // Заменяем у соседних элементов списка ссылку.
    if (deletedNode && deletedNode.prev) {
      deletedNode.prev.next = deletedNode.next || null;
    }

    if (deletedNode && deletedNode.next) {
      deletedNode.next.prev = deletedNode.prev || null;
    }

    // Возвращаем удаленный узел списка
    return deletedNode;
  }

  /// Добавляет новый узел в начало списка и возвращает его.
  prepend(value: T): LinkedListNode<T> {
    // Создаём новый узел, он станет новым head.
    // При создании узла передаём второй аргумент, который указывает
    // что его "next" будет текущий head,
    // так как новый узел будет стоять перед текущем head.
    const newNode = new LinkedListNode(value, this.head);

    // Если есть head, то он больше не будет head.
    // Поэтому, его ссылку на предыдущий узел (previous) меняем на новый узел.
    if (this.head) {
      this.head.prev = newNode;
    }

    // Переназначаем head на новый узел
    this.head = newNode;

    // Если ещё нет tail, делаем новый узел tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    // Возвращаем весь список.
    return newNode;
  }

  /// Добавляет новый узел в конец списка и возвращает его.
  append(value: T): LinkedListNode<T> {
    // Создаём новый узел.
    const newNode = new LinkedListNode(value);

    if (this.tail) {
      // Присоединяем новый узел к концу связного списка.
      this.tail.next = newNode;
    }

    // В новом узле указываем ссылку на предыдущий (previous) элемент на this.tail,
    // так как новый узел будет теперь последним.
    newNode.prev = this.tail;

    // Переназначаем tail на новый узел.
    this.tail = newNode;

    // Если ещё нет head, делаем новый узел head.
    if (!this.head) {
      this.head = newNode;
    }

    // Возвращаем весь список.
    return newNode;
  }

  // Удаляет последний узел из списка и возвращает его.
  deleteTail() {
    // Если нет tail - список пуст.
    if (!this.tail) {
      return null;
    }

    // Сохраняем значение последнего узла.
    const deletedTail = this.tail;

    // Если у tail есть ссылка на предыдущий узел,
    if (this.tail.prev) {
      // переназначаем tail на предыдущий узел,
      this.tail = this.tail.prev;
      // обновляем ссылку на следующий узел.
      this.tail.next = null;
    } else {
      // Если есть tail, но у него нет ссылки на предыдущий узел,
      // значит в списке только один узел и мы его удалили.
      // Поэтому обнуляем всё.
      this.head = null;
      this.tail = null;
    }

    return deletedTail;
  }

  // Удаляет из списка первый узел и возвращает его.
  deleteHead() {
    // Если нет head - список пуст.
    if (!this.head) {
      return null;
    }

    // Сохраняем значение первого узла.
    const deletedHead = this.head;

    // Если у head есть ссылка на следующий узел,
    if (this.head.next) {
      // переназначаем head на следующий узел,
      this.head = this.head.next;
      // обновляем ссылку на следующий узел.
      this.head.prev = null;
    } else {
      // Если есть head, но у него нет ссылки на следующий узел,
      // значит в списке только один узел и мы его удалили.
      // Поэтому обнуляем всё.
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  // Принимает массив значений в качестве аргумента и создаёт новые узлы из каждого элемента массива, по очереди добавляя их в конец списка.
  // Создаём новые узлы из массива и добавляем в конец списка.
  fromArray(values: T[]): LinkedList<T> {
    values.forEach(value => this.append(value));

    return this;
  }

  // Создаём массив из всех узлов.
  toArray(): LinkedListNode<T>[] {
    const nodes: LinkedListNode<T>[] = [];

    let currentNode = this.head;

    // Перебираем все узлы и добавляем в массив.
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    // Возвращаем массив из всех узлов.
    return nodes;
  }
}
