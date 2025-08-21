import type { ExampleDiagrams } from '../types';

export const examples: ExampleDiagrams = {
  flowchart: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`,
    
  sequence: `sequenceDiagram
    participant A as Alice
    participant B as Bob
    participant C as Charlie
    
    A->>B: Hello Bob!
    B->>C: How are you Charlie?
    C-->>A: I am good thanks!
    B-->>A: Charlie says hi!`,
    
  gantt: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Research           :done,    des1, 2024-01-01,2024-01-05
    Design             :active,  des2, 2024-01-06, 3d
    section Development
    Frontend           :         dev1, after des2, 5d
    Backend            :         dev2, after des2, 7d
    Testing            :         test1, after dev1, 3d`,
    
  pie: `pie title Programming Languages Usage
    "JavaScript" : 42.5
    "Python" : 30.2
    "TypeScript" : 15.8
    "Go" : 7.3
    "Rust" : 4.2`,

  class: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +boolean indoor
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,

  state: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : start
    Processing --> Idle : reset
    Processing --> Success : complete
    Processing --> Error : fail
    Success --> [*]
    Error --> Idle : retry`
};