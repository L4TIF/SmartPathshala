export const mockModules = [
    {
        id: "mod-python",
        moduleName: "Python Programming",
        description: "Master Python from fundamentals to practical applications: syntax, data structures, control flow, functions, OOP, file I/O, virtual environments, and real-world scripting patterns.",
    },
    {
        id: "mod-computer-basics",
        moduleName: "Basic Computer Skills",
        description: "Build core digital skills: hardware vs software, operating systems, file management, keyboard shortcuts, settings, and safe daily computer usage.",
    },
    {
        id: "mod-digital-literacy",
        moduleName: "Digital Literacy",
        description: "Navigate the web responsibly: search strategies, evaluating sources, privacy, security, safe browsing, email etiquette, and digital footprints.",
    },
];

export const mockSubmodulesByModuleId = {
    "mod-python": [
        {
    id: "sub-py-1",
    title: "Introduction to Python",
    content: "Python is a powerful, beginner-friendly, and high-level programming language created by Guido van Rossum in 1991. It is known for its simple and readable syntax, making it one of the best languages for beginners.\n\nPython is used in various fields such as web development, data science, machine learning, automation, game development, and artificial intelligence. Its clean structure and huge community make it an excellent language to start your coding journey.\n\nWhy Learn Python?\n1️⃣ Easy to Learn — Python syntax is close to English and very simple to understand.\n2️⃣ Versatile — Used in websites, apps, data science, AI, and more.\n3️⃣ Free and Open Source — Anyone can download and use it.\n4️⃣ Strong Community — Millions of learners and developers share code, libraries, and tutorials.\n5️⃣ Library Support — Thousands of pre-built modules (like numpy, pandas, tkinter, django, etc.) help in fast development.\n\nSetting Up Python:\n1️⃣ Go to https://www.python.org/downloads/ and download Python 3.x.\n2️⃣ Install it and check installation using the command: `python --version`\n3️⃣ Open any text editor or IDE (like VS Code, PyCharm, or IDLE).\n4️⃣ Start coding using `.py` files.\n\nBasic Syntax Example:\nPython programs are written in simple text files with the `.py` extension. You can write one or more statements in each line.\n\nExample 1: Print a message\nprint('Welcome to SmartPathshala! Learn Python easily.')\n\nExample 2: Adding two numbers\na = 10\nb = 5\nsum = a + b\nprint('The sum is:', sum)\n\nExample 3: Using a loop\nfor i in range(1, 6):\n    print('Number:', i)\n\nHow Python Code Runs:\n- Python code is executed line by line (interpreted).\n- You can write your code, save the file, and run it directly without compiling.\n- This makes testing and debugging very easy.\n\nSummary:\nPython is a simple yet powerful programming language used all over the world. With Python, you can build websites, analyze data, automate tasks, or create AI models. If you are just starting out, Python is the perfect first step to becoming a programmer!",
    resourceName: "intro-to-python-beginner.pdf",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    codeSnippet: "# hello.py\n# This is your first Python program!\nprint('Hello, SmartPathshala! Welcome to Python Learning.')\n\n# Run this file using your terminal:\n# python hello.py\n\n# Output:\n# Hello, SmartPathshala! Welcome to Python Learning.",
},
  {
        "id": "sub-py-2",
        "title": "Data Types and Variables",
        "content": "In Python, data types define the kind of values you can store in a variable. Variables are like containers that hold data. You don’t need to declare a type — Python figures it out automatically.\n\n**Core Data Types:**\n- **int (Integer):** Whole numbers without decimals. Used for counting or indexing. Example: 5, -10, 0\n- **float (Floating Point):** Numbers with decimals. Used for precise or fractional values. Example: 3.14, -0.5\n- **bool (Boolean):** Represents True or False values. Often used in conditions.\n- **str (String):** Text data enclosed in quotes. Example: 'Hello', \"Python\".\n- **list:** Ordered and changeable (mutable) collection. Example: [1, 2, 3]. You can add, remove, or modify items.\n- **tuple:** Ordered but unchangeable (immutable) collection. Example: (1, 2, 3). Often used for fixed data.\n- **dict (Dictionary):** Stores data as key–value pairs. Example: {'name': 'Alice', 'age': 25}. Useful for structured data.\n- **set:** Unordered collection of unique items. Automatically removes duplicates. Example: {1, 2, 2, 3} → {1, 2, 3}\n\n**Variable Rules:**\n- Variable names are case-sensitive.\n- Use **snake_case** style (e.g., my_age, user_name).\n- Avoid Python keywords like 'if', 'for', 'class' as variable names.\n\n**Mutability:**\n- **Mutable:** list, dict, set — values can change.\n- **Immutable:** str, tuple, int, float, bool — values cannot be changed after creation.\n\n**Type Conversion:**\n- You can convert types using built-in functions: int('5'), float('3.14'), str(100), list('abc').\n\n**Best Practices:**\n- Use f-strings for string formatting: f\"My name is {name}\"\n- Choose immutable types (tuples) for constant data.\n- Use descriptive variable names to make your code readable.\n\n**Examples of Common Operations:**\n- Slicing: 'Python'[0:4] → 'Pyth'\n- Dict lookup: user['name'] → 'Alice'\n- Set uniqueness: {1,2,2,3} → {1,2,3}\n- Boolean check: if is_student: print('Yes, student')\n- List operations: append(), remove(), pop(), sort()\n- Tuple unpacking: x, y = (10, 20)\n\n**Extra Tip:** You can check any variable’s type using `type(variable)` and convert between types when needed.",
        "resourceName": "data-types.pdf",
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
        "codeSnippet": "age = 21\npi = 3.14159\nis_student = True\nname = 'Ada'\nlangs = ['Python', 'JavaScript']\nuser = {'name': name, 'age': age}\nunique_numbers = {1,2,2,3}\n\nprint(f'{name} knows {len(langs)} languages')\nprint('Unique numbers:', unique_numbers)\nif is_student:\n    print(f'{name} is a student')\n\n# List and tuple examples\nlangs.append('Java')\nprint('Languages:', langs)\n\nx, y = (10, 20)\nprint('Tuple unpacking:', x, y)"
    },
    {
        "id": "sub-py-3",
        "title": "Control Flow",
        "content": "Control flow is how Python decides **which parts of code to run and how many times**. It allows your program to make decisions, repeat actions, and handle errors.\n\n**Conditional Statements:**\n- **if:** executes a block when a condition is True.\n- **elif:** checks another condition if previous ones were False.\n- **else:** runs if no conditions are True.\n\nExample:\n```python\nif age >= 18:\n    print('Adult')\nelif age > 12:\n    print('Teenager')\nelse:\n    print('Child')\n```\n\n**Loops:**\n- **for loop:** runs through a sequence (list, string, tuple, etc.).\n- **while loop:** repeats code while a condition remains True.\n\nSpecial keywords:\n- **break:** stop the loop immediately.\n- **continue:** skip the rest of the loop body for current iteration.\n- **else (with loop):** runs only when loop finishes normally (no break).\n\n**Error Handling:**\nUse **try / except / finally** to manage errors and avoid program crashes.\n- **try:** code that might fail.\n- **except:** handles the error.\n- **finally:** always executes (cleanup code).\n\n**Best Practices:**\n- Keep conditions simple.\n- Avoid too many nested if/else blocks.\n- Always catch specific exceptions (e.g., ZeroDivisionError).\n- Use meaningful variable names in loops.\n\n**Advanced Tips:**\n- Use **enumerate()** to loop with index.\n- Use **zip()** to loop through multiple sequences.\n- Use **range(start, stop, step)** for number loops.\n- Prefer **list comprehensions** for short loops that build lists.",
        "resourceName": "control-flow.pdf",
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
        "codeSnippet": "for i in range(6):\n    if i % 2 == 0:\n        print(f'{i} is even')\n    else:\n        print(f'{i} is odd')\n\ncount = 0\nwhile count < 3:\n    print('Counting:', count)\n    count += 1\nelse:\n    print('Loop finished normally.')\n\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Error: Cannot divide by zero!')\nfinally:\n    print('Cleaning up...')"
    },
    {
        "id": "sub-py-4",
        "title": "Functions and Modules",
        "content": "Functions help organize code by grouping related logic. Modules let you reuse code across files.\n\n**Functions:**\n- Declared using **def** keyword.\n- Can take inputs (parameters) and return outputs.\n- Help avoid repetition and make code cleaner.\n\n**Types of Function Arguments:**\n- **Positional:** order matters (e.g., greet('Alice')).\n- **Keyword:** specify by name (e.g., greet(name='Alice')).\n- **Default:** have predefined values.\n- **Variable arguments:** *args (non-keyword), **kwargs (keyword arguments).\n\n**Docstrings:**\nEvery function should include a docstring (triple quotes) to describe its purpose and parameters.\n\n**Modules:**\n- A Python file (e.g., math.py) is a module.\n- Import modules using **import**, **from ... import ...**.\n- Built-in modules: math, os, random, datetime, json, etc.\n- Custom modules can be created for your project.\n\n**Advanced Notes:**\n- Use **type hints** to improve code clarity.\n- Functions are first-class objects (can be stored or passed like data).\n- Avoid global variables; pass arguments instead.\n\n**Best Practices:**\n- Keep functions small and single-purpose.\n- Reuse common logic across files via modules.\n- Always write docstrings for reusability.\n- Use `__name__ == '__main__'` to prevent unwanted code execution when importing.",
        "resourceName": "functions-modules.pdf",
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
        "codeSnippet": "from typing import List\n\ndef greet(name: str = 'User') -> str:\n    \"\"\"Return a friendly greeting for the given name.\"\"\"\n    return f'Hello, {name}!'\n\ndef average(numbers: List[int]) -> float:\n    \"\"\"Return the average of a list of numbers.\"\"\"\n    return sum(numbers) / len(numbers)\n\ndef info(**kwargs):\n    for key, value in kwargs.items():\n        print(f'{key}: {value}')\n\nif __name__ == '__main__':\n    print(greet('Ada'))\n    print('Average:', average([10, 20, 30]))\n    info(name='Alice', age=25, country='India')"
    },
    {
        "id": "sub-py-5",
        "title": "Object-Oriented Programming",
        "content": "OOP (Object-Oriented Programming) organizes code using classes and objects, making programs modular, reusable, and easier to manage.\n\n**Core Concepts:**\n- **Class:** blueprint that defines how objects behave.\n- **Object:** an instance (real example) of a class.\n- **Attributes:** variables that belong to an object.\n- **Methods:** functions that belong to a class.\n\n**Key OOP Principles:**\n- **Encapsulation:** bundle data and methods together; hide implementation details.\n- **Abstraction:** show only essential features; hide complexity.\n- **Inheritance:** create new classes from existing ones to reuse code.\n- **Polymorphism:** same function name, different behavior across classes.\n\n**Special Methods:**\n- `__init__`: runs when object is created.\n- `__repr__`: developer-friendly representation.\n- `__str__`: user-friendly string.\n\n**Best Practices:**\n- Keep classes small and focused.\n- Use composition (combining classes) instead of deep inheritance.\n- Use properties to safely control access to private attributes.\n\n**Advanced Notes:**\n- Private attributes use single/double underscore (_ or __).\n- Use class variables for data shared by all objects.\n- Use decorators like @property for clean attribute control.",
        "resourceName": "oop-basics.pdf",
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
        "codeSnippet": "class Counter:\n    count_instances = 0  # class variable\n\n    def __init__(self, start: int = 0):\n        self.__value = start  # private instance variable\n        Counter.count_instances += 1\n\n    def increment(self):\n        self.__value += 1\n\n    def decrement(self):\n        self.__value -= 1\n\n    @property\n    def value(self):\n        return self.__value\n\n    def __repr__(self):\n        return f'Counter(value={self.__value})'\n\nc1 = Counter()\nc1.increment()\nc1.increment()\nprint(c1)\nprint('Current value:', c1.value)\nprint('Total instances:', Counter.count_instances)"
    },
    {
        "id": "sub-py-6",
        "title": "File I/O and Context Managers",
        "content": "File Input/Output (I/O) lets your program read and write data to files, such as text files, logs, or data storage.\n\n**File Operations:**\n- **open(filename, mode):** opens a file. Modes include:\n  - 'r' → read\n  - 'w' → write (overwrites file)\n  - 'a' → append\n  - 'rb' / 'wb' → binary read/write\n- **read(), readline(), readlines():** different ways to read data.\n- **write():** writes data to a file.\n- **close():** closes the file.\n\n**Using Context Managers:**\nUsing `with open()` ensures the file automatically closes, even if an error occurs. This is cleaner and safer.\n\n**Pathlib Module:**\nPython’s `pathlib` simplifies file paths. Works well across operating systems.\n\n**Error Handling:**\nAlways use try/except when dealing with files (they might not exist or could be locked).\n\n**Advanced Tips:**\n- Always use UTF-8 encoding for text.\n- For structured data, use built-in modules like `csv`, `json`, or `pickle`.\n- Separate file reading/writing logic for clarity.\n\n**Best Practices:**\n- Keep files small for efficiency.\n- Always close files or use `with`.\n- Validate file paths before reading/writing.",
        "resourceName": "file-io.pdf",
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/337/337946.png",
        "codeSnippet": "from pathlib import Path\n\n# Write text to a file\nfile_path = Path('words.txt')\ntext = 'alpha\\nbeta\\ngamma'\n\nwith file_path.open('w', encoding='utf-8') as f:\n    f.write(text)\n\n# Append more data\nwith file_path.open('a', encoding='utf-8') as f:\n    f.write('\\ndelta')\n\n# Read all lines\nwith file_path.open('r', encoding='utf-8') as f:\n    for line in f:\n        print(line.strip())\n\n# Binary write example\nwith open('data.bin', 'wb') as bf:\n    bf.write(b'BinaryData')"
    },

    ],
    "mod-computer-basics": [
        {
            id: "sub-cb-1",
            title: "Hardware vs Software",
            content: "Hardware is the physical machinery (CPU, RAM, storage, motherboard, peripherals). Software includes the OS and applications that instruct hardware.\n\nKey Concepts:\n- CPU executes instructions\n- RAM holds working data\n- Storage persists files\n- Peripherals provide input/output",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
            codeSnippet: "# Conceptual; no code required\nparts = ['CPU','RAM','Storage','Motherboard','Peripherals']\nprint(', '.join(parts))",
        },
        {
            id: "sub-cb-2",
            title: "Operating Systems",
            content: "The OS manages hardware resources and provides services for programs. Learn filesystems, processes, permissions, updates, and settings.\n\nEveryday Tasks:\n- Create, rename, and move files\n- Install/uninstall software\n- Manage startup apps and updates",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969059.png",
            codeSnippet: "# Terminal examples\nuname -a\nls -la\ncat /etc/os-release",
        },
    ],
    "mod-digital-literacy": [
        {
            id: "sub-dl-1",
            title: "Safe Browsing",
            content: "Protect yourself online: verify URLs, look for HTTPS, use password managers, enable 2FA, and keep software updated. Recognize phishing and avoid oversharing.\n\nChecklist:\n- Strong, unique passwords\n- MFA enabled\n- Privacy settings reviewed\n- Backup important data",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/545/545682.png",
            codeSnippet: "// Security hygiene\nconst isHttps = location.protocol === 'https:';\nconsole.log('HTTPS:', isHttps);",
        },
    ],
};

export const mockModuleExams = {
    'mod-python': [
    {
        id: 'mp-q1',
        question: 'Which statement is used to define a function in Python?',
        options: ['function', 'def', 'fn', 'proc'],
        answerIndex: 1,
    },
    {
        id: 'mp-q2',
        question: 'Which of these is an immutable data type?',
        options: ['list', 'dict', 'set', 'tuple'],
        answerIndex: 3,
    },
    {
        id: 'mp-q3',
        question: 'What does the built-in len() function return?',
        options: ['Memory size', 'Number of elements', 'Type of object', 'Hash value'],
        answerIndex: 1,
    },
    {
        id: 'mp-q4',
        question: 'What symbol is used to start a comment in Python?',
        options: ['//', '#', '/*', '--'],
        answerIndex: 1,
    },
    {
        id: 'mp-q5',
        question: 'Which function is used to get user input in Python?',
        options: ['input()', 'get()', 'read()', 'scan()'],
        answerIndex: 0,
    },
    {
        id: 'mp-q6',
        question: 'Which keyword is used to create a class in Python?',
        options: ['function', 'object', 'class', 'def'],
        answerIndex: 2,
    },
    {
        id: 'mp-q7',
        question: 'What is the output of print(type([]))?',
        options: ['<class "list">', '<class "tuple">', '<class "set">', '<class "dict">'],
        answerIndex: 0,
    },
    {
        id: 'mp-q8',
        question: 'Which operator is used for exponentiation in Python?',
        options: ['^', '**', 'exp()', 'pow'],
        answerIndex: 1,
    },
    {
        id: 'mp-q9',
        question: 'What is the output of bool(0)?',
        options: ['True', 'False', 'None', '0'],
        answerIndex: 1,
    },
    {
        id: 'mp-q10',
        question: 'How do you create an empty dictionary?',
        options: ['{}', '[]', '()', 'set()'],
        answerIndex: 0,
    },
    {
        id: 'mp-q11',
        question: 'Which function converts a string to an integer?',
        options: ['str()', 'float()', 'int()', 'chr()'],
        answerIndex: 2,
    },
    {
        id: 'mp-q12',
        question: 'What keyword is used to handle exceptions?',
        options: ['try', 'except', 'catch', 'throw'],
        answerIndex: 1,
    },
    {
        id: 'mp-q13',
        question: 'Which of these creates a tuple?',
        options: ['(1, 2, 3)', '[1, 2, 3]', '{1, 2, 3}', 'tuple[1, 2, 3]'],
        answerIndex: 0,
    },
    {
        id: 'mp-q14',
        question: 'Which module is used for mathematical operations?',
        options: ['math', 'cmath', 'numbers', 'random'],
        answerIndex: 0,
    },
    {
        id: 'mp-q15',
        question: 'How do you start a for loop in Python?',
        options: ['for i = 0;', 'foreach i in range()', 'for i in range():', 'loop(i)'],
        answerIndex: 2,
    },
    {
        id: 'mp-q16',
        question: 'Which keyword is used to exit a loop early?',
        options: ['stop', 'exit', 'break', 'return'],
        answerIndex: 2,
    },
    {
        id: 'mp-q17',
        question: 'Which method adds an item to a list?',
        options: ['add()', 'append()', 'push()', 'insert()'],
        answerIndex: 1,
    },
    {
        id: 'mp-q18',
        question: 'Which keyword is used to import modules?',
        options: ['load', 'include', 'require', 'import'],
        answerIndex: 3,
    },
    {
        id: 'mp-q19',
        question: 'What is the result of 3 // 2?',
        options: ['1.5', '1', '2', 'Error'],
        answerIndex: 1,
    },
    {
        id: 'mp-q20',
        question: 'Which function is used to display output in Python?',
        options: ['echo()', 'print()', 'write()', 'say()'],
        answerIndex: 1,
    },
    {
        id: 'mp-q21',
        question: 'Which statement is used to define a conditional block?',
        options: ['switch', 'if', 'when', 'choose'],
        answerIndex: 1,
    },
    {
        id: 'mp-q22',
        question: 'What will print("Hello" * 3) output?',
        options: ['Hello3', 'HelloHelloHello', 'Error', '3Hello'],
        answerIndex: 1,
    },
    {
        id: 'mp-q23',
        question: 'What is the correct file extension for Python files?',
        options: ['.py', '.pt', '.pyt', '.pyth'],
        answerIndex: 0,
    },
    {
        id: 'mp-q24',
        question: 'What will print(2 == "2") output?',
        options: ['True', 'False', 'None', 'Error'],
        answerIndex: 1,
    },
    {
        id: 'mp-q25',
        question: 'Which built-in data type can store key-value pairs?',
        options: ['list', 'tuple', 'dict', 'set'],
        answerIndex: 2,
    },
    {
        id: 'mp-q26',
        question: 'What is the default return value of a function with no return statement?',
        options: ['0', 'None', 'Null', 'False'],
        answerIndex: 1,
    },
    {
        id: 'mp-q27',
        question: 'Which function gives the current Python version?',
        options: ['sys.version', 'python.version()', 'get.version()', 'version()'],
        answerIndex: 0,
    },
    {
        id: 'mp-q28',
        question: 'Which keyword is used to define a lambda function?',
        options: ['lambda', 'def', 'func', 'inline'],
        answerIndex: 0,
    },
    {
        id: 'mp-q29',
        question: 'What does the "pass" statement do?',
        options: ['Skips execution', 'Raises an error', 'Terminates the loop', 'Starts a block'],
        answerIndex: 0,
    },
    {
        id: 'mp-q30',
        question: 'What is the output of type(10/2)?',
        options: ['int', 'float', 'str', 'bool'],
        answerIndex: 1,
    },
    {
        id: 'mp-q31',
        question: 'Which function is used to find the largest number in a list?',
        options: ['max()', 'largest()', 'big()', 'top()'],
        answerIndex: 0,
    },
    {
        id: 'mp-q32',
        question: 'Which data type is used to represent True or False?',
        options: ['str', 'bool', 'int', 'logical'],
        answerIndex: 1,
    },
    {
        id: 'mp-q33',
        question: 'Which of these will create a set?',
        options: ['{1,2,3}', '[1,2,3]', '(1,2,3)', '"1,2,3"'],
        answerIndex: 0,
    },
    {
        id: 'mp-q34',
        question: 'What is the output of "Hello".lower()?',
        options: ['HELLO', 'hello', 'Hello', 'Error'],
        answerIndex: 1,
    },
    {
        id: 'mp-q35',
        question: 'Which module is used for generating random numbers?',
        options: ['random', 'math', 'os', 'sys'],
        answerIndex: 0,
    },
    {
        id: 'mp-q36',
        question: 'Which keyword is used to inherit a class?',
        options: ['inherits', 'extends', 'super', 'class Child(Parent):'],
        answerIndex: 3,
    },
    {
        id: 'mp-q37',
        question: 'What does the "is" operator check?',
        options: ['Value equality', 'Memory identity', 'Data type', 'Class name'],
        answerIndex: 1,
    },
    {
        id: 'mp-q38',
        question: 'What will print(list("abc")) output?',
        options: ["['abc']", "['a', 'b', 'c']", '["a,b,c"]', 'Error'],
        answerIndex: 1,
    },
    {
        id: 'mp-q39',
        question: 'Which function returns the absolute value of a number?',
        options: ['abs()', 'fabs()', 'math.abs()', 'pos()'],
        answerIndex: 0,
    },
    {
        id: 'mp-q40',
        question: 'Which method removes and returns the last element of a list?',
        options: ['remove()', 'delete()', 'pop()', 'discard()'],
        answerIndex: 2,
    },
    {
        id: 'mp-q41',
        question: 'What is the output of 10 % 3?',
        options: ['1', '3', '0', '10'],
        answerIndex: 0,
    },
    {
        id: 'mp-q42',
        question: 'Which function is used to get the type of a variable?',
        options: ['type()', 'typeof()', 'class()', 'getType()'],
        answerIndex: 0,
    },
    {
        id: 'mp-q43',
        question: 'What does the "continue" statement do?',
        options: ['Stops loop', 'Skips current iteration', 'Exits function', 'Restarts program'],
        answerIndex: 1,
    },
    {
        id: 'mp-q44',
        question: 'What is the output of bool([])?',
        options: ['True', 'False', 'Error', 'None'],
        answerIndex: 1,
    },
    {
        id: 'mp-q45',
        question: 'Which of these keywords is used for defining modules?',
        options: ['module', 'import', 'package', 'def'],
        answerIndex: 1,
    },
    {
        id: 'mp-q46',
        question: 'Which of the following are Python logical operators?',
        options: ['and, or, not', '&&, ||, !', '&, |, ~', 'All of these'],
        answerIndex: 0,
    },
    {
        id: 'mp-q47',
        question: 'Which function sorts a list in ascending order?',
        options: ['arr.sort()', 'sorted(arr)', 'Both A and B', 'sort(arr, desc=True)'],
        answerIndex: 2,
    },
    {
        id: 'mp-q48',
        question: 'Which data type does the range() function return?',
        options: ['list', 'tuple', 'range', 'iterator'],
        answerIndex: 2,
    },
    {
        id: 'mp-q49',
        question: 'What is the keyword used to define an anonymous block of code?',
        options: ['lambda', 'anon', 'def', 'none'],
        answerIndex: 0,
    },
    {
        id: 'mp-q50',
        question: 'Which Python collection does not allow duplicate values?',
        options: ['list', 'tuple', 'set', 'dict'],
        answerIndex: 2,
    },
]
};


